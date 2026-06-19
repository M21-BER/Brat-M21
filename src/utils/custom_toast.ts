// utils/toast.ts
import { toast } from "sonner";

type ToastType = "info" | "success" | "error";
type CrudAction = "create" | "update" | "delete";

type CrudMessages = {
  [K in CrudAction]: string;
};

const fixedStatus: Record<Exclude<ToastType, "info">, CrudMessages> = {
  success: {
    create: "Item created successfully",
    update: "Item updated successfully",
    delete: "Item deleted successfully",
  },
  error: {
    create: "Failed to create item",
    update: "Failed to update item",
    delete: "Failed to delete item",
  },
};

interface ToastOptions {
  title?: string;
  description?: string;
  info?: string;
  type?: ToastType;
  action?: CrudAction;
}

export function Toast({
  description,
  type = "info",
  info = "Please review the information provided",
  action,
  title,
}: ToastOptions) {
  let toastStyle = {};

  // Change text color based on type
  switch (type) {
    case "success":
      toastStyle = { style: { color: "#22c55e" } };
      break;
    case "error":
      toastStyle = { style: { color: "#ef4444" } };
      break;
    case "info":
    default:
      toastStyle = { style: { color: "#3b82f6" } };
      break;
  }
  const actionTitle =
    type !== "info" && action ? fixedStatus[type][action] : null;

  toast(actionTitle ? actionTitle : title || info, {
    description,
    ...toastStyle,
  });
}
