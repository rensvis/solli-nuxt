
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

let isLoading = ref(true);

nextTick(() => {
  isLoading.value = false;
});

onBeforeUnmount(() => {
  window.removeEventListener('load', () => {
    isLoading.value = false;
  });
});
</script>

<style>
.no-transition * {
  transition: none !important;
}
</style>

<template>
  <div :class="{ 'no-transition': isLoading }">
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <TheHeader></TheHeader>
    <PageWrapper>
      <NuxtPage />
    </PageWrapper>
    <TheFooter></TheFooter>
  </div>
</template>
