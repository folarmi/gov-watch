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
// import { FileUploader } from "../component/FileUploader";

const CreatePublication = () => {
  const { control } = useForm();
  const [value, setValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error,
  } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
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

  const categories = [
    { value: "mdas", label: "Ministries, Departments, Agencies (MDAs)" },
    { value: "politicalActors", label: "Political actors" },
    { value: "state", label: "State" },
    { value: "lgas", label: "Local Govt Area (LGA)" },
  ];

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

      <CustomSelect
        name="mySelect"
        options={categories}
        label="Additional Information about your Publication"
        control={control}
        className="my-6"
      />

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
