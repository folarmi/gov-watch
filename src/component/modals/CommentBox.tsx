/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from "@tanstack/react-query";
import CustomTextArea from "../CustomTextArea";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import { X } from "lucide-react";

const CommentBox = ({
  publicationDetailsData,
  toggleModal,
  replyingTo,
  setReplyingTo,
}: any) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setValue } = useForm<any>({});
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const createCommentMutation = useCustomMutation({
    endpoint: `PublicationComments/CreatePublicationComment`,
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetAllPublicationComments"],
        exact: false,
      });
    },
  });

  const onSubmit = (data: any) => {
    const newComment = {
      comment: data?.comment,
      publicationPublicId: publicationDetailsData?.publicId,
      superCommentPublicId: replyingTo || undefined,
      publicationTitle: publicationDetailsData?.title,
      createdBy: userId,
    };

    createCommentMutation.mutate(newComment);
    setValue("comment", "");
    setReplyingTo(null);
  };

  return (
    <div className="bg-white shadow-xl w-full p-6 rounded-lg">
      <div className="flex justify-end cursor-pointer" onClick={toggleModal}>
        <X />
      </div>
      {/* {replyingTo && (
        <div className="mb-4">
          <span className="text-sm text-gray-600">
            Replying to comment #{replyingTo}
          </span>
          <button
            onClick={() => setReplyingTo(null)}
            className="ml-2 text-sm text-red-600 hover:text-red-800"
          >
            Cancel
          </button>
        </div>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomTextArea
          label="Your comment"
          //   label={
          //     replyingTo ? `Replying to comment #${replyingTo}` : "Your comment"
          //   }
          name="comment"
          control={control}
          className="w-[400px] h-[100px] border-2 rounded-md border-black"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 justify-end flex"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export { CommentBox };
