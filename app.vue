
<template>
  <div :class="{ 'no-transition': isLoading }" class="text-neutral-700">
    <el-config-provider :locale="locale">
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <TheHeader></TheHeader>
      <PageWrapper>
        <NuxtPage />
      </PageWrapper>
      <TheFooter></TheFooter>
      <ConfirmDialog></ConfirmDialog>
    </el-config-provider>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import nl from 'element-plus/dist/locale/nl.mjs';
const locale = nl;

let isLoading = ref(true);

const confirmDialog = useConfirmDialog();
provide('confirmDialog', confirmDialog);

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
