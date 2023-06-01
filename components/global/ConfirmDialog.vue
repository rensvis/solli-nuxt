<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center" @click="cancelAndClose">
      <div class="absolute w-full h-full bg-black/30"></div>
      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
        @click.stop>
        <div class="p-5">
          <div class="flex items-center justify-between pb-3">
            <h3 class="text-xl font-medium">{{ title }}</h3>
            <button class="cursor-pointer" @click="cancelAndClose">
              <font-awesome-icon icon="fas fa-times" size="lg" />
            </button>
          </div>
          <p class="mb-3">{{ message }}</p>
          <div class="flex justify-end pt-2">
            <Button type="outlined" :onClick="cancelAndClose" class="mr-2">{{ cancelText }}</Button>
            <Button type="danger" :onClick="confirmAndClose">{{ confirmText }}</Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
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

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .3s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-container {
  transition: all .3s ease-in-out;
  animation: modal-bounce .5s forwards;
}

@keyframes modal-bounce {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
