import React, { useState, ChangeEvent, useEffect } from "react";

interface FileUploaderProps {
  maxSizeMB: number;
  acceptFormats: string[];
  onFileUpload: (file: File) => void;
  defaultFile?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxSizeMB,
  acceptFormats,
  onFileUpload,
  defaultFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Set initial preview for edit mode
    if (defaultFile) {
      setPreview(defaultFile);
    }
  }, [defaultFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileSizeMB > maxSizeMB) {
        setError(`File size exceeds ${maxSizeMB} MB`);
        setPreview(null);
        return;
      }

      if (fileExtension && !acceptFormats.includes(fileExtension)) {
        setError(
          `File format not supported! Please upload a ${acceptFormats.join(
            ", "
          )} file`
        );
        setPreview(null);
        return;
      }

      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full px-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover"
            />
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {`Accepted formats: ${acceptFormats.join(", ")}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {`Max file size: ${maxSizeMB} MB`}
              </p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptFormats.map((ext) => `.${ext}`).join(",")}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;

// If contributor wants to save as draft when updating a publication, isDraftUpdate should true and isSubmission= false
// If contributor is not saving as draft when updating a publication, isDraftUpdate should false and isSubmission= true
