<template>
  <div class="px-3 py-1 text-sm rounded-full w-fit"
    :class="[employmentType === EmploymentType.FullTime ? 'text-moon-raker-600 bg-moon-raker-200' : 'text-ice-cold-600 bg-ice-cold-200']">
    {{ employmentType }}
  </div>
</template>

<script setup lang="ts">
import { EmploymentType } from "~/types/job/EmploymentType";

const props = defineProps({
  hoursPerWeekMin: {
    type: Number,
    required: true
  }
});

const employmentType = computed(() => {
  if (props.hoursPerWeekMin >= 32) {
    return EmploymentType.FullTime;
  } else {
    return EmploymentType.PartTime;
  }
});
</script>