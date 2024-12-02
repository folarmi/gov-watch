/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

const CreateRegion = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userCountry } = useAppSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createRegionMutation = useCustomMutation({
    endpoint: "Regions/CreateRegion",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllRegionsTable"],
        exact: false,
      });
    },
  });

  const submitForm = (data: any) => {
    const formData: any = {
      ...data,
      createdBy: userId,
      country: userCountry,
    };

    createRegionMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        Create A New Region
      </p>

      <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
        <div className="">
          <CustomInput
            label="Region Name"
            name="name"
            control={control}
            rules={{ required: "Region Name is required" }}
            className="mt-4"
          />
        </div>

        <div className="flex w-full justify-end mr-auto mt-4">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={createRegionMutation.isPending}
            variant="tertiary"
          >
            Create Region
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateRegion;

// https://www.govwatch.ng/api/v1/Countries/GetCountries?page=1&pageSize=5
