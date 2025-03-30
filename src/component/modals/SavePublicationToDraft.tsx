import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

type EditPublicationProps = {
  toggleModal: () => void;
  handleFormSubmit: (data: any) => void;
  defaultValues?: any;
};

const SavePublicationToDraft = ({
  toggleModal,
  handleFormSubmit,
  defaultValues,
}: EditPublicationProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
      <p className="text-sm mb-4">Are you sure you want to save to drafts?</p>

      <form className="flex items-center">
        <CustomButton
          className="w-fit mr-8"
          variant="secondary"
          onClick={toggleModal}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit(defaultValues);
          }}
          className="w-fit"
        >
          Confirm
        </CustomButton>
      </form>
    </div>
  );
};

export { SavePublicationToDraft };
