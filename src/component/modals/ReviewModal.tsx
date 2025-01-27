/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { useNavigate } from "react-router-dom";
import { directUserToPageOnLogin } from "../../utils";

const ReviewModal = ({ toggleModal, selectedArticleDetails }: any) => {
  const navigate = useNavigate();
  const { control, getValues } = useForm<any>();
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);

  const createReviewMutation = useCustomMutation({
    endpoint: "Reviews/CreateReview",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      navigate(directUserToPageOnLogin(userType));
    },
  });

  // {
  //   "createdBy": "string",
  //   "comment": "string",
  //   "publicationPublicId": "string",
  //   "superCommentId": "string",
  //   "publicationTitle": "string",
  // }

  const submitForm = () => {
    const formData = {
      createdBy: userId,
      comment: getValues("comment"),
      publicationPublicId: selectedArticleDetails.publicationId,
      publicationTitle: selectedArticleDetails.articleTitle,
      //   superCommentId: 0,
    };

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
