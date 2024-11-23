import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const WarningModal = ({ toggleModal, handleConfirm }: any) => {
  return (
    <div
      onClick={toggleModal}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Confirm Exit</h2>
      <p className="text-sm mb-4">Are you sure you want to leave this page?</p>
      <div className="flex justify-end gap-4">
        <CustomButton onClick={handleConfirm} className="w-1/2 bg-gray-400">
          Yes
        </CustomButton>
        <CustomButton onClick={toggleModal} className="w-1/2">
          No
        </CustomButton>
      </div>
    </div>
  );
};

export { WarningModal };
