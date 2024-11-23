/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { useGetData } from "../../hooks/apiCalls";
import ReactQuill from "react-quill";
import { Header } from "../Header";
import { userTypeObject } from "../../utils";
import Modal from "../modals/Modal";
import ReviewModal from "../modals/ReviewModal";
import ApprovePublication from "../modals/ApprovePublication";
// import { WarningModal } from "../modals/WarningModal";
// import { useConfirmNavigation } from "../../hooks/useConfirmNavigation";

const ArticleForm = ({
  isEditing = false,
  defaultValues = {},
  onSubmit,
  handleFileUpload,
  uploadedFile,
  setIsDraft,
}: // initialTags,
any) => {
  // const { isModalOpen, handleConfirm, handleCancel } = useConfirmNavigation(
  //   () => console.log("User confirmed navigation")
  // );

  const [reviewModal, setReviewModal] = useState(false);
  const [selectedArticleDetails, setSelectedArticleDetails] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [approveModal, setApproveModal] = useState(false);
  // const [previousPath, setPreviousPath] = useState("");

  const toggleModal = () => {
    setReviewModal(!reviewModal);
    setSelectedArticleDetails((prev) => ({
      ...prev,
      articleTitle: defaultValues.title,
      publicationId: defaultValues.publicId,
    }));
  };

  const toggleApproveModal = () => {
    setApproveModal(!approveModal);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...defaultValues,
      datePromiseMade: defaultValues?.datePromiseMade
        ? new Date(defaultValues?.datePromiseMade).toISOString().split("T")[0]
        : null,
      promiseDeadline: defaultValues?.promiseDeadline
        ? new Date(defaultValues?.promiseDeadline).toISOString().split("T")[0]
        : null,
      datePromiseFulfilled: defaultValues?.datePromiseFulfilled
        ? new Date(defaultValues?.datePromiseFulfilled)
            .toISOString()
            .split("T")[0]
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

  const handleTagsChange = (newTags: string[]) => {
    console.log("Updated Tags:", newTags);
  };

  const [tags, setTags] = useState<string[]>([]);
  const [isAdditionalInformation, setIsAdditionalInformation] = useState(true);

  const { userCountry, userType } = useAppSelector(
    (state: RootState) => state.auth
  );

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
    url: `/Mdas/GetListOfMdas?stateName=${selectedState}&pageNumber=1&pageSize=100`,
    queryKey: ["GetListOfMdas", selectedState],
    enabled: !!selectedState || isEditing,
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

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-8 w-3/5 md:px-24 mx-auto mt-4 space-y-6"
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
            acceptFormats={["png", "jpeg", "jpg", "gif"]}
            onFileUpload={handleFileUpload}
          />
          {uploadedFile && (
            <ImageDetails
              fileName={uploadedFile.name}
              fileSize={uploadedFile.size}
            />
          )}
          <CustomInput
            label="Image Caption"
            name="imageCaption"
            control={control}
            className="mt-4"
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

              {/* Promise Information */}
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
                <CustomInput
                  label="Date Promise was Fulfilled"
                  name="datePromiseFulfilled"
                  type="date"
                  control={control}
                />
              </div>

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

              {/* Checkboxes */}
              <div className="grid grid-cols-2 gap-4">
                <CustomCheckBox
                  checked={isFederalField.value}
                  onChange={isFederalField.onChange}
                  iflabel
                  name="isFederal"
                  labelText="Is this a Federal issue?"
                />
                <CustomCheckBox
                  checked={isPromiseField.value}
                  onChange={isPromiseField.onChange}
                  iflabel
                  labelText="Is this a Promise?"
                  name="isPromise"
                />
                <CustomCheckBox
                  checked={isPromiseFulfilledField.value}
                  onChange={isPromiseFulfilledField.onChange}
                  iflabel
                  labelText="Has this Promise been Fulfilled?"
                  name="isPromiseFulfilled"
                />
                <CustomCheckBox
                  checked={isCredibleField.value}
                  onChange={isCredibleField.onChange}
                  iflabel
                  labelText="Is this Credible?"
                  name="isCredible"
                />
              </div>

              {/* Tags and References */}
              <TagsInput
                onChange={handleTagsChange}
                tags={tags}
                setTags={setTags}
              />
              <CustomInput
                label="Reference"
                name="reference"
                control={control}
                className="mt-4"
              />
              <CustomInput
                label="Link"
                name="link"
                control={control}
                className="mt-4"
              />
            </div>
          )}
        </div>

        {/* Article Content */}
        <ReactQuill
          style={{ height: "10rem", marginBottom: "5rem" }}
          theme="snow"
          value={field.value}
          onChange={field.onChange}
        />

        {/* Actions */}
        <div
          className="flex items-center gap-4 mb-10"
          style={{
            marginBottom: "5rem",
          }}
        >
          {isEditing ? (
            <>
              <CustomButton
                variant="secondary"
                className="w-full md:w-1/2"
                onClick={toggleModal}
              >
                Review
              </CustomButton>
              {(userType === userTypeObject.admin ||
                userType === userTypeObject.editor) && (
                <CustomButton
                  variant="primary"
                  className="w-full md:w-1/2 cursor-pointer"
                  // onClick={approvePublicationFunction}
                  onClick={toggleApproveModal}
                >
                  Approve
                </CustomButton>
              )}
            </>
          ) : (
            <>
              <CustomButton
                variant="secondary"
                className="w-full md:w-1/2"
                onClick={() => {
                  setIsDraft(true);
                  onSubmit;
                }}
              >
                Save to Drafts
              </CustomButton>
              <CustomButton
                variant="primary"
                className="w-full md:w-1/2"
                onClick={() => {
                  /* Publish logic */
                }}
              >
                Publish
              </CustomButton>
            </>
          )}
        </div>

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

        {/* <Modal show={isModalOpen} toggleModal={handleCancel}>
          <div className="p-4">
            <WarningModal
              toggleModal={handleCancel}
              handleConfirm={handleConfirm}
            />
          </div>
        </Modal> */}
      </form>
    </>
  );
};

export default ArticleForm;
