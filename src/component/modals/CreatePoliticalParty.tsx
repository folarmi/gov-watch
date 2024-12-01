/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

const CreatePoliticalParty = ({ toggleModal }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const queryClient = useQueryClient();
  const { userId, userCountry } = useAppSelector(
    (state: RootState) => state.auth
  );

  const createPoliticalPartyMutation = useCustomMutation({
    endpoint: "PoliticalParties/CreatePoliticalParty",
    successMessage: (data: any) => data?.remark,
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
      country: userCountry,
      createdBy: userId,
    };

    createPoliticalPartyMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl font">
        Create New Political Party
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
            Create Political Party
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreatePoliticalParty;

// {
//   "title": "Eius sapiente fugiat",
//   "authorName": "Deirdre Carr",
//   "snippet": "Deserunt elit volup",
//   "category": 4,
//   "imageCaption": "Dolor eum occaecat d",
//   "state": "Ethan Spears",
//   "lga": "Alexander Calderon",
//   "lcda": "Lane Vincent",
//   "ward": "Aidan Lara",
//   "datePromiseMade": "1975-08-01",
//   "promisedDeadline": "2003-07-26",
//   "datePromiseFulfilled": "2017-05-10",
//   "politicalActorName": "Aphrodite Douglas",
//   "mda": "Talon Bell",
//   "reference": "Consequuntur veritat",
//   "link": "Doloremque ab vel to",
//   "country": "Nigeria",
//   "isFederal": true,
//   "isPromise": true,
//   "contributorPublicId": "a7e36778-2fec-4b6e-8569-dbe47778dff0",
//   "image": "http://govwatch.runasp.net/Uploads/2d60d3e5-481d-4559-b749-9269f83f4a41_Screenshot 2024-08-16 at 10.57.26.png",
//   "isPromiseFulfilled": false,
//   "tags": "ggg , test , testing",
//   "article": "<p>Voluptatem. Exceptur.</p>"
// }
