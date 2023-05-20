<template>
  {{ isOpen }}
  <el-dialog :key="isOpen.valueOf()" v-model="isOpen" :title="title" :before-close="cancelAndClose">
    <span>{{ message }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button tag="div" @click="cancelAndClose">{{ cancelText }}</el-button>
        <el-button tag="div" type="danger" @click="confirmAndClose">{{ confirmText }}</el-button>
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
