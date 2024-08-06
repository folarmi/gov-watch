import { useState } from "react";
// import Dropzone, { IPreviewProps } from "react-dropzone-uploader";
import S from "react-dropzone-uploader";
// eslint-disable-next-line import/no-unassigned-import
import "react-dropzone-uploader/dist/styles.css";
// import cloudWhite from "../../../assets/icons/upload-cloud.svg";
// eslint-disable-next-line import/no-unassigned-import
import "../styles/FileUploader.css";
import { useController } from "react-hook-form";

import { CustomPreview } from "./CustomPreview";

const Switch = (S as any).default ?? S;

const FileUploader = ({
  control,
  rules,
  name,
  label,
  className,
  defaultValue,
  customOnChange,
  required,
  error,
  maxSizeBytes = 1048576,
  maxSizeMB = 1,
}: any) => {
  const {
    field: { onChange },
  } = useController({ name, control, rules, defaultValue });
  const [rejected, setRejected] = useState<boolean>(false);

  const actualOnChange = (fileWithMeta: any) => {
    onChange(fileWithMeta);
    customOnChange && customOnChange(fileWithMeta, name);
  };

  const handleChangeStatus = (fileWithMeta: any, status: string) => {
    // this throws an error on rejected file type
    if (status === "rejected_file_type") {
      setRejected(true);
    } else {
      setRejected(false);
    }

    // this prevents react hook form onChange from saving the file unless it is valid
    status !== "rejected_file_type" && status !== "error_file_size"
      ? actualOnChange(fileWithMeta)
      : onChange(); // this doesn't pass anything into the field and causes react hook form to throw an error that it's empty
  };

  return (
    <div className={`dropzone__container flex items-center ${className}`}>
      <div className="w-full">
        <div className="flex items-center pb-2">
          <p
            className={`text-sm font-bold text-boiGreen inline-block  ${
              required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                : ""
            }`}
          >
            {label}
          </p>
        </div>
        <div className="dropzone__uploader">
          <Switch
            PreviewComponent={(props: any) => <CustomPreview {...props} />}
            onChangeStatus={handleChangeStatus}
            // disabled={!isCustomer()}
            inputContent={(files: any, extra: any) =>
              extra.reject ? (
                "Maximium file size is 1mb"
              ) : (
                <div className="flex justify-between items-center">
                  {rejected ? (
                    <span className="text-[10px] text-red-500 p-[0.7em]">
                      File type not supported! Please upload a .png, .jpeg,
                      .jpg, .doc, .docx, .pdf,.gif, .xlsx, .csv , .xls, .pptx,
                      .ppt, .pptm file
                    </span>
                  ) : (
                    // File type not supported!
                    <p className="p-[0.7em]">
                      {defaultValue !== "" && typeof defaultValue === "string"
                        ? defaultValue.split("/")?.[3]
                          ? defaultValue.split("/")?.[3]
                          : // added this for microcredit file name that doesn't have path or "/"
                            defaultValue
                        : "Click here to upload"}
                    </p>
                  )}
                  <section className="flex h-[35px] attachment justify-center items-center bg-boiGreen w-[35px]">
                    {/* <FontAwesomeIcon
                      icon={faPaperclip}
                      className="text-white mx-4"
                    /> */}
                    <p>paperclip</p>
                  </section>
                </div>
              )
            }
            autoUpload={false}
            classNames={{
              inputLabel: "text-xs file-upload-text font-normal cursor-pointer",
              dropzone: `drop__zone ${
                error
                  ? "border border-red-900 border"
                  : "border border-[#d7dbdd]"
              }`,
            }}
            styles={{
              dropzoneReject: {
                borderColor: "#F19373",
                backgroundColor: "#F1BDAB",
              },
              preview: {
                minHeight: "unset",
                width: "200px",
                padding: "unset",
                color: "#CA0814",
              },
            }}
            accept="image/png, image/jpeg, image/jpg, .doc, .docx, .pdf,.gif, .xlsx, .csv , .xls, .pptx, .ppt, .pptm"
            multiple={false}
            maxSizeBytes={maxSizeBytes}
            maxFiles={1}
            inputWithFilesContent="Add Files"
          />
        </div>
        {!error && (
          <p className="text-[10px] text-primary font-semibold">
            * Maximum file size is {maxSizeMB} MB
          </p>
        )}
        {error && (
          <span>
            <p className="text-red-500 text-xs">{error}</p>
          </span>
        )}
      </div>
    </div>
  );
};
export { FileUploader };
