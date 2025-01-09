/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

const CreatePoliticalParty = ({ toggleModal, selectedPoliticalParty }: any) => {
  const modifiedDefaultValues = {
    ...selectedPoliticalParty,
    population: Number(
      selectedPoliticalParty?.population
        ? selectedPoliticalParty?.population?.replace(/,/g, "")
        : ""
    ),
    dateFounded: selectedPoliticalParty?.dateFounded
      ? new Date(selectedPoliticalParty?.dateFounded)
          .toISOString()
          .split("T")[0]
      : null,
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: modifiedDefaultValues || {},
  });
  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );

  const createPoliticalPartyMutation = useCustomMutation({
    endpoint: selectedPoliticalParty
      ? "PoliticalParties/UpdatePoliticalParty"
      : "PoliticalParties/CreatePoliticalParty",
    successMessage: (data: any) => data?.remark,
    method: selectedPoliticalParty ? "put" : "post",
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllPoliticalPartiesTable"],
        exact: false,
      });
    },
  });

  const submitForm = (data: any) => {
    const formData: any = {
      ...data,
    };

    if (selectedPoliticalParty) {
      formData.lastModifiedBy = userId;
      formData.image = selectedPoliticalParty.image;
    } else {
      formData.country = userCountry;
      formData.createdBy = userId;
    }

    createPoliticalPartyMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        {selectedPoliticalParty
          ? "Edit Political Party"
          : "Create New Political Party"}
      </p>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="my-4 grid gap-x-4 w-full"
      >
        <CustomInput
          label="Political Party Name"
          name="name"
          control={control}
          rules={{ required: "Political Party Name is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Date Founded"
          name="dateFounded"
          type="date"
          control={control}
          rules={{ required: "Date Founded is required" }}
          className="mt-4"
        />

        <CustomInput
          label="Leader Name"
          name="leaderName"
          control={control}
          rules={{ required: "Leader Name is required" }}
          className="mt-4"
        />

        <CustomTextArea name="bio" control={control} label="Bio" />

        <div className="flex w-full justify-end mr-auto">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={createPoliticalPartyMutation.isPending}
            variant="tertiary"
          >
            {selectedPoliticalParty
              ? "Edit Political Party"
              : "Create Political Party"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePoliticalParty;
