<template>
  <div class="py-32 c-container">
    <!-- <div v-if="!job">Loading</div> -->
    <JobDetailPageSkeleton v-if="!job"></JobDetailPageSkeleton>
    <div v-else class="flex flex-col gap-10 lg:flex-row">
      <div class="basis-2/3">
        <div class="flex justify-between">
          <div class="">
            <div class="flex flex-col mb-2 min-[425px]:items-center min-[425px]:flex-row min-[425px]:gap-5 gap-2">
              <h1 class="text-3xl font-bold min-[425px]:mb-0">{{ job.name }}</h1>
              <EmploymentTypePill :hoursPerWeekMin="job.hours_per_week_min" class="float-right"></EmploymentTypePill>
            </div>
            <p class="mb-2 text-neutral-500">{{ job.company.name }}</p>
          </div>
          <div>
            <Button type="solid" label="Solliciteren" :navigateTo="`${currentRoutePath}/solliciteren`"></Button>
          </div>
        </div>
        <HorizontalRuler></HorizontalRuler>
        <h2 class="mb-2 text-2xl font-medium text-neutral-700">Beschrijving</h2>
        <p class="mb-10 whitespace-pre-wrap text-neutral-700">{{ job.description }}</p>

        <div class="flex flex-col gap-0 mb-10 md:gap-2 md:flex-row">
          <div class="mb-10 basis-1/2 md:mb-0">
            <h2 class="mb-2 text-2xl font-medium">Vereisten</h2>
            <ul class="list-disc list-inside">
              <li v-for="(requirement, i) in job.requirements" :key="i">{{ requirement }}</li>
            </ul>
          </div>
          <div class="basis-1/2">
            <h2 class="mb-2 text-2xl font-medium">Voorkeur</h2>
            <ul class="list-disc list-inside">
              <li v-for="(preference, i) in job.preferences" :key="i">{{ preference }}</li>
            </ul>
          </div>
        </div>

        <h2 class="mb-2 text-2xl font-medium">Voordelen</h2>
        <ul class="flex flex-wrap gap-2">
          <li v-for="(benefit, i) in job.benefits" :key="i"
            class="px-3 py-1 text-sm rounded bg-neutral-200 text-neutral-600">{{ benefit }}
          </li>
        </ul>

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
</template>

<script setup lang="ts">
import { IJob } from "~/types/job/Job";


const route = useRoute();
const client = useSupabaseClient();

const jobId = route.params.id as string;
const currentRoutePath = route.path;
const job = ref<IJob | null>(null);

const show = ref(true);

setInterval(() => {
  show.value = !show.value;
}, 1000);

onMounted(async () => {
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
    job.value = data;
  }
});

</script>