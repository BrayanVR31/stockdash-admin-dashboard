import { Check, TriangleAlert, Info, X } from "lucide-react";
import "./styles.css";
import { ReactNode } from "react";

type NotificationType = "success" | "error" | "info" | "warning";
type NotificationClassType =
  | "notification-success"
  | "notification-error"
  | "notification-info"
  | "notification-warning";

interface Props {
  type?: NotificationType;
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

type Variants = {
  [key in NotificationType]: {
    notificationClassName: NotificationClassType;
    icon: ReactNode;
  };
};

const matchNotification: Variants = {
  success: {
    notificationClassName: "notification-success",
    icon: <Check />,
  },
  warning: {
    notificationClassName: "notification-warning",
    icon: <TriangleAlert />,
  },
  error: {
    notificationClassName: "notification-error",
    icon: <X />,
  },
  info: {
    notificationClassName: "notification-info",
    icon: <Info />,
  },
};

const Notification = ({
  type = "info",
  children,
  isVisible,
  onClose,
}: Props) => {
  return (
    <div
      className={`toast-notification ${matchNotification[type].notificationClassName} ${isVisible ? "animate-enter" : "animate-leave"}`}
    >
      <div className="toast-icon">{matchNotification[type].icon}</div>
      <div className="toast-content">
        <p>{children}</p>
      </div>
      <button onClick={onClose} type="button" className="toast-close">
        <X />
      </button>
    </div>
  );
};

export default Notification;
