import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, X } from "lucide-react";

interface ErrorNotificationProps {
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const ErrorNotification = ({
  message,
  onClose,
  autoClose = true,
  duration = 3000,
}: ErrorNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!message || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-w-full my-5"
      >
        <div className="bg-error/10 border border-error/20 rounded-lg shadow-lg p-4 flex items-start gap-3">
          <div className="text-error mt-0.5">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-error text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              if (onClose) onClose();
            }}
            className="text-error/70 hover:text-error transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorNotification;
