import { ref } from "vue";
import { IConfirmDialogParams } from "~/types/ConfirmDialogParams";

export function useConfirmDialog() {
  const isOpen = ref(false);
  const title = ref("");
  const message = ref("");
  const cancelText = ref("");
  const confirmText = ref("");

  const confirmHandler = ref<() => void>(() => {});
  const cancelHandler = ref<() => void>(() => {});

  function openConfirmDialog(
    // params: Partial<IConfirmDialogParams> & {
    //   title: "weet je het zeker?";
    //   message?: string;
    //   cancelText: "Annuleren";
    //   confirmText: "Bevestigen";
    // }
    // accept IConfirmDialogParams and set fallback values
    // params: Partial<IConfirmDialogParams> & {
    //   title: string;
    //   cancelText: string;
    //   confirmText: string;
    // }
    {
      newTitle = "Weet je het zeker?",
      newMessage = "",
      newCancelText = "Annuleren",
      newConfirmText = "Bevestigen",
      newConfirmHandler,
      newCancelHandler,
    }: IConfirmDialogParams
  ) {
    title.value = newTitle;
    message.value = newMessage || "";
    cancelText.value = newCancelText;
    confirmText.value = newConfirmText;
    confirmHandler.value = newConfirmHandler || (() => {});
    cancelHandler.value = newCancelHandler || (() => {});
    isOpen.value = true;

    // console.log("openConfirmDialog");
    // console.log(newCancelText);
    // console.log(newConfirmText);
    // title.value = newTitle;
    // message.value = newMessage;
    // cancelText.value = newCancelText;
    // confirmText.value = newConfirmText;
    // confirmHandler.value = newConfirmHandler;
    // cancelHandler.value = newCancelHandler;
    // isOpen.value = true;
    // console.log(confirmText.value);
    // console.log(cancelText.value);
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
    cancelText,
    confirmText,
    openDialog: openConfirmDialog,
    closeDialog,
    confirmAndClose,
    cancelAndClose,
  };
}
