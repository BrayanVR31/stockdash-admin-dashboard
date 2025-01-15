import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { login } from "./login-service";
import { AuthMessage } from "../components";

function useAuth() {
  const navigate = useNavigate();
  // Toaster notifications

  const displayAuthSuccess = () => {
    toast(<AuthMessage variation="auth-success" />, {
      className:
        "relative border bg-white dark:bg-slate-900 dark:border-gray-400/85",
      autoClose: 3000,
      closeButton: (props) => (
        <button
          onClick={() => props.closeToast(true)}
          className="absolute right-4 top-4 text-gray-400"
        >
          <X size={18.5} />
        </button>
      ),
      hideProgressBar: true,
    });
  };
  const displayAuthError = () => {
    toast(<AuthMessage variation="auth-error" />, {
      className:
        "relative border bg-white dark:bg-slate-900 dark:border-gray-400/85",
      autoClose: 3000,
      closeButton: (props) => (
        <button
          onClick={() => props.closeToast(true)}
          className="absolute right-4 top-4 text-gray-400"
        >
          <X size={18.5} />
        </button>
      ),
      hideProgressBar: true,
    });
  };

  const authMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { token } = response;
      console.log({ token });
    },
  });
  const displayAuthLoading = async () => {
    /*
    toast(<AuthMessage variation="auth-info" />, {
      className:
        "relative border bg-white dark:bg-slate-900 dark:border-gray-400/85",
      autoClose: 3000,
      closeButton: (props) => (
        <button
          onClick={() => props.closeToast(true)}
          className="absolute right-4 top-4 text-gray-400"
        >
          <X size={18.5} />
        </button>
      ),
      hideProgressBar: true,
    });
    */
    const delayedToast = new Promise((resolve) =>
      setTimeout(resolve, 1800),
    ).then(() => {
      if (authMutation.isSuccess) return "success...";
      throw new Error("fails");
    });
    await toast.promise(
      delayedToast,
      {
        success: {
          render: () => <AuthMessage variation="auth-success" />,
          icon: false,
          hideProgressBar: true,
        },
        pending: {
          render: () => <AuthMessage variation="auth-info" />,
          isLoading: false,
        },
        error: {
          render: () => <AuthMessage variation="auth-error" />,
          icon: false,
          hideProgressBar: true,
        },
      },
      {
        className:
          "relative border bg-white dark:bg-slate-900 dark:border-gray-400/85 overflow-hidden",
        closeButton: (props) => (
          <button
            onClick={() => props.closeToast(true)}
            className="absolute right-4 top-4 text-gray-400"
          >
            <X size={18.5} />
          </button>
        ),
      },
    );
  };
  useEffect(() => {
    if (authMutation.isPending) {
      displayAuthLoading();
    }
  }, [authMutation.isPending, authMutation.isSuccess, authMutation.isError]);
  return { authMutation, displayAuthLoading };
}

export { useAuth };
