<template>
  <div class="px-3 py-1 rounded-full w-fit"
    :class="[employmentType === EmploymentType.FullTime ? 'text-indigo-600 bg-indigo-200' : 'text-amber-600 bg-amber-200']">
    {{ employmentType }}
  </div>
</template>

<script setup lang="ts">
import { EmploymentType } from "~/types/job/EmploymentType";

const props = defineProps({
  // employmentType: {
  //   type: String as PropType<EmploymentType>,
  //   required: true
  // }
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