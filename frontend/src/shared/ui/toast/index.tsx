import { useToast } from "./useToast";
import { Toast, ToastProvider, ToastViewport } from "./Toast";

export function Toaster() {
  const { toasts } = useToast();
  return (
    <ToastProvider>
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />;
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

/** Toaster variation */
function ToastSuccess() {
  return (
    <ToastProvider>
      <Toast
        open
        title="Success"
        description="Mensaje sobre el estado de operación del sistema"
        variant="success"
        className="mt-0"
      />
    </ToastProvider>
  );
}

export { ToastProvider, Toast, useToast };
