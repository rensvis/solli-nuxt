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
              <NuxtLink :to="`${currentRoutePath}/solliciteren`" class="hidden md:block">
                <Button type="primary" :to="`${currentRoutePath}/solliciteren`" size="large">Solliciteren</Button>
              </NuxtLink>
              <!-- <Button type="solid" label="Solliciteren" :to="{ path: `${currentRoutePath}/solliciteren` }"
                class="hidden md:block"></Button> -->


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
          <Card class="sticky">
            <div class="flex items-center justify-center">
              <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" class="object-contain w-40 h-20">
            </div>
            <HorizontalRuler></HorizontalRuler>
            <h4 class="text-lg font-bold">{{ job.company.name }}</h4>
            <p class="mb-2 text-sm whitespace-pre-wrap text-neutral-500">{{ job.company.description }}</p>
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

const route = useRoute();
const client = useSupabaseClient();

const jobId = route.params.id as string;
const currentRoutePath = route.path;
const job = ref<IJob | null>(null);
const relatedJobs = ref<IJob[] | null>(null);

const flashSkeleton = ref(true);

// sC = solliciteerCard
const sC = ref(null);
const sCInViewReferenceElement = ref(null);
const sCInViewReferenceElementInView = useElementVisibility(sCInViewReferenceElement);

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

onMounted(() => {
  getJob();
  fetchRelatedJobs();
});

const getJob = async () => {
  const { data, error } = await client
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
  } else {
    job.value = data as unknown as IJob;
  }
};

const fetchRelatedJobs = (async () => {
  const { data, error } = await client
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
  relatedJobs.value = (data ?? []);
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