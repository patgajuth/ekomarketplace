import { useState, useEffect } from "react";

type UseAlertParams = {
  duration?: number;
  onClose?: () => void;
};


export function useAlert({ duration = 5000, onClose }: UseAlertParams) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const close = () => {
    setIsVisible(false);
    onClose?.();
  };

  return { isVisible, close };
}
