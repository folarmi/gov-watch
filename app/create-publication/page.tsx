"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "../component/CustomSelect";
import { useForm } from "react-hook-form";
import CustomButton from "../component/CustomButton";
import FileUploader from "../component/FileUploader";
import { useGetData } from "../hooks/apiCalls";
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
    url: "/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Handle the uploaded file here (e.g., upload to server)
    console.log("Uploaded file:", file);
  };

  console.log(categoriesData);

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const categories = [
    { value: "mdas", label: "Ministries, Departments, Agencies (MDAs)" },
    { value: "politicalActors", label: "Political actors" },
    { value: "state", label: "State" },
    { value: "lgas", label: "Local Govt Area (LGA)" },
  ];

  return (
    <div className="px-8 md:px-24">
      <div className="flex items-center">
        <CustomSelect
          name="mySelect"
          options={categories}
          isLoading={isCategoriesLoading}
          label="Select Category of your Publication"
          control={control}
          className="mr-12"
        />

        <CustomSelect
          name="mySelect"
          options={categories}
          label="Additional Information about your Publication"
          control={control}
        />
      </div>

      <section className="flex  justify-between my-10">
        <div className="w-1/2">
          <ReactQuill
            style={{
              height: "10rem",
            }}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>

        <FileUploader
          maxSizeMB={1}
          acceptFormats={["png", "jpeg", "jpg", "gif"]}
          onFileUpload={handleFileUpload}
        />
        {uploadedFile && (
          <div>
            <h2>Uploaded File Details:</h2>
            <p>Name: {uploadedFile.name}</p>
            <p>Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        )}
      </section>

      <div className="flex items-center justify-end mb-10">
        <div className="mr-12">
          <CustomButton className="mr-12" variant="secondary">
            Save to Draftsss
          </CustomButton>
        </div>
        <CustomButton variant="primary">Publish</CustomButton>
      </div>
    </div>
  );
};

export default CreatePublication;
