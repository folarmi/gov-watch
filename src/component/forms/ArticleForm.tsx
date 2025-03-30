/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";

import "react-quill/dist/quill.snow.css";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";
import CustomSelect from "../CustomSelect";
import FileUploader from "../FileUploader";
import ImageDetails from "../ImageDetails";
import CustomButton from "../CustomButton";
import TagsInput from "./TagsInput";
import CustomCheckBox from "./CustomCheckBox";
import UpArrowButton from "../UpArrowButton";
import DownArrowButton from "../DownArrowButton";
import { RootState } from "../../lib/store";
import { useAppSelector } from "../../lib/hook";
import {
  UploadError,
  uploadFile,
  useCustomMutation,
  useGetData,
  useUploadMutation,
} from "../../hooks/apiCalls";
import ReactQuill from "react-quill";
import { Header } from "../Header";
import { directUserToPageOnLogin, userTypeObject } from "../../utils";
import Modal from "../modals/Modal";
import ReviewModal from "../modals/ReviewModal";
import ApprovePublication from "../modals/ApprovePublication";
import ConfirmModuleDeletion from "../modals/ConfirmModuleDeletion";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { InfoIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EditPublication } from "../modals/EditPublication";
import { SavePublicationToDraft } from "../modals/SavePublicationToDraft";

// interface ArticleFormProps {
//   isLoading?: boolean; // Indicates if the form is in a loading state
//   isEditing?: boolean; // Indicates if the form is in edit mode (optional, default: false)
//   defaultValues?: Record<string, any>; // Default values for the form fields (optional, default: {})
//   onSubmit?: (data: any) => void; // Function to handle form submission
//   handleFileUpload?: (file: File) => void; // Function to handle file upload
//   uploadedFile?: File | null; // The uploaded file (can be null if no file is uploaded)
//   setIsDraft?: (isDraft: boolean) => void; // Function to set the draft status
//   tags: string[]; // Array of tags
//   setTags: (tags: string[]) => void; // Function to update the tags
//   isPending?: boolean; // Indicates if the form submission is pending (optional, default: false)
// }

const ArticleForm = ({
  isLoading,
  isEditing = false,
  defaultValues = {},
  onSubmit,
  handleFileUpload,
  uploadedFile,
  setIsDraft,
  tags,
  setTags,
  isPending = false,
  isPublished = false,
}: any) => {
  const navigate = useNavigate();
  const { userCountry, userType, userId } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedArticleDetails, setSelectedArticleDetails] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  const [deletePublication, setDeletePublication] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [saveToDraftModal, setSaveToDraftModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [isAdditionalInformation, setIsAdditionalInformation] = useState(true);

  const handleError = (error: UploadError) => {
    console.error("Upload error:", error);
  };
  const uploadMutation = useUploadMutation(undefined, handleError);

  const toggleModal = () => {
    setReviewModal(!reviewModal);
    setSelectedArticleDetails((prev) => ({
      ...prev,
      articleTitle: defaultValues.title,
      publicationId: defaultValues.publicId,
    }));
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const toggleSaveToDraftsModal = () => {
    setSaveToDraftModal(!saveToDraftModal);
  };

  const updatePublicationImageMutation = useCustomMutation({
    endpoint: "Publications/UpdatePublicationImage",
    successMessage: (data: any) => data?.remark,
    method: "put",
    errorMessage: (error: any) =>
      error?.response?.data?.remark ||
      error?.response?.data ||
      error?.response?.data?.errors,
    // console.log(error?.response?.data?.errors),

    onSuccessCallback: () => {
      navigate(directUserToPageOnLogin(userType));
    },
  });

  const updateImage = async () => {
    if (!uploadedFile) {
      toast.error("Please upload a file first.");
      return;
    }

    let uploadedFilePath;

    if (uploadedFile) {
      uploadedFilePath = await uploadFile(uploadedFile, userId, uploadMutation);
      if (!uploadedFilePath) {
        toast.error("File upload failed.");
        return;
      }
    }

    await updatePublicationImageMutation.mutateAsync({
      oldImagePath: defaultValues?.image,
      publicationId: defaultValues?.publicId,
      imagePath: uploadedFilePath,
      userId,
    });
  };

  const toggleApproveModal = () => {
    setApproveModal(!approveModal);
  };

  const toggleDeleteModal = () => {
    setDeletePublication(!deletePublication);
  };

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      ...defaultValues,
      datePromiseMade: defaultValues?.datePromiseMade
        ? new Date(defaultValues?.datePromiseMade).toLocaleDateString("en-CA")
        : null,
      promiseDeadline: defaultValues?.promiseDeadline
        ? new Date(defaultValues?.promiseDeadline).toISOString().split("T")[0]
        : null,
      datePromiseFulfilled: defaultValues?.datePromiseFulfilled
        ? new Date(defaultValues?.datePromiseFulfilled).toLocaleDateString(
            "en-CA"
          )
        : null,
      dateIncidentStarted: defaultValues?.dateIncidentStarted
        ? new Date(defaultValues?.dateIncidentStarted).toLocaleDateString(
            "en-CA"
          )
        : null,
      dateIncidentResolved: defaultValues?.dateIncidentResolved
        ? new Date(defaultValues?.dateIncidentResolved).toLocaleDateString(
            "en-CA"
          )
        : null,
      publishDate: defaultValues?.dateIncidentResolved
        ? new Date(defaultValues?.publishDate).toLocaleDateString("en-CA")
        : null,
      article: defaultValues?.article || "",
      isFederal: defaultValues?.isFederal || false,
      isPromiseFulfilled: defaultValues?.isPromiseFulfilled || false,
      isPromise: defaultValues?.isPromise || false,
    },
  });

  const { field } = useController({
    name: "article",
    control,
  });
  const { field: referenceField } = useController({
    name: "reference",
    control,
  });
  const { field: linkField } = useController({
    name: "link",
    control,
  });
  const { field: isFederalField } = useController({
    name: "isFederal",
    control,
    defaultValue: defaultValues?.isFederal || "",
  });
  const { field: isPromiseField } = useController({
    name: "isPromise",
    control,
    defaultValue: defaultValues?.isFederal || "",
  });

  const { field: isPromiseFulfilledField } = useController({
    name: "isPromiseFulfilled",
    control,
  });

  const { field: isCredibleField } = useController({
    name: "isCredible",
    control,
  });

  const { field: isIncidentField } = useController({
    name: "isIncident",
    control,
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetData({
    url: "Categories/GetAllCategories",
    queryKey: ["GetAllCategories"],
  });

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData(
    userCountry && {
      url: `States/GetListOfStates?country=${userCountry}&pageNumber=1&pageSize=100`,
      queryKey: ["GetAllStates"],
    }
  );

  const { data: lgaData, isLoading: lgaDataIsLoading } = useGetData({
    url: `/Lgas/GetListOfLgas?stateName=${selectedState}&countryName=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLgas", selectedState],
    enabled: !!selectedState || isEditing,
  });

  const { data: lcdaData, isLoading: lcdaDataIsLoading } = useGetData({
    url: `/Lcdas/GetListOfLcdas?lgaName=${selectedLGA}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfLcdas", selectedLGA],
    enabled: !!selectedLGA || isEditing,
  });

  const { data: wardData, isLoading: wardDataIsLoading } = useGetData({
    url: `/Wards/GetListOfWards?lgaName=${selectedLGA}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfWards", selectedLGA],
    enabled: !!selectedLGA || isEditing,
  });

  const { data: mdaData, isLoading: mdaDataIsLoading } = useGetData({
    url: `/Mdas/GetListOfMdas?countryName=${userCountry}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfMdas", selectedState],
  });

  const { data: politicalActorData, isLoading: politicalActorIsLoading } =
    useGetData({
      url: `/PoliticalActors/GetListOfPoliticalActors?country=${userCountry}&pageNumber=1&pageSize=100`,
      queryKey: ["GetListOfPoliticalActors"],
    });

  const categoriesDataFormatted =
    categoriesData?.categoryViewModel &&
    categoriesData?.categoryViewModel?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.name,
        image: item?.categoryImage,
      };
    });

  const lgaDataFormatted =
    lgaData &&
    lgaData?.map((item: string) => {
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

  const lcdaDataFormatted =
    lcdaData &&
    lcdaData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const wardDataFormatted =
    wardData &&
    wardData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const mdaDataFormatted =
    mdaData &&
    mdaData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  const politicalActorDataFormatted =
    politicalActorData &&
    politicalActorData?.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [defaultValues, reset]);

  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length > 0) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = () => {
    const latestData = getValues(); // Fetch the latest form values
    onSubmit(latestData); // Pass the latest values to the parent function
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-8 w-3/5 md:px-24 mx-auto mt-4 space-y-6 mb-20"
      >
        {/* Publication Details */}
        <div className="space-y-4">
          <CustomInput label="Title" name="title" control={control} />
          <CustomInput
            label="Author's Name"
            name="authorName"
            control={control}
            placeholder="Whose work is this?"
          />
          <CustomTextArea
            name="snippet"
            control={control}
            label="Article Snippet"
            placeholder="A snippet about your article"
          />
        </div>

        {/* Category and Image Upload */}
        <div className="space-y-4">
          <CustomSelect
            name="category"
            options={categoriesDataFormatted}
            isLoading={isCategoriesLoading}
            label="Select Category of your Publication"
            control={control}
            className="mr-12"
            // defaultValue={defaultValues?.category}
          />
          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif", "webp"]}
            onFileUpload={handleFileUpload}
            defaultFile={defaultValues?.image}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}
          {isPublished && (
            <div className="flex items-center justify-center">
              <p
                onClick={() => updateImage()}
                className="cursor-pointer text-white text-center bg-primary px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Update Image
              </p>
            </div>
          )}
          <CustomInput
            label="Image Caption"
            name="imageCaption"
            control={control}
            className="mt-4"
            required
            rules={{
              required: "Image caption is required",
            }}
          />
        </div>

        {/* Additional Information */}
        <div className="mb-4 space-y-4">
          <div
            onClick={() => setIsAdditionalInformation(!isAdditionalInformation)}
            className="flex items-center border border-gray-300 w-full p-4 rounded-lg justify-between cursor-pointer"
          >
            <p>Additional Information</p>
            {isAdditionalInformation ? <UpArrowButton /> : <DownArrowButton />}
          </div>

          {isAdditionalInformation && (
            <div className="space-y-4">
              {/* Location Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect
                  name="state"
                  options={stateDataFormatted}
                  isLoading={stateDataIsLoading}
                  label="State"
                  control={control}
                  placeholder="Select State"
                  customOnChange={(name: any) => setSelectedState(name?.value)}
                  // customOnChange={(name: any) => setSelectedState(name?.value)}
                />
                <CustomSelect
                  name="lga"
                  options={lgaDataFormatted}
                  isLoading={lgaDataIsLoading}
                  label="LGA"
                  control={control}
                  placeholder="Select LGA"
                  customOnChange={(name: any) => setSelectedLGA(name?.value)}
                />
                <CustomSelect
                  name="lcda"
                  options={lcdaDataFormatted}
                  isLoading={lcdaDataIsLoading}
                  label="LCDA"
                  control={control}
                  placeholder="Select LCDA"
                  // customOnChange={(name: any) => setSelectedLCDA(name?.value)}
                />
                <CustomSelect
                  name="ward"
                  options={wardDataFormatted}
                  isLoading={wardDataIsLoading}
                  label="Ward"
                  control={control}
                  placeholder="Select Ward"
                />
              </div>

              {/* Checkboxes */}

              <div className="grid grid-cols-2 gap-4">
                <CustomCheckBox
                  checked={isIncidentField?.value}
                  onChange={isIncidentField?.onChange}
                  iflabel
                  labelText="Is this an Incident?"
                  name="isIncidentField"
                />

                <CustomCheckBox
                  checked={isPromiseField?.value}
                  onChange={isPromiseField?.onChange}
                  iflabel
                  labelText="Is this a Promise?"
                  name="isPromise"
                />

                {getValues("isPromise") && (
                  <CustomCheckBox
                    checked={isPromiseFulfilledField?.value}
                    onChange={isPromiseFulfilledField?.onChange}
                    iflabel
                    labelText="Has this Promise been Fulfilled?"
                    name="isPromiseFulfilled"
                  />
                )}

                <CustomCheckBox
                  checked={isFederalField?.value}
                  onChange={isFederalField?.onChange}
                  iflabel
                  name="isFederal"
                  labelText="Is this a Federal issue?"
                />

                <CustomCheckBox
                  checked={isCredibleField?.value}
                  onChange={isCredibleField?.onChange}
                  iflabel
                  labelText="Is this Credible?"
                  name="isCredible"
                />
              </div>
              <CustomInput
                label="Published Date"
                name="publishDate"
                type="date"
                control={control}
              />

              {/* {getValues("isIncident") ||
                (defaultValues?.dateIncidentStarted !== null && (
                  <>
                    <CustomInput
                      label="Date Incident Started"
                      name="dateIncidentStarted"
                      type="date"
                      control={control}
                      max={today}
                    />
                    <CustomInput
                      label="Date Incident Was Resolved"
                      name="dateIncidentResolved"
                      type="date"
                      control={control}
                    />
                  </>
                ))} */}

              {/* {(!getValues("isIncident") ||
                defaultValues?.dateIncidentStarted !== null) && (
                <>
                  <CustomInput
                    label="Date Incident Started"
                    name="dateIncidentStarted"
                    type="date"
                    control={control}
                    max={today}
                  />
                  <CustomInput
                    label="Date Incident Was Resolved"
                    name="dateIncidentResolved"
                    type="date"
                    control={control}
                  />
                </>
              )} */}

              {(getValues("isIncident") ||
                defaultValues?.dateIncidentStarted != null) && (
                <>
                  <CustomInput
                    label="Date Incident Started"
                    name="dateIncidentStarted"
                    type="date"
                    control={control}
                    max={today}
                  />
                  <CustomInput
                    label="Date Incident Was Resolved"
                    name="dateIncidentResolved"
                    type="date"
                    control={control}
                  />
                </>
              )}

              {/* Promise Information */}
              {getValues("isPromise") && (
                <>
                  <div className="space-y-4">
                    <CustomInput
                      label="Date Promise was Made"
                      name="datePromiseMade"
                      type="date"
                      control={control}
                    />
                    <CustomInput
                      label="Promised Deadline"
                      name="promiseDeadline"
                      type="date"
                      control={control}
                    />
                  </div>
                </>
              )}

              {getValues("isPromiseFulfilled") && (
                <CustomInput
                  label="Date Promise was Fulfilled"
                  name="datePromiseFulfilled"
                  type="date"
                  control={control}
                />
              )}

              {/* Political and MDA Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect
                  name="politicalActorName"
                  options={politicalActorDataFormatted}
                  isLoading={politicalActorIsLoading}
                  label="Political Actor Name"
                  control={control}
                  placeholder="Select Political Actor"
                />
                <CustomSelect
                  name="mda"
                  options={mdaDataFormatted}
                  isLoading={mdaDataIsLoading}
                  label="MDA"
                  control={control}
                  placeholder="Select MDA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4"></div>
              {/* Tags and References */}

              <TagsInput
                tags={tags}
                setTags={setTags}
                defaultTags={defaultValues?.tags?.split(/\s*,\s*/) || []}
                // defaultTags={defaultValues?.tags}
              />
              <label htmlFor="Reference" className="text-sm mt-2 font-medium">
                Reference
              </label>

              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Tooltip with an Icon */}
                  <Tippy
                    content="References should be provided in APA7 style"
                    placement="right"
                    theme="light"
                    delay={[0, 200]}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        marginRight: "0.5rem",
                        color: "#106d44",
                        fontSize: "1.2rem",
                      }}
                    >
                      <InfoIcon />
                    </span>
                  </Tippy>
                  <span style={{ fontSize: "0.875rem", color: "gray" }}>
                    Hover over the icon for help.
                  </span>
                </div>

                {/* ReactQuill Editor */}
                <ReactQuill
                  style={{ height: "10rem", marginBottom: "3rem" }}
                  theme="snow"
                  value={referenceField?.value}
                  onChange={referenceField?.onChange}
                />
              </div>
              <label htmlFor="Link" className="text-sm font-medium">
                Link
              </label>
              <ReactQuill
                style={{ height: "10rem", marginBottom: "3rem" }}
                theme="snow"
                value={linkField?.value}
                onChange={linkField?.onChange}
              />
            </div>
          )}
        </div>

        {/* Article Content */}

        <label htmlFor="Article" className="text-sm mt-2 font-medium">
          Article
        </label>
        <ReactQuill
          style={{ height: "10rem", marginBottom: "5rem" }}
          theme="snow"
          value={field?.value}
          onChange={field?.onChange}
        />

        {/* Button Actions */}

        <>
          {!isPending && (
            <div className="flex flex-wrap gap-4 mb-10">
              {isEditing ? (
                <div className="flex items-center w-full gap-4">
                  {/* Admin & Editor Actions */}
                  {(userType === userTypeObject?.editor ||
                    (userType === userTypeObject?.admin &&
                      userId !== defaultValues?.contributorPublicId)) && (
                    <>
                      <CustomButton
                        variant="secondary"
                        className="w-full md:w-1/2"
                        onClick={toggleModal}
                        disabled={isLoading}
                      >
                        Review
                      </CustomButton>
                      <CustomButton
                        variant="primary"
                        className="w-full md:w-1/2 cursor-pointer"
                        disabled={isLoading}
                        onClick={toggleApproveModal}
                      >
                        Approve
                      </CustomButton>
                    </>
                  )}

                  {/* Contributor Actions */}
                  {userType === userTypeObject?.contributor && (
                    <CustomButton
                      variant="secondary"
                      className="w-full md:w-1/2"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSaveToDraftsModal();
                        setIsDraft(true);
                      }}
                    >
                      Save to Drafts
                    </CustomButton>
                  )}

                  {/* Shared Edit Action */}
                  <CustomButton
                    variant="primary"
                    className="w-full md:w-1/2 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDraft(false);
                      toggleEditModal();
                    }}
                    disabled={isLoading}
                  >
                    Edit
                  </CustomButton>

                  {/* {(userType === userTypeObject?.admin ||
                userType === userTypeObject?.contributor) && ( */}
                  <CustomButton
                    variant="delete"
                    className="w-full md:w-1/2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDraft(false);
                      toggleDeleteModal();
                    }}
                    disabled={isLoading}
                  >
                    Delete
                  </CustomButton>
                  {/* )} */}
                </div>
              ) : (
                <div className="flex items-center w-full gap-4">
                  {/* Shared Save to Drafts Action */}
                  <CustomButton
                    variant="secondary"
                    className="w-full md:w-1/2"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaveToDraftsModal();
                      setIsDraft(true);
                    }}
                  >
                    Save to Drafts
                  </CustomButton>

                  {/* Publish Action */}
                  <CustomButton
                    variant="primary"
                    className="w-full md:w-1/2"
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={() => {
                      /* Publish logic */
                    }}
                  >
                    Publish
                  </CustomButton>
                </div>
              )}
            </div>
          )}
        </>

        <Modal show={editModal} toggleModal={toggleEditModal}>
          <div className="p-4">
            <EditPublication
              toggleModal={toggleEditModal}
              handleFormSubmit={handleFormSubmit}
              defaultValues={defaultValues}
            />
          </div>
        </Modal>

        <Modal show={saveToDraftModal} toggleModal={toggleSaveToDraftsModal}>
          <div className="p-4">
            <SavePublicationToDraft
              toggleModal={toggleEditModal}
              handleFormSubmit={handleFormSubmit}
              defaultValues={defaultValues}
            />
          </div>
        </Modal>

        <Modal show={reviewModal} toggleModal={toggleModal}>
          <div className="p-4">
            <ReviewModal
              toggleModal={toggleModal}
              selectedArticleDetails={selectedArticleDetails}
            />
          </div>
        </Modal>

        <Modal show={approveModal} toggleModal={toggleApproveModal}>
          <div className="p-4">
            <ApprovePublication
              toggleModal={toggleApproveModal}
              defaultValues={defaultValues}
            />
          </div>
        </Modal>

        <Modal show={deletePublication} toggleModal={toggleDeleteModal}>
          <div className="p-4">
            <ConfirmModuleDeletion
              moduleName="Publication"
              toggleModal={toggleDeleteModal}
              endpoint="Publications/DeletePublication"
              id={defaultValues?.publicId}
              queryKey=""
            />
          </div>
        </Modal>
      </form>
    </>
  );
};

export default ArticleForm;
