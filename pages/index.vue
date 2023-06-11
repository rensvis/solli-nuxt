<template>
  <div class="py-10 c-container">
    <div class="gap-10 lg:flex">
      <section class="basis-1/4">
        <Card padding="large" borderRadius="large" class="mb-4 lg:mb-0">
          <h2 class="mb-4 text-xl font-bold">Filters</h2>
          <FormKit type="group" #default="{ value }">
            <FormKit type="text" label="Zoeken" name="zoeken" :delay="300" v-model="state.searchTerm"
              @keydown.native.enter.13="blurInput()" />
            <label for="locatie" class="block mb-1 text-md">Locatie</label>
            <PlacesAutocomplete v-model="state.searchLocation"></PlacesAutocomplete>
            <!-- <pre wrap>{{ state.searchLocation }}</pre> -->
            <!-- <FormKit type="range" label="Afstand" prefix="test" min="0" max="50" suffix="km" /> -->
            <div class="mb-4" v-auto-animate>
              <div v-if="state.searchLocation">
                <label for="afstand" class="block mb-1 text-md">Afstand</label>
                <input id="afstand" name="afstand" type="range" min="1" :max="maxSearchDistanceKm"
                  :value="state.displayedDistance" step="1" ref="distanceSliderRef"
                  @input="updateDisplayedDistance($event)"
                  @change="state.searchDistance = +($event.target as HTMLInputElement).value * 1000"
                  class="w-full h-1 mb-3 rounded-full appearance-none cursor-pointer gray-200 bg-keppel-100 accent-keppel-500">
                <p v-if="state.displayedDistance !== maxSearchDistanceKm" class="text-sm text-neutral-500">
                  <span class="text-xl">{{ state.displayedDistance }}</span>
                  kilometer,
                  <span class="text-xl">{{ state.displayedDistanceMinutes }}</span>
                  minuten fietsen 🚲
                </p>
                <p v-else class="text-sm text-neutral-500">
                  Alle afstanden
                </p>

              </div>
            </div>
          </FormKit>

          <div v-auto-animate>
            <Button v-if="showClearFilters" @click="resetFilters" class="" type="textbutton">Reset filters</Button>
          </div>
        </Card>
      </section>
      <section class="basis-3/4">
        <Card padding="large" borderRadius="large">
          <div class="flex flex-col justify-between gap-4 mb-4 lg:mb-10 sm:flex-row">
            <select v-model="state.sortDirection" class="text-neutral-500 sm:order-2 w-fit" name="Sorteren">
              <option :value="SortDirection.DateDescending">Datum - nieuwe eerst</option>
              <option :value="SortDirection.DateAscending">Datum - oude eerst</option>
              <option v-if="state.searchLocation" :value="SortDirection.DistanceAscending">Afstand</option>
              <!-- does not exist yet -->
              <!-- <option :value="SortDirection.SalaryDescending">Salaris - hoog naar laag</option>
                <option :value="SortDirection.SalaryAscending">Salaris - laag naar hoog</option> -->
            </select>
            <span class="ml-1 text-neutral-500 sm:order-1">
              {{ searchStatusMessage }}
            </span>
          </div>

          <ul v-if="!state.init" class="">
            <JobListItemSkeleton v-for="index in 10"></JobListItemSkeleton>
          </ul>
          <ul v-else-if="state.jobs.length" v-auto-animate class="">
            <!-- <JobListItemSkeleton></JobListItemSkeleton> -->
            <JobListItem v-for="(job, index) in state.jobs" :key="job.id" :job="job"></JobListItem>
          </ul>
          <p v-else>Geen resultaten</p>

          <div v-auto-animate>
            <div v-if="state.jobs.length > 5" class="flex flex-col justify-between gap-4 mt-4 lg:mt-10 sm:flex-row">
              <span class="ml-1 text-neutral-500 sm:order-1">
                {{ searchStatusMessage }}
              </span>
            </div>
          </div>

        </Card>
        <div ref="loadMoreRef" class=""></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { Database } from "~/types/Database";
import { ILocation } from "~/types/Location";
import { IJob } from "~/types/job/Job";

interface State {
  jobs: any[],
  jobsLoading: boolean,
  searchTerm: string,
  searchLocation: ILocation | null,
  searchDistance: number | null,
  sortDirection: SortDirection,
  page: number,
  totalOnPage: number,
  totalInQuery: number,
  init: Boolean;
  displayedDistance: number,
  displayedDistanceMinutes: number,
}

enum SortDirection {
  DateAscending,
  DateDescending,
  SalaryAscending,
  SalaryDescending,
  DistanceAscending
}

const itemsPerPage = 6;
const supabaseClient = useSupabaseClient<Database>();
const loadMoreRef = ref(null);
const distanceSliderRef = ref(null);
const defaultDistanceKm = 5;
const cyclingSpeedFactor = 0.33333; // 18 km/h
const maxSearchDistanceKm = 20;

let state: State = reactive({
  jobs: [],
  jobsLoading: false,
  searchTerm: '',
  searchLocation: null,
  searchDistance: defaultDistanceKm * 1000,
  sortDirection: SortDirection.DateDescending,
  page: 1,
  init: false,
  totalOnPage: 0,
  totalInQuery: 0,
  displayedDistance: defaultDistanceKm,
  displayedDistanceMinutes: Math.round(defaultDistanceKm / cyclingSpeedFactor),
});

useHead({
  meta: [{
    hid: 'description',
    name: 'description',
    content: 'Browse door alle bijbaantjes op Solli.nl'
  }],
  title: 'Alle baantjes',
});

const searchStatusMessage = computed(() => {
  return state.jobsLoading || !state.init ? "Laden..." : `${state.totalOnPage} van de ${state.totalInQuery}
              resultaten`;
});

let showClearFilters = computed(() => {
  return state.searchTerm !== '' || state.searchLocation !== null;
});

const getSortParams = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case SortDirection.DateAscending:
      return { sortingColumn: 'created_at', direction: 'asc' };
    case SortDirection.DateDescending:
      return { sortingColumn: 'created_at', direction: 'desc' };
    case SortDirection.SalaryAscending:
      return { sortingColumn: 'salary', direction: 'asc' };
    case SortDirection.SalaryDescending:
      return { sortingColumn: 'salary', direction: 'desc' };
    case SortDirection.DistanceAscending:
      return { sortingColumn: 'distance_meters', direction: 'asc' };
    default:
      throw new Error(`Unknown sort direction: ${sortDirection}`);
  }
};

const fetchJobs = (async () => {
  if (state.jobsLoading) return;
  state.jobsLoading = true;
  const startIndex = ((state.page) - 1) * itemsPerPage;

  const sortParams = getSortParams(state.sortDirection);
  const lat = state.searchLocation?.lat ?? null;
  const lng = state.searchLocation?.lng ?? null;
  const useLocation = lat && lng;

  console.log(state.searchDistance);

  const { data, error } = await supabaseClient.rpc('nearby_jobs', {
    input_limit: itemsPerPage,
    input_offset: startIndex,
    input_sort: sortParams.sortingColumn,
    input_sort_direction: sortParams.direction,
    input_search_text: state.searchTerm,
    ...(useLocation && { input_lat: lat }),
    ...(useLocation && { input_lng: lng }),
    ...((useLocation && state.searchDistance && state.searchDistance !== maxSearchDistanceKm * 1000) && { input_max_distance_meters: state.searchDistance! })
  });

  if (!state.init) state.init = true;
  const jobs: IJob[] = data!.map((job: any) => {
    return {
      ...job,
      company: {
        ...job.company,
      }
    };
  });
  console.log(jobs);
  const count = data?.length ? data[0].full_count as number : 0;
  state.jobs = state.page === 1 ? jobs : [...state.jobs, ...jobs];
  state.totalOnPage = startIndex + (data?.length ?? 0);
  state.totalInQuery = count ?? 0;
  state.jobsLoading = false;
});

watch([() => state.searchLocation, () => state.searchDistance], ([newLocation, _oldLocation], [newDistance, oldDistance]) => {
  if (newLocation !== null) {
    state.sortDirection = SortDirection.DistanceAscending;
  }
  state.page = 1;
  fetchJobs();
});

useAsyncData('jobs', async (test: any) => {
  state.page = 1;
  fetchJobs();
}, {
  watch: [() => state.searchTerm, () => state.sortDirection],
});

onMounted(async () => {
  initIntersectionObserver();
});

const initIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && state.totalInQuery !== state.totalOnPage && state.init) {
        state.page += 1;
        fetchJobs();
      }
    });
  });
  observer.observe(loadMoreRef.value!);
};

const blurInput = () => {
  (document.activeElement! as any).blur();
};

const resetDistanceFilter = () => {
  state.searchDistance = defaultDistanceKm * 1000;
  state.displayedDistance = defaultDistanceKm;
  state.displayedDistanceMinutes = Math.round(defaultDistanceKm / cyclingSpeedFactor);
};

const updateDisplayedDistance = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const distance = +inputElement.value;
  const minutes = Math.round(distance / cyclingSpeedFactor);
  state.displayedDistance = distance;
  state.displayedDistanceMinutes = minutes;
};

const resetFilters = () => {
  state.searchTerm = '';
  state.searchLocation = null;
  state.sortDirection = SortDirection.DateDescending;
  resetDistanceFilter();
};
</script>
