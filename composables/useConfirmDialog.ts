import { ref } from "vue";

export default function useConfirmDialog() {
  const isOpen = ref(false);
  const title = ref("");
  const message = ref("");

  const confirmHandler = ref<() => void>(() => {});
  const cancelHandler = ref<() => void>(() => {});

  function openConfirmDialog(
    newTitle: string,
    newMessage: string,
    newConfirmHandler: () => void,
    newCancelHandler: () => void
  ) {
    console.log("openConfirmDialog");
    title.value = newTitle;
    message.value = newMessage;
    confirmHandler.value = newConfirmHandler;
    cancelHandler.value = newCancelHandler;
    isOpen.value = true;
  }

  function closeDialog() {
    isOpen.value = false;
  }

  function confirmAndClose() {
    confirmHandler.value();
    closeDialog();
  }

  function cancelAndClose() {
    cancelHandler.value();
    closeDialog();
  }

  return {
    isOpen,
    title,
    message,
    openDialog: openConfirmDialog,
    closeDialog,
    confirmAndClose,
    cancelAndClose,
  };
}
