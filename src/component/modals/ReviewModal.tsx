/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";

const ReviewModal = ({ toggleModal, selectedArticleDetails }: any) => {
  const { control, getValues } = useForm<any>();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createReviewMutation = useCustomMutation({
    endpoint: "Reviews/CreateReview",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = () => {
    const formData = {
      comment: getValues("comment"),
      articleTitle: selectedArticleDetails.articleTitle,
      publicationId: selectedArticleDetails.publicationId,
      createdBy: userId,
      //   superCommentId: 0,
    };
    console.log(formData);
    createReviewMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <CustomTextArea name="comment" control={control} label="Comment" />

      <div className="flex w-full justify-end mr-auto">
        <div className="mr-3">
          <CustomButton onClick={toggleModal} variant="skeleton">
            Cancel
          </CustomButton>
        </div>

        <CustomButton
          loading={createReviewMutation.isPending}
          variant="tertiary"
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          Create Review
        </CustomButton>
      </div>
    </div>
  );
};

export default ReviewModal;
