import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

type EditPublicationProps = {
  toggleModal: () => void;
  handleFormSubmit: (data: any) => void;
  defaultValues?: any; // Add this
  isLoading: boolean;
};

const EditPublication = ({
  toggleModal,
  handleFormSubmit,
  defaultValues,
  isLoading,
}: EditPublicationProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">Confirm Edit Action</h2>
      <p className="text-sm mb-4">
        Are you sure you want to edit this publication?
      </p>
      <form className="flex items-center">
        <CustomButton
          className="w-fit mr-8"
          variant="secondary"
          onClick={toggleModal}
          disabled={isLoading}
          // loading={isLoading}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit(defaultValues);
          }}
          className="w-fit"
          disabled={isLoading}
          loading={isLoading}
        >
          Confirm
        </CustomButton>
      </form>
    </div>
  );
};

export { EditPublication };
