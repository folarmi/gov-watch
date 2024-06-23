import Image from "next/image";

const CustomPreview = ({
  meta,
  fileWithMeta: { cancel, remove, restart },
  canRemove,
  canCancel,
  canRestart,
}: any) => {
  const {
    name,
    // percent,
    status,
    type,
    // validationError,
  } = meta;

  const imageToShow = (imageType: string) => {
    let imageUrl;
    if (imageType === "application/pdf") {
      imageUrl = "faFilePdf";
    } else if (
      imageType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      imageUrl = "faFileWord";
    } else if (
      imageType === "text/csv" ||
      imageType === "application/vnd.ms-excel"
    ) {
      imageUrl = "faFileCsv";
    } else if (
      imageType === "application/vnd.ms-powerpoint" ||
      imageType === "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
    ) {
      imageUrl = "faFilePowerpoint";
    } else {
      imageUrl = "faFilePdf";
    }
    return imageUrl;
  };

  // const colourToShow = (imageType: string) => {
  //   let imageColor;
  //   if (imageType === "application/pdf") {
  //     imageColor = "#ff0000";
  //   } else if (
  //     imageType ===
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //   ) {
  //     imageColor = "#00a2ed";
  //   } else if (
  //     imageType === "text/csv" ||
  //     imageType === "application/vnd.ms-excel"
  //   ) {
  //     imageColor = "#1d6f42";
  //   } else if (
  //     imageType === "application/vnd.ms-powerpoint" ||
  //     imageType === "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
  //   ) {
  //     imageColor = "#d24726";
  //   } else {
  //     imageColor = "#ff0000";
  //   }
  //   return imageColor;
  // };

  return (
    <div
      className="my-3 border-red-900"
      style={{
        backgroundColor: status === "error_file_size" ? "1px solid red" : "",
      }}
    >
      <section>
        {type === "image/jpeg" && status !== "error_file_size" ? (
          <Image
            src={meta?.previewUrl}
            alt={name}
            width="50"
            height="50"
            className="rounded-xl ml-6"
          />
        ) : (
          <>
            {/* <FontAwesomeIcon
              icon={imageToShow(type)}
              // className={`text-[${colourToShow(type)}] mx-4`}
              className={`text-primary mx-4`}
            /> */}
            <p>vjj</p>
          </>
        )}

        {/* this doesn't show when the form is re-rendered i.e. on individual */}
        {status !== "error_file_size" && (
          <span className="text-xs font-medium">{name}</span>
        )}
        {canCancel && (
          <span
            className="dzu-previewButton"
            // style={iconByFn.cancel}
            // onClick={cancel}
            onClick={remove}
          >
            X
          </span>
        )}
        {status === "error_file_size" && (
          <span className="text-xs text-red-500">File size too big!!</span>
        )}

        {status !== "preparing" &&
          status !== "getting_upload_params" &&
          status !== "uploading" &&
          canRemove && <span className="dzu-previewButton" onClick={remove} />}

        {/* this doesn't occur because on rejected_file_type status the file is not passed to the preview component
          so we should handle this on the file uploader */}
        {/* {status === "rejected_file_type" && (
            <span className="text-xs text-red-500">File type not supported</span>
          )} */}

        {status === "error_validation" && (
          <span className="text-xs text-red-500">File type not supported</span>
        )}
        {[
          "error_upload_params",
          "exception_upload",
          "error_upload",
          "aborted",
          "ready",
        ].includes(status) &&
          canRestart && (
            <span
              className="dzu-previewButton"
              // style={iconByFn.restart}
              onClick={restart}
            />
          )}
      </section>
    </div>
  );
};

export { CustomPreview };
