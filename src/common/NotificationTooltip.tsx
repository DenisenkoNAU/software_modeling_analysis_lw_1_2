import { useState, useEffect, useCallback } from "react";
import { eventBus } from "./eventBus";

let timer: NodeJS.Timeout | null = null;

export const NotificationTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const showNotification = ({ message }: { message: string }) => {
      if (timer) {
        clearTimeout(timer);
      }

      setMessage(message);
      setIsVisible(true);

      timer = setTimeout(() => {
        setIsVisible(false);
        setMessage('');
      }, 3000);
    };

    eventBus.on('showNotification', showNotification);

    return () => {
      eventBus.off('showNotification', showNotification);
    };
  }, []);

  if (isVisible) {
    return (
      <div
        className="fixed top-8 right-8 flex items-start gap-4 bg-gray-700 text-white/80 px-4 py-4 rounded-lg shadow-lg"
      >
        <span className="max-w-64">{message}</span>
        <button onClick={onClose} className="text-white/60 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            width="16px"
            height="16px"
            viewBox="0 0 50 50"
            fill="white">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/>
          </svg>
        </button>
      </div>
    )
  }

  return null;
};