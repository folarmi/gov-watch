"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "../../component/CustomSelect";
import { useForm } from "react-hook-form";
import CustomButton from "../../component/CustomButton";
import FileUploader from "../../component/FileUploader";
import { useGetData } from "../../hooks/apiCalls";
import ImageDetails from "@/app/component/ImageDetails";
import UpArrowButton from "@/app/component/UpArrowButton";
import DownArrowButton from "@/app/component/DownArrowButton";
import { useAppSelector } from "@/app/lib/hook";
import { RootState } from "@/app/lib/store";
// import { FileUploader } from "../component/FileUploader";

const CreatePublication = () => {
  const { control } = useForm();
  const { userCountry } = useAppSelector((state: RootState) => state.auth);
  const [value, setValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState("");

  const [isAdditionalInformation, setIsAdditionalInformation] = useState(true);
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error,
  } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  const { data: lgaData, isLoading: lgaDataIsLoading } = useGetData({
    url: `/Lgas/GetListOfLgas?stateName=${selectedState}&countryName=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLgas"],
    enabled: !!selectedState,
  });

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: `States/GetListOfStates?countryName=${userCountry}&pageNumber=1&pageSize=10`,
    queryKey: ["GetAllStates"],
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Handle the uploaded file here (e.g., upload to server)
    console.log("Uploaded file:", file);
  };

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
        image: item?.categoryImage,
      };
    });

  const lgaDataFormatted =
    lgaData &&
    lgaData.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const stateDataFormatted =
    stateData &&
    stateData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  return (
    <form className="px-8 w-3/5 md:px-24 mx-auto mt-4">
      <CustomSelect
        name="mySelect"
        options={categoriesDataFormatted}
        isLoading={isCategoriesLoading}
        label="Select Category of your Publication"
        control={control}
        className="mr-12"
      />

      <FileUploader
        maxSizeMB={1}
        acceptFormats={["png", "jpeg", "jpg", "gif"]}
        onFileUpload={handleFileUpload}
      />
      {uploadedFile && (
        <ImageDetails
          fileName={uploadedFile.name}
          fileSize={uploadedFile.size}
        />
      )}

      <div className="mb-4">
        <div
          onClick={() => setIsAdditionalInformation(!isAdditionalInformation)}
          className="flex items-center border border-gray-300 w-full p-4 rounded-lg mt-4 justify-between cursor-pointer"
        >
          <p>Additional Information</p>

          {isAdditionalInformation ? <UpArrowButton /> : <DownArrowButton />}
        </div>

        {isAdditionalInformation && (
          <div className="">
            <CustomSelect
              name="state"
              options={stateDataFormatted}
              isLoading={stateDataIsLoading}
              label="State"
              control={control}
              placeholder="Select State"
              className="mt-4 col-span-2"
              customOnChange={(name: any) => setSelectedState(name?.value)}
            />

            <CustomSelect
              name="lga"
              options={lgaDataFormatted}
              isLoading={lgaDataIsLoading}
              label="LGA"
              control={control}
              placeholder="Select LGA"
              className="mt-4 col-span-2"
            />
          </div>
        )}
      </div>

      <ReactQuill
        style={{
          height: "10rem",
          marginBottom: "5rem",
        }}
        theme="snow"
        value={value}
        onChange={setValue}
      />

      <div className="flex items-center justify-end my-5">
        <div className="">
          <CustomButton className="" variant="secondary">
            Save to Drafts
          </CustomButton>
        </div>

        <div className="w-1/2 ml-4">
          <CustomButton variant="primary" className="">
            Publish
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default CreatePublication;
