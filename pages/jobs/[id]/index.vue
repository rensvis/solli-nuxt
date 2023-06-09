<template>
  <div class="py-10">
    <div class="c-container md:mb-0">
      <!-- <JobDetailPageSkeleton v-if="flashSkeleton"></JobDetailPageSkeleton> -->
      <JobDetailPageSkeleton v-if="!job"></JobDetailPageSkeleton>
      <div v-else-if="job" class="flex flex-col gap-10 mb-10 md:flex-row">
        <div class="basis-2/3">
          <div class="flex justify-between gap-4">
            <div class="">
              <h1 class="mb-4 text-4xl font-bold" style="overflow-wrap: anywhere;">{{ capitalize(job.name) }}</h1>
              <div class="flex flex-wrap items-center gap-3 mb-2">
                <p class="text-lg leading-tight text-neutral-500">{{ job.company.name }}</p>
                <EmploymentTypePill :hoursPerWeekMin="job.hours_per_week_min" class="float-right"></EmploymentTypePill>
              </div>
            </div>
            <div>
              <Button type="primary" :to="`${currentRoutePath}/solliciteren`" size="large"
                class="hidden md:block">Solliciteren</Button>
            </div>
          </div>
          <HorizontalRuler></HorizontalRuler>
          <h2 class="mb-2 text-2xl font-medium">Beschrijving</h2>
          <div class="mb-10 styled-text" v-html="renderedDescription"></div>

          <div class="grid grid-cols-2 gap-y-10 gap-x-8 @container">
            <div v-for="(value, key, i) in highlightsMap" :key="key" class="@[540px]:col-span-1 col-span-2"
              :class="[i === 2 ? 'col-span-2' : 'col-span-1']">
              <h2 class="mb-2 text-2xl font-medium">{{ key }}</h2>
              <HighlightList v-if="['Vereisten', 'Voorkeur'].includes(key)" :items="value"></HighlightList>
              <ul v-else class="flex flex-wrap gap-2">
                <li v-for="(benefit, i) in job.benefits" :key="i"
                  class="px-3 py-1 text-sm rounded text-neutral-600 bg-neutral-200">{{ benefit }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="basis-1/3">
          <Card class="sticky overflow-hidden" padding="none">
            <div class="p-4">
              <div class="flex items-center justify-center">
                <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" class="object-contain w-40 h-20">
              </div>
              <HorizontalRuler></HorizontalRuler>
              <h4 class="text-lg font-bold">{{ job.company.name }}</h4>
              <p class="mb-2 text-sm whitespace-pre-wrap text-neutral-500">{{ job.company.description }}</p>
            </div>
            <GoogleMap v-if="showMap" api-key="AIzaSyAiuQsYUREMTTT2JtuMSrlwVvCyQ19igNo" class="w-full h-64 bg-neutral-200"
              :disable-default-ui="true" :zoom-control="true" language="nl" region="nl"
              :center="{ lat: job.company.lat, lng: job.company.lng }" :zoom="13">
              <Marker :options="{ position: { lat: job.company.lat, lng: job.company.lng } }" />
            </GoogleMap>
          </Card>
        </div>
      </div>
    </div>

    <Card ref="sC"
      class="sticky bottom-0 flex items-center justify-center p-4 mx-3 transition bg-white md:hidden solliciteer-card"
      :class="{ 'solliciteer-card--sticky !mx-0 border-none rounded-none': !sCInViewReferenceElementInView }">
      <!-- <Button type="solid" label="Solliciteren" size="large" :disabled="!Boolean(job)"
        :to="{ path: `${currentRoutePath}/solliciteren` }" class="w-full text-center"></Button> -->
      <Button type="primary" :to="`${currentRoutePath}/solliciteren`" size="large"
        class="w-full text-center">Solliciteren</Button>
    </Card>
    <div ref="sCInViewReferenceElement" class="h-px mb-10 md:hidden "></div>

    <div class="c-container">

      <!-- <ul v-if="flashSkeleton" class="max-w-3xl"> -->
      <ul v-if="!relatedJobs || relatedJobs.length === 0 && !job" class="max-w-3xl">
        <SkeletonItem name="related-jobs" classString="mb-4 w-72 h-8"></SkeletonItem>
        <JobListItemSkeleton v-for="index in 3"></JobListItemSkeleton>
      </ul>

      <ul v-else-if="relatedJobs.length" v-auto-animate class="max-w-3xl">
        <h2 class="mb-4 text-2xl font-medium">Gerelateerde vacatures</h2>
        <JobListItem v-for="(job, index) in relatedJobs" :key="job.id" :job="job" class="">
        </JobListItem>
      </ul>

    </div>
  </div>
</template>

<script setup lang="ts">
import { IJob } from "~/types/job/Job";
import { marked } from 'marked';
import { GoogleMap, Marker } from 'vue3-google-map';
import { Database } from "~/types/Database";

const route = useRoute();
const supabaseClient = useSupabaseClient<Database>();

const jobId = route.params.id as string;
const currentRoutePath = route.path;
const job = ref<IJob | null>(null);
const relatedJobs = ref<IJob[] | null>(null);

const flashSkeleton = ref(true);

// sC = solliciteerCard
const sC = ref(null);
const sCInViewReferenceElement = ref(null);
const sCInViewReferenceElementInView = useElementVisibility(sCInViewReferenceElement);

useHead({
  meta: [{
    hid: 'description',
    name: 'description',
    content: `Vacature`
  }],
  title: 'Vacature'
});

const showMap = computed(() => {
  return job.value?.company.location !== null && job.value?.company.lat !== null && job.value?.company.lng !== null;
});

const renderedDescription = computed(() => {
  return marked.parse(job.value?.description ?? '');
});

const highlightsMap = computed(() => {
  const requirements = job.value?.requirements?.filter(item => item !== '') ?? [];
  const preferences = job.value?.preferences?.filter(item => item !== '') ?? [];
  const benefits = job.value?.benefits?.filter(item => item !== '') ?? [];
  return {
    ...(requirements.length > 0 && { Vereisten: requirements }),
    ...(preferences.length > 0 && { Voorkeur: preferences }),
    ...(benefits.length > 0 && { Voordelen: benefits })
  };
});

// setInterval(() => {
//   flashSkeleton.value = !flashSkeleton.value;
// }, 1000);

const getJob = async () => {
  const { data, error } = await supabaseClient
    .from('jobs')
    .select(`*,
      company:companies (
        *
      )
    )`)
    .eq('id', jobId)
    .single();

  if (error) {
    console.error('Error fetching job details:', error);
  }
  return data as unknown as IJob;
};

const getRelatedJobs = (async () => {
  const { data, error } = await supabaseClient
    .from('jobs')
    .select(`
    *,
    company:companies (
      *
    )
    `)
    .neq('id', jobId)
    .limit(3)
    .order('created_at', { ascending: false });
  return data ?? [];
});

useAsyncData('jobs', async () => {
  job.value = await getJob();
  useHead({
    meta: [{
      hid: 'description',
      name: 'description',
      content: `Vacature ${capitalize(job.value?.name) ?? 'Vacature'} bij ${capitalize(job.value?.company.name) ?? 'Bedrijf'}`
    }],
    title: capitalize(job.value?.name) ?? 'Vacature'
  });
});

useAsyncData('relatedJobs', async () => {
  relatedJobs.value = await getRelatedJobs() as unknown as IJob[];
});

</script>

<style lang="scss">
.solliciteer-card {
  transition: all 0.2s ease-in-out;

  &--sticky {
    filter: drop-shadow(0 -4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 -2px 2px rgb(0 0 0 / 0.06));
    // filter: drop-shadow(0 -10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 -4px 3px rgb(0 0 0 / 0.1));
  }
}
</style>