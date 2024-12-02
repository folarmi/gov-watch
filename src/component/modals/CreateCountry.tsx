/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import FileUploader from "../FileUploader";
import CustomButton from "../CustomButton";
import CustomTextArea from "../CustomTextArea";
import { toast } from "react-toastify";
import ImageDetails from "../ImageDetails";
import {
  UploadError,
  useCustomMutation,
  useUploadMutation,
} from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useQueryClient } from "@tanstack/react-query";

// const CreateCountry = ({ toggleModal, selectedCountry }: any) => {
//   const { control, handleSubmit } = useForm<any>();
//   const queryClient = useQueryClient();
//   const handleSuccess = (data: any) => {
//     setBackendPath(data?.filePath);
//   };

//   console.log(selectedCountry);
//   const handleError = (error: UploadError) => {
//     console.error("Upload error:", error);
//   };

//   const uploadMutation = useUploadMutation(handleSuccess, handleError);
//   const { userId } = useAppSelector((state: RootState) => state.auth);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [backendPath, setBackendPath] = useState("");

//   const handleFileUpload = (file: File) => {
//     setUploadedFile(file);
//     const formData = new FormData();
//     formData.append("uploadFile", file);
//     formData.append("createdBy", userId);
//     uploadMutation.mutate(formData);
//   };

//   const createCountryMutation = useCustomMutation({
//     endpoint: "Countries/CreateCountry",
//     successMessage: (data: any) => data?.remark,
//     errorMessage: (error: any) => error?.response?.data?.remark,
//     onSuccessCallback: () => {
//       toggleModal();
//       queryClient.invalidateQueries({
//         queryKey: ["GetCountriesTable"],
//         exact: false,
//       });
//     },
//   });

//   const submitForm = (data: any) => {
//     if (backendPath === "") {
//       toast("Please upload a file first");
//       return;
//     }

//     const formData: any = {
//       ...data,
//       population: +data.population,
//       gdp: +data.gdp,
//       image: backendPath,
//       Bloc: "NATO",
//       createdBy: userId,
//     };

//     createCountryMutation.mutate(formData);
//   };

//   return (
//     <div className="bg-white rounded-xl p-6">
//       <p className="text-center font-medium text-xl font">
//         Create A New Country
//       </p>

//       <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
//         <div className="grid grid-cols-4 gap-x-4">
//           <CustomInput
//             label="Country Name"
//             name="name"
//             control={control}
//             rules={{ required: "Country Name is required" }}
//             className="mt-4"
//           />

//           <CustomInput
//             label="Country Capital"
//             name="capital"
//             control={control}
//             rules={{ required: "Country Capital is required" }}
//             className="mt-4"
//           />

//           <CustomInput
//             label="Leader Name"
//             name="leaderName"
//             control={control}
//             rules={{ required: "Leader Name is required" }}
//             className="mt-4"
//           />

//           <CustomInput
//             label="Currency"
//             name="currency"
//             control={control}
//             rules={{ required: "Currency is required" }}
//             className="mt-4"
//           />

//           <CustomInput
//             label="Population"
//             name="population"
//             control={control}
//             type="number"
//             rules={{ required: "Population is required" }}
//             className="mt-4 col-span-2"
//           />

//           <CustomInput
//             label="GDP"
//             name="gdp"
//             type="number"
//             control={control}
//             rules={{ required: "GDP is required" }}
//             className="mt-4 col-span-2"
//           />

//           <div className="col-span-2">
//             <CustomTextArea name="bio" control={control} label="Bio" />
//           </div>

//           <div className="col-span-2 ">
//             <p className="text-sm font-medium pb-2">Flag</p>

//             <FileUploader
//               maxSizeMB={1}
//               acceptFormats={["png", "jpeg", "jpg", "gif"]}
//               onFileUpload={handleFileUpload}
//             />
//             {uploadedFile && (
//               <ImageDetails
//                 fileName={uploadedFile.name}
//                 fileSize={uploadedFile.size}
//               />
//             )}
//           </div>
//         </div>

//         <div className="flex w-full justify-end mr-auto mt-4">
//           <div className="mr-3">
//             <CustomButton onClick={toggleModal} variant="skeleton">
//               Cancel
//             </CustomButton>
//           </div>

//           <CustomButton
//             loading={
//               uploadMutation.isPending || createCountryMutation.isPending
//             }
//             variant="tertiary"
//           >
//             Create Country
//           </CustomButton>
//         </div>
//       </form>
//     </div>
//   );
// };

const CreateCountry = ({ toggleModal, selectedCountry }: any) => {
  const { control, handleSubmit } = useForm<any>({
    defaultValues: selectedCountry || {}, // Pre-fill form if editing
  });

  const queryClient = useQueryClient();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [backendPath, setBackendPath] = useState(selectedCountry?.image || ""); // Use existing image path if editing

  const { userId } = useAppSelector((state: RootState) => state.auth);

  const handleSuccess = (data: any) => {
    setBackendPath(data?.filePath);
  };

  // console.log(selectedCountry?.image);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };

  const uploadMutation = useUploadMutation(handleSuccess, handleError);

  const countryMutation = useCustomMutation({
    endpoint: selectedCountry
      ? `Countries/UpdateCountry`
      : "Countries/CreateCountry",
    method: selectedCountry ? "put" : "post", // Use "put" for update, "post" for create
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetCountriesTable"],
        exact: false,
      });
    },
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("createdBy", userId);
    uploadMutation.mutate(formData);
  };

  const submitForm = (data: any) => {
    if (backendPath === "" && !selectedCountry) {
      toast("Please upload a file first");
      return;
    }

    const formData: any = {
      ...data,
      population: +data.population,
      gdp: +data.gdp,
      image: backendPath,
      Bloc: "NATO",
    };

    if (selectedCountry) {
      // For PUT (Update), do not include `createdBy`
      formData.updatedBy = userId; // Optional: You can add an `updatedBy` field
    } else {
      // For POST (Create), include `createdBy`
      formData.createdBy = userId;
    }
    console.log(formData);
    countryMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-center font-medium text-xl">
        {selectedCountry ? "Edit Country" : "Create A New Country"}
      </p>

      <form onSubmit={handleSubmit(submitForm)} className="my-4  w-full">
        <div className="grid grid-cols-4 gap-x-4">
          <CustomInput
            label="Country Name"
            name="name"
            control={control}
            rules={{ required: "Country Name is required" }}
            className="mt-4"
          />

          <CustomInput
            label="Country Capital"
            name="capital"
            control={control}
            rules={{ required: "Country Capital is required" }}
            className="mt-4"
          />

          <CustomInput
            label="Leader Name"
            name="leaderName"
            control={control}
            rules={{ required: "Leader Name is required" }}
            className="mt-4"
          />

          <CustomInput
            label="Currency"
            name="currency"
            control={control}
            rules={{ required: "Currency is required" }}
            className="mt-4"
          />

          <CustomInput
            label="Population"
            name="population"
            control={control}
            type="number"
            rules={{ required: "Population is required" }}
            className="mt-4 col-span-2"
          />

          <CustomInput
            label="GDP"
            name="gdp"
            type="number"
            control={control}
            rules={{ required: "GDP is required" }}
            className="mt-4 col-span-2"
          />

          <div className="col-span-2">
            <CustomTextArea name="bio" control={control} label="Bio" />
          </div>

          <div className="col-span-2">
            <p className="text-sm font-medium pb-2">Flag</p>
            <FileUploader
              maxSizeMB={1}
              acceptFormats={["png", "jpeg", "jpg", "gif"]}
              onFileUpload={handleFileUpload}
              defaultFile={selectedCountry?.image}
            />
            {(uploadedFile || backendPath) && (
              <ImageDetails
                fileName={uploadedFile?.name || "Existing File"}
                fileSize={uploadedFile?.size || 0}
              />
            )}
          </div>
        </div>

        <div className="flex w-full justify-end mr-auto mt-4">
          <div className="mr-3">
            <CustomButton onClick={toggleModal} variant="skeleton">
              Cancel
            </CustomButton>
          </div>

          <CustomButton
            loading={uploadMutation.isPending || countryMutation.isPending}
            variant="tertiary"
          >
            {selectedCountry ? "Update Country" : "Create Country"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCountry;

// export default CreateCountry;
