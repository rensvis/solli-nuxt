<template>
  <div class="py-32 c-container">
    <div class="gap-10 lg:flex">
      <section class="basis-1/4">
        <Card padding="large" borderRadius="large" class="mb-4 lg:mb-0">
          <h2 class="mb-4 text-xl font-bold">Filters</h2>
          <FormKit type="group" #default="{ value }">
            <FormKit type="text" label="Zoeken" name="zoeken" :delay="300" v-model="state.searchTerm" />
          </FormKit>
          <div v-auto-animate>
            <button v-if="showClearFilters" @click="resetFilters" class="cursor-pointer">Reset
              filters</button>
          </div>
        </Card>
      </section>
      <section class="basis-3/4">
        <Card padding="large" borderRadius="large">
          <div class="flex flex-col justify-between gap-4 mb-4 lg:mb-10 sm:flex-row">
            <select v-model="state.sortDirection" class="text-neutral-500 sm:order-2 w-fit">
              <option :value="SortDirection.DateDescending">Datum - nieuwe eerst</option>
              <option :value="SortDirection.DateAscending">Datum - oude eerst</option>
              <!-- does not exist yet -->
              <!-- <option :value="SortDirection.SalaryDescending">Salaris - hoog naar laag</option>
                <option :value="SortDirection.SalaryAscending">Salaris - laag naar hoog</option> -->
            </select>
            <span class="ml-1 text-neutral-500 sm:order-1">
              {{ state.jobsLoading ? "Laden..." : `${state.totalOnPage} van de ${state.totalInQuery} resultaten` }}
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


        </Card>
        <div ref="loadMoreRef" class=""></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
interface State {
  jobs: any[],
  jobsLoading: Boolean,
  searchTerm: String,
  sortDirection: SortDirection,
  page: number,
  totalOnPage: number,
  totalInQuery: number,
  init: Boolean;
}

enum SortDirection {
  DateAscending,
  DateDescending,
  SalaryAscending,
  SalaryDescending
}

const itemsPerPage = 6;
const client = useSupabaseClient();
const loadMoreRef = ref(null);

let state: State = reactive({
  jobs: [],
  jobsLoading: false,
  searchTerm: '',
  sortDirection: SortDirection.DateDescending,
  page: 1,
  init: false,
  totalOnPage: 0,
  totalInQuery: 0,
});

watch([() => state.searchTerm, () => state.sortDirection], ([newSearchTerm, newSortDirection]) => {
  state.page = 1;
  console.log('watching');
  fetchJobs();
});

let showClearFilters = computed(() => {
  return state.searchTerm !== '';
});

onMounted(() => {
  fetchJobs();

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && state.init && state.totalInQuery !== state.totalOnPage) {
        // Load more jobs
        state.page += 1;
        console.log(state.page);
        fetchJobs();
      }
    });
  });

  observer.observe(loadMoreRef.value!);
});

const fetchJobs = (async () => {
  if (state.jobsLoading) return;
  console.log('fetching jobs');
  state.jobsLoading = true;
  const startIndex = ((state.page) - 1) * itemsPerPage;
  const endIndex = (state.page) * itemsPerPage - 1;
  const { sortingColumn, isAscending } = getSortParams(state.sortDirection);

  const { data, count, error } = await client
    .from('jobs')
    .select(`
    *,
    company:companies (
      *
    )
    `,
      { count: 'exact' })
    .or(`name.ilike.%${state.searchTerm}%,description.ilike.%${state.searchTerm}%`)
    .range(startIndex, endIndex)
    .order(sortingColumn, { ascending: isAscending });
  if (!state.init) state.init = true;
  const jobs = data ?? [];
  state.jobs = state.page === 1 ? jobs : [...state.jobs, ...jobs];
  state.totalOnPage = startIndex + (data?.length ?? 0);
  state.totalInQuery = count ?? 0;
  state.jobsLoading = false;
  // console.log(error);
  // console.log(data);
  // console.log(count);
  // console.log(state);
});

const getSortParams = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case SortDirection.DateAscending:
      return { sortingColumn: 'created_at', isAscending: true };
    case SortDirection.DateDescending:
      return { sortingColumn: 'created_at', isAscending: false };
    case SortDirection.SalaryAscending:
      return { sortingColumn: 'salary', isAscending: true };
    case SortDirection.SalaryDescending:
      return { sortingColumn: 'salary', isAscending: false };
    default:
      throw new Error(`Unknown sort direction: ${sortDirection}`);
  }
};


const resetFilters = () => {
  state.searchTerm = '';
};
</script>
