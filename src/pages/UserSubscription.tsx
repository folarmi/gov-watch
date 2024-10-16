/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import DashboardLayout from "../layouts/DashboardLayout";
import CustomInput from "../component/CustomInput";
import { useState } from "react";
import { CaveatModal } from "../component/modals/CaveatModal";
import CustomSelect from "../component/CustomSelect";
import { useGetData } from "../hooks/apiCalls";
import Modal from "../component/modals/Modal";

const UserSubscription = () => {
  const [showCaveat, setShowCaveat] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const { handleSubmit, control } = useForm();

  const toggleModal = () => {
    setShowCaveat(!showCaveat);
  };

  const submitForm = (data: any) => {
    setUserDetails(() => ({
      ...data,
    }));
    setShowCaveat(true);
  };

  const { data: usersData, isLoading: usersDataIsLoading } = useGetData({
    url: `Users/GetAllUser?page=1&pageSize=10`,
    queryKey: ["GetAllUsers"],
  });

  const usersDataFormatted =
    usersData &&
    usersData.userViewModel?.map(
      (item: { email: string; publicId: string }) => {
        return {
          label: item?.email,
          value: item?.publicId,
        };
      }
    );

  const subscriptionPeriod = [
    {
      label: "Monthly",
      value: "Monthly",
    },
    {
      label: "Biannual",
      value: "Biannual",
    },
    {
      label: "Yearly",
      value: "Yearly",
    },
  ];

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-4 mt-10 p-8 bg-white shadow-2xl w-1/2"
      >
        {/* User Dropdown */}
        <CustomSelect
          name="userId"
          options={usersDataFormatted}
          isLoading={usersDataIsLoading}
          label="Select User"
          control={control}
          placeholder="Select User"
          rules={{ required: "User is required" }}
        />

        <CustomSelect
          name="period"
          options={subscriptionPeriod}
          label="Select Subscription Period"
          control={control}
          placeholder="Select Subscription Period"
          rules={{ required: "Subscription Period is required" }}
        />

        <CustomInput
          label="Subscription Length (in numbers)"
          name="email"
          min="1"
          type="number"
          control={control}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Update Subscription
        </button>
      </form>

      <Modal show={showCaveat} toggleModal={toggleModal}>
        <div className="p-4">
          <CaveatModal userDetails={userDetails} toggleModal={toggleModal} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export { UserSubscription };
