/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCustomMutation } from "../hooks/apiCalls";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import FileUploader from "../component/FileUploader";
import ImageDetails from "../component/ImageDetails";
import CustomInput from "../component/CustomInput";
import { useFieldArray, useForm } from "react-hook-form";
import AdminButton from "../component/forms/AdminButton";
import CustomButton from "../component/CustomButton";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const CorporateUsers = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [uploadMethod, setUploadMethod] = useState("excel");
  const [fileError, setFileError] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userForm: [{ email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "userForm",
  });

  const registerMultipleUsersByProxy = useCustomMutation({
    endpoint: "Authentication/RegisterMultipleUsersByProxy",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    contentType: "multipart/form-data",
    onSuccessCallback: () => {
      window.location.reload();
    },
  });

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target?.result;
      if (data) {
        // Read the Excel file data
        const workbook = XLSX.read(data, {
          type: "binary",
        });
        const firstSheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetname];

        // Convert sheet data to JSON
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers: any = sheetData[0];
        if (headers.length === 1 && headers[0] === "Email Address") {
          setFileError(false);
          setUploadedFile(file);
          toast.success("File uploaded successfully.");
        } else {
          setFileError(true);
          toast.error(
            "Invalid format! The file must contain only one column titled 'Email Address'."
          );
        }
      }
    };

    // Read the file as a binary string
    reader.readAsArrayBuffer(file);
  };

  const submitUsers = (data: any) => {
    const emailArray: string[] = [];
    data?.userForm.map((email: { email: string }) => {
      emailArray.push(email?.email);
    });

    registerMultipleUsersByProxy.mutate({
      emails: emailArray,
      userPublicId: userId,
      excelFile: uploadedFile,
    });
  };

  return (
    <DashboardLayout>
      {/* <div className="mt-5">
        <form onSubmit={handleSubmit(submitUsers)}>
          <div
            className="flex justify-end w-full mb-1"
            onClick={() =>
              append({
                email: "",
              })
            }
          >
            <div className="flex">
              <AdminButton buttonText="Add New Email" />
            </div>
          </div>
          <FileUploader
            maxSizeMB={1}
            acceptFormats={["xlsx"]}
            onFileUpload={handleFileUpload}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}

          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center w-1/2 mt-3">
                <CustomInput
                  label="Email"
                  name={`userForm.${index}.email`}
                  control={control}
                  className="mr-2"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  // height="24"
                  fill="none"
                  className="cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 3h10a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zm0 4v13h10V7H7zm2 2a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1z"
                    fill="red"
                  />
                </svg>
              </div>
            );
          })}

          <CustomButton
            type="submit"
            className="mt-4"
            disabled={registerMultipleUsersByProxy.isPending}
            loading={registerMultipleUsersByProxy.isPending}
          >
            Create Users
          </CustomButton>
        </form>
      </div> */}

      {/* <div className="mt-8">
        <form onSubmit={handleSubmit(submitUsers)} className="space-y-6">
          <div className="flex justify-end w-full mb-3">
            <AdminButton
              buttonText="Add New Email"
              onClick={() =>
                append({
                  email: "",
                })
              }
            />
          </div>

          <FileUploader
            maxSizeMB={1}
            acceptFormats={["xlsx"]}
            onFileUpload={handleFileUpload}
          />

          {uploadedFile && (
            <div className="mt-2">
              <ImageDetails
                fileName={uploadedFile.name}
                fileSize={uploadedFile.size}
              />
            </div>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center w-full space-x-4 mt-4"
            >
              <CustomInput
                label={`Email ${index + 1}`}
                name={`userForm.${index}.email`}
                control={control}
                className="w-3/4"
              />

              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => remove(index)}
                aria-label="Remove Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 3h10a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zm0 4v13h10V7H7zm2 2a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1z"
                  />
                </svg>
              </button>
            </div>
          ))}

          <div className="flex justify-end">
            <CustomButton
              type="submit"
              className="mt-6"
              disabled={registerMultipleUsersByProxy.isPending}
              loading={registerMultipleUsersByProxy.isPending}
            >
              Create Users
            </CustomButton>
          </div>
        </form>
      </div> */}

      <div className="mt-5">
        <form onSubmit={handleSubmit(submitUsers)}>
          <p className="mb-4 text-gray-700">
            You can register multiple users by uploading an Excel file
            containing the email addresses or by manually entering the emails
            below. Please select your preferred option:
          </p>

          <div className="flex mb-4">
            {/* Radio Buttons to Choose Between File Upload or Manual Entry */}
            <label className="mr-4">
              <input
                type="radio"
                value="excel"
                checked={uploadMethod === "excel"}
                onChange={() => setUploadMethod("excel")}
                className="mr-2"
              />
              Upload Excel File
            </label>
            <label>
              <input
                type="radio"
                value="manual"
                checked={uploadMethod === "manual"}
                onChange={() => setUploadMethod("manual")}
                className="mr-2"
              />
              Type Emails Manually
            </label>
          </div>

          {/* Conditionally Render File Uploader or Email Inputs */}
          {uploadMethod === "excel" ? (
            <>
              <FileUploader
                maxSizeMB={1}
                acceptFormats={["xlsx", "xls"]}
                onFileUpload={handleFileUpload}
              />
              {uploadedFile && (
                <ImageDetails
                  fileName={uploadedFile.name}
                  fileSize={uploadedFile.size}
                />
              )}
            </>
          ) : (
            <>
              <div className="flex justify-end w-full mb-1">
                <AdminButton
                  buttonText="Add New Email"
                  onClick={() => append({ email: "" })}
                />
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center w-1/2 mt-3">
                  <CustomInput
                    label="Email"
                    name={`userForm.${index}.email`}
                    control={control}
                    className="mr-2"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="none"
                    className="cursor-pointer"
                    onClick={() => remove(index)}
                  >
                    <rect width="24" height="24" fill="white" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 3h10a1 1 0 0 1 1 1v1h3a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h3V4a1 1 0 0 1 1-1zm0 4v13h10V7H7zm2 2a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v7a1 1 0 1 1-2 0v-7a1 1 0 0 1 1-1z"
                      fill="red"
                    />
                  </svg>
                </div>
              ))}
            </>
          )}

          <div className="mt-4">
            <CustomButton
              type="submit"
              className="mt-8"
              disabled={registerMultipleUsersByProxy.isPending || fileError}
              loading={registerMultipleUsersByProxy.isPending}
            >
              Create Users
            </CustomButton>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export { CorporateUsers };
