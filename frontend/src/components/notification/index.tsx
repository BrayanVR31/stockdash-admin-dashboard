import { Check, TriangleAlert, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ReactNode, CSSProperties, useEffect, useState } from "react";
import "./styles.css";

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
  style?: CSSProperties;
  title?: string;
  duration?: number;
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
  style = {},
  title = "Notification",
  duration = 2_000,
}: Props) => {
  const [show, setShow] = useState(isVisible);
  useEffect(() => {
    const id = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(id);
  }, []);
  console.log({ exit: duration / 1000 });
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          style={style}
          className={`mb-6 toast-notification ${matchNotification[type].notificationClassName} ${isVisible ? "animate-enter" : "animate-leave"}`}
          initial={{ opacity: 0, y: -40, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(6px)" }}
          transition={{
            ease: [0.4, 0, 0.2, 1],
            duration: duration / 1000,
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="icon-wrapper">
            <div className="toast-icon">{matchNotification[type].icon}</div>
          </div>
          <div className="toast-content">
            <h6 className="font-bold text-sm mb-2">{title}</h6>
            <p className="text-xs">{children}</p>
          </div>
          <button
            onClick={() => {
              if (onClose) onClose();
              setShow(false);
            }}
            type="button"
            className="toast-close"
          >
            <X />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Notification;
