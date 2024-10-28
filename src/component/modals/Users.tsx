import CustomButton from "../CustomButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const Users = ({ toggleModal }: any) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium text-gray-700">
        <p
          className="cursor-pointer hover:text-green-600 transition-all duration-200"
          onClick={() => console.log("Add User")}
        >
          Add User
        </p>
        <p
          className="cursor-pointer hover:text-blue-600 transition-all duration-200"
          onClick={() => console.log("Edit User")}
        >
          Edit User
        </p>
        <p
          className="cursor-pointer hover:text-red-600 transition-all duration-200"
          onClick={() => console.log("Delete User")}
        >
          Delete User
        </p>
        <p
          className="cursor-pointer hover:text-gray-500 transition-all duration-200"
          onClick={() => console.log("Search User")}
        >
          Search User
        </p>
      </div>

      <form className="flex items-center">
        <CustomButton
          className="w-fit mr-8"
          variant="secondary"
          onClick={toggleModal}
        >
          Cancel
        </CustomButton>
        <CustomButton className="w-fit">Confirm</CustomButton>
      </form>
    </div>
  );
};

export default Users;
