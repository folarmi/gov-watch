/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useConfirmNavigation(onConfirm: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Open the confirmation modal
  const showConfirmationModal = (navigationAction: any) => {
    setIsModalOpen(true);
    setPendingNavigation(navigationAction);
  };

  // Handle user confirmation
  const handleConfirm = () => {
    setIsModalOpen(false);

    // Proceed with the pending navigation action
    if (pendingNavigation === "back") {
      window.history.go(-1);
    } else if (pendingNavigation === "beforeunload") {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      onConfirm?.();
    }

    setPendingNavigation(null);
  };

  // Handle user cancellation
  const handleCancel = () => {
    setIsModalOpen(false);
    setPendingNavigation(null);

    // Push a new state to restore the current URL (prevent back navigation)
    window.history.pushState(null, "", window.location.href);
  };

  // Handle browser back button (intercept using History API)
  const handleBackButton = () => {
    showConfirmationModal("back");
  };

  // Handle beforeunload event (tab close or refresh)
  const handleBeforeUnload = (event: any) => {
    event.preventDefault();
    showConfirmationModal("beforeunload");

    // Show a browser-native confirmation prompt
    event.returnValue = "";
  };

  useEffect(() => {
    // Listen for the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Intercept back button navigation using the History API
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackButton);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return {
    isModalOpen,
    handleConfirm,
    handleCancel,
  };
}
