"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomSelect from "../component/CustomSelect";
import { useForm } from "react-hook-form";
import CustomButton from "../component/CustomButton";
import { FileUploader } from "../component/FileUploader";

const CreatePublication = () => {
  const { control } = useForm();
  const [value, setValue] = useState("");
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

        {/* <div className="1/4">
          <FileUploader control={control} name="companyAddressFile" />
        </div> */}
        <div className="flex items-center justify-center w-1/4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {/* Image */}
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>

            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </section>

      <div className="flex items-center justify-end mb-10">
        <div className="mr-12">
          <CustomButton className="mr-12" variant="secondary">
            Save to Drafts
          </CustomButton>
        </div>
        <CustomButton variant="primary">Publish</CustomButton>
      </div>
    </div>
  );
};

export default CreatePublication;
