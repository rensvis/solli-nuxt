<template>
  <div :class="`bg-neutral-200 max-w-full rounded animate-pulse ${classString}`"></div>
</template> 

<script setup lang="ts">

defineProps({
  classString: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'skeleton-item'
  }
});
</script>