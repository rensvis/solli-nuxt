<template>
  {{ isOpen }}
  <el-dialog :key="isOpen.valueOf()" v-model="isOpen" :title="title" :before-close="cancelAndClose">
    <span>{{ message }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button tag="div" @click="cancelAndClose">Annuleren</el-button>
        <el-button tag="div" type="danger" @click="confirmAndClose">Bevestigen</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import useDialog from "~/composables/useConfirmDialog";

const confirmDialog = inject('confirmDialog');

const {
  isOpen,
  title,
  message,
  cancelAndClose,
  confirmAndClose
} = confirmDialog as any;
</script>
