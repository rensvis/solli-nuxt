export interface IConfirmDialogParams {
  newTitle?: string;
  newMessage?: string;
  newCancelText?: string;
  newConfirmText?: string;
  newConfirmHandler: () => void;
  newCancelHandler: () => void;
}
