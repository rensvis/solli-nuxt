<template
>
  <ul class="">
    <li v-for="(item, i) in filteredItems" :key="i" class="flex gap-2 mb-3 leading-tight">
      <font-awesome-icon icon="far fa-circle-check" class="mt-px text-lg text-green-400" />

      {{ item }}
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

const filteredItems = computed(() => {
  return props.items.filter(item => item !== "");
});
</script>