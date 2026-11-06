import { useContext, useEffect, useState } from "react";
import { AppDispatchContext } from "../context/AppContext";
import { SuccessNotification } from "./SuccessNotification";
import { ErrorNotification } from "./ErrorNotification";
import { LoadingNotification } from "./LoadingNotification";
import { InfoNotification } from "./InfoNotification";

export function NotificationGenerator({ notification }) {
  const dispatch = useContext(AppDispatchContext);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      dispatch?.({ type: "CLOSE_NOTIFICATION", idToDelete: notification.id });
    }, 250);
  };

  useEffect(() => {
    if (notification?.type === "loading") return;

    const timer = setTimeout(() => {
      handleClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [notification?.id, notification?.type]);

  const renderContent = () => {
    if (!notification) return null;

    switch (notification.type) {
      case "success":
        return (
          <SuccessNotification
            title={notification.title || "Operation Successful"}
            message={notification.message}
            onClose={handleClose}
          />
        );
      case "error":
        return (
          <ErrorNotification
            title={notification.title || "Something went wrong"}
            message={notification.message}
            onClose={handleClose}
          />
        );
      case "loading":
        return (
          <LoadingNotification
            title={notification.title || "Loading..."}
            message={notification.message}
          />
        );
      case "info":
        return (
          <InfoNotification
            title={notification.title || "Information"}
            message={notification.message}
            onClose={handleClose}
          />
        );
      default:
        return (
          <SuccessNotification
            title={notification.title}
            message={notification.message}
            onClose={handleClose}
          />
        );
    }
  };

  return (
    <div
      className={`pointer-events-auto ${isClosing ? "animate-toast-out" : "animate-toast-in"}`}
    >
      {renderContent()}
    </div>
  );
}
