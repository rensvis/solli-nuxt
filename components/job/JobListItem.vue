<template>
  <li class="@container">

    <!-- < small -->
    <Card :hasBackground="false" class="mb-4 bg-neutral-50 @lg:hidden">
      <div class="flex items-center gap-4 mb-4">
        <div
          class="flex items-center justify-center flex-shrink w-16 h-16 p-2 bg-white rounded-lg sm:w-20 sm:h-20 aspect-square">
          <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" class="object-contain w-full h-full">
        </div>
        <div class="leading-none ">
          <h3 class="mb-2 text-xl font-bold">{{ job.name }}</h3>
          <p class="text-neutral-500">{{ job.company.name }}</p>
        </div>
      </div>
      <p class="mb-2 text-neutral-500">{{ summaryString }}</p>
      <p class="mb-4 text-neutral-700">{{ jobDescriptionShort }}</p>

      <div class="flex items-center gap-4 mb-2">
        <div class="px-3 py-1 rounded-full w-fit"
          :class="[jobStatus === JobStatus.FullTime ? 'text-indigo-600 bg-indigo-200' : 'text-amber-600 bg-amber-200']">
          {{ jobStatus }}
        </div>
        <span class="text-xs text-neutral-400 whitespace-nowrap">
          <timeago :datetime="new Date(job.created_at)" :locale="nl" />
        </span>
      </div>
    </Card>

    <!-- > small -->
    <Card :hasBackground="false" class="hidden mb-4 bg-neutral-50 @lg:block">
      <div class="float-right px-3 py-1 rounded-full"
        :class="[jobStatus === JobStatus.FullTime ? 'text-indigo-600 bg-indigo-200' : 'text-amber-600 bg-amber-200']">
        {{ jobStatus }}
      </div>
      <div class="flex items-center gap-4 mb-4">
        <div
          class="flex items-center justify-center flex-shrink w-16 h-16 p-2 bg-white rounded-lg sm:w-20 sm:h-20 aspect-square">
          <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" class="object-contain w-full h-full">
        </div>
        <div class="leading-none ">
          <div class="flex items-center gap-4 mb-2 mr-2">
            <h3 class="items-center text-xl font-bold">{{ job.name }}</h3>
            <span class="text-xs text-neutral-400 whitespace-nowrap">
              <timeago :datetime="new Date(job.created_at)" :locale="nl" />
            </span>
          </div>
          <p class="text-neutral-500">{{ job.company.name }}</p>
        </div>
      </div>
      <p class="mb-2 text-neutral-500">{{ summaryString }}</p>
      <p class="mb-4 text-neutral-700">{{ jobDescriptionLong }}</p>

      <!-- <pre>{{ job }}</pre> -->
    </Card>

    <!-- <Card :hasBackground="false" class="hidden mb-4 bg-neutral-50 lg:block">

    </Card> -->
  </li>
</template>


<script setup lang="ts">
import nl from 'date-fns/locale/nl/index.js'; // import custom locale
import { IJob } from "~/types";

enum JobStatus {
  FullTime = "Fulltime",
  PartTime = "Parttime"
}

const props = defineProps({
  job: {
    type: Object as PropType<IJob>,
    required: true
  }
});

const jobDescriptionShort = computed(() => {
  return `${props.job.description.substring(0, 110)}...`;
});
const jobDescriptionLong = computed(() => {
  return `${props.job.description.substring(0, 200)}...`;
});

const summaryString = computed(() => {
  const hours_min = props.job.hours_per_week_min, hours_max = props.job.hours_per_week_max;
  return [props.job.company.city, `${(hours_min === hours_max || !hours_max) ? hours_min : [hours_min, hours_max].join('-')} uur per week`, props.job.salary].filter(val => val).join(" • ");
  // 
});

const jobStatus = computed(() => {
  if (props.job.hours_per_week_min >= 32) {
    return JobStatus.FullTime;
  } else {
    return JobStatus.PartTime;
  }
});


</script>