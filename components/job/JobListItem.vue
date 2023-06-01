<template>
  <li class="@container mb-4">

    <!-- < small -->
    <NuxtLink :to="{ path: `/jobs/${job.id}` }" :aria-label="job.name">
      <Card :hasBackground="false" class="bg-neutral-50 @lg:hidden" :class="classString">
        <div class="flex items-center gap-4">
          <div
            class="flex items-center justify-center flex-shrink w-16 h-16 p-2 bg-white rounded-lg sm:w-20 sm:h-20 aspect-square">
            <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" height="48px" width="48px"
              class="object-contain w-full h-full text-xs">
          </div>
          <div class="leading-none" style="word-break: break-word">
            <h3 class="mb-2 text-xl font-bold">{{ job.name }}</h3>
            <p class="text-neutral-500">{{ job.company.name }}</p>
          </div>
        </div>
        <p class="mb-2 text-neutral-500">{{ summaryString }}</p>
        <p class="mb-4">{{ jobDescriptionShort }}</p>

        <div class="flex items-center gap-4 mb-2">
          <EmploymentTypePill :hoursPerWeekMin="job.hours_per_week_min" class="float-right"></EmploymentTypePill>
          <span class="text-xs text-neutral-400 whitespace-nowrap">
            <timeago :datetime="new Date(job.created_at)" :locale="nl" />
          </span>
        </div>
      </Card>
    </NuxtLink>

    <!-- > small -->
    <NuxtLink :to="{ path: `/jobs/${job.id}` }" :aria-label="job.name">
      <Card :hasBackground="false" :class="classString"
        class="hidden bg-neutral-50 @lg:block transition hover:bg-neutral-100 motion-reduce:transition-none">
        <EmploymentTypePill :hoursPerWeekMin="job.hours_per_week_min" class="float-right"></EmploymentTypePill>
        <div class="flex items-center gap-4 mb-4">
          <div
            class="flex items-center justify-center flex-shrink w-16 h-16 p-2 bg-white rounded-lg sm:w-20 sm:h-20 aspect-square">
            <img :src="job.company.logo_url" :alt="`${job.company.name} logo`" height="64px" width="64px"
              class="object-contain w-full h-full text-xs">
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
        <p class="ext-neutral-700">{{ jobDescriptionLong }}</p>

        <!-- <pre>{{ job }}</pre> -->
      </Card>
    </NuxtLink>

    <!-- <Card :hasBackground="false" class="hidden mb-4 bg-neutral-50 lg:block">

    </Card> -->
  </li>
</template>


<script setup lang="ts">
import nl from 'date-fns/locale/nl/index.js'; // import custom locale
import { Database } from "~/types/Database";
import { IJob } from "~/types/job/Job";

const supabaseClient = useSupabaseClient<Database>();

const props = defineProps({
  job: {
    type: Object as PropType<IJob>,
    required: true
  },
  classString: {
    type: String,
    default: '',
  }
});



/**
 * 01-06-2023
 * Supabase image resizing is in beta and currently only available
 * on pro plans. To implement it once it becomes available add a
 * logo_path column to the production database.
 */
// const imageUrl = computed(() => {
//   const { data: { publicUrl } } = supabaseClient.storage.from('logos').getPublicUrl("vaping.jpeg", {
//     // const { data: { publicUrl } } = supabaseClient.storage.from('logos').getPublicUrl(props.job.company.logo_path, {
//     transform: {
//       width: 64,
//       height: 64,
//       resize: 'contain'
//     },
//   });
//   return publicUrl;
// });

const jobDescriptionShort = computed(() => {
  return `${props.job.description.substring(0, 110)}...`;
});
const jobDescriptionLong = computed(() => {
  return `${props.job.description.substring(0, 200)}...`;
});

const summaryString = computed(() => {
  const hours_min = props.job.hours_per_week_min, hours_max = props.job.hours_per_week_max;
  return [props.job.company.city, `${(hours_min === hours_max || !hours_max) ? hours_min : [hours_min, hours_max].join('-')} uur per week`].filter(val => val).join(" • ");
  // 
});



</script>