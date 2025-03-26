// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Modal from "../modals/Modal";

// const PageWithLeaveConfirmation: React.FC = () => {
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [isBlocking, setIsBlocking] = useState(true); // State to block navigation
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Handle page reload/closure
//   useEffect(() => {
//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (isBlocking) {
//         event.preventDefault();
//         event.returnValue = ""; // Required for Chrome
//         setShowModal(true); // Show the modal
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isBlocking]);

//   // Handle in-app navigation
//   useEffect(() => {
//     const handleNavigation = () => {
//       if (isBlocking) {
//         setShowModal(true); // Show the modal
//         window.history.pushState(null, "", location.pathname); // Prevent navigation
//       }
//     };

//     window.addEventListener("popstate", handleNavigation);

//     return () => {
//       window.removeEventListener("popstate", handleNavigation);
//     };
//   }, [isBlocking, location.pathname]);

//   // Handle user confirmation
//   const handleConfirmLeave = () => {
//     setShowModal(false); // Hide the modal
//     setIsBlocking(false); // Allow navigation
//     navigate(-1); // Navigate back
//   };

//   // Handle user cancellation
//   const handleCancelLeave = () => {
//     setShowModal(false); // Hide the modal
//   };

//   return (
//     <div>
//       <h1>Your Page Content</h1>
//       <p>Try navigating away to see the confirmation modal.</p>

//       {/* Confirmation Modal */}
//       <Modal show={showModal} toggleModal={handleCancelLeave}>
//         <div className="p-4 bg-white rounded-xl">
//           <h2 className="text-xl font-bold mb-4">
//             Are you sure you want to leave?
//           </h2>
//           <p>Your changes may not be saved.</p>
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               onClick={handleCancelLeave}
//               className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleConfirmLeave}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Leave
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export { PageWithLeaveConfirmation };
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modals/Modal";

const PageWithLeaveConfirmation: React.FC = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isBlocking, setIsBlocking] = useState(true); // State to block navigation
  const navigate = useNavigate();
  const location = useLocation();

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isBlocking) {
        setShowModal(true); // Show the modal
        event.preventDefault(); // Prevent the default back navigation
        window.history.pushState(null, "", location.pathname); // Push the current path back into the history stack
      }
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isBlocking, location.pathname]);

  // Handle user confirmation
  const handleConfirmLeave = () => {
    setShowModal(false); // Hide the modal
    setIsBlocking(false); // Allow navigation
    navigate(-1); // Navigate back
  };

  // Handle user cancellation
  const handleCancelLeave = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div>
      <h1>Your Page Content</h1>
      <p>Try navigating away to see the confirmation modal.</p>

      {/* Confirmation Modal */}
      <Modal show={showModal} toggleModal={handleCancelLeave}>
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            Are you sure you want to leave?
          </h2>
          <p>Your changes may not be saved.</p>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleCancelLeave}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLeave}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Leave
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export { PageWithLeaveConfirmation };
