<template
>
  <ul class="">
    <li v-for="(requirement, i) in items" :key="i" class="flex gap-2 mb-3 leading-tight">
      <font-awesome-icon icon="far fa-circle-check" class="mt-px text-lg text-green-400" />

      {{ requirement }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array as PropType<String[]>,
    default: []
  }
});
</script>