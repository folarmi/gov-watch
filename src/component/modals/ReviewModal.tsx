/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import CustomTextArea from "../CustomTextArea";
import CustomButton from "../CustomButton";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";

const ReviewModal = ({ toggleModal, selectedArticleDetails }: any) => {
  const { control, handleSubmit } = useForm<any>();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createReviewMutation = useCustomMutation({
    endpoint: "Reviews/CreateReview",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
    },
  });

  const submitForm = (data: any) => {
    const formData = {
      ...data,
      articleTitle: selectedArticleDetails.title,
      publicationId: selectedArticleDetails.publicId,
      createdBy: userId,
      //   superCommentId: 0,
    };
    console.log(formData);
    // createReviewMutation.mutate(formData);
  };

  return (
    <form
      className="bg-white rounded-xl p-6"
      onSubmit={handleSubmit(submitForm)}
    >
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
          //   type="submit"
        >
          Create Review
        </CustomButton>
      </div>
    </form>

    // <form
    //   onSubmit={handleSubmit(submitForm)}
    //   className="my-4 grid grid-cols-4 gap-x-4 w-full"
    // >
    //   <div className="col-span-2">
    //     <CustomTextArea name="bio" control={control} label="Bio" />
    //   </div>

    //   <div className="flex w-full justify-end mr-auto">
    //     <div className="mr-3">
    //       <CustomButton onClick={toggleModal} variant="skeleton">
    //         Cancel
    //       </CustomButton>
    //     </div>

    //     <CustomButton
    //       loading={createReviewMutation.isPending}
    //       variant="tertiary"
    //     >
    //       Create State
    //     </CustomButton>
    //   </div>
    // </form>
  );
};

export default ReviewModal;
