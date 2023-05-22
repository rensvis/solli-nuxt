<template>
  <el-dialog :key="isOpen.valueOf()" v-model="isOpen" :title="title" :before-close="cancelAndClose">
    <p class="text-base">{{ message }}</p>
    <template #footer>
      <span class="dialog-footer">
        <Button type="outlined" :onClick="cancelAndClose" class="mr-2">{{ cancelText }}</Button>
        <Button type="danger" :onClick="confirmAndClose">{{ confirmText }}</Button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const confirmDialog = inject('confirmDialog');

const {
  isOpen,
  title,
  message,
  cancelText,
  confirmText,
  cancelAndClose,
  confirmAndClose,
} = confirmDialog as any;
</script>
