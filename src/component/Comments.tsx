/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from "../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { useForm } from "react-hook-form";
import CustomTextArea from "./CustomTextArea";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";

type Prop = {
  comments: any;
  publicationDetailsData: any;
};

const Comments = ({ comments, publicationDetailsData }: Prop) => {
  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const likeCommentMutation = useCustomMutation({
    endpoint: "PublicationComments/UpdatePublicationCommentLikeCount",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetAllUserBookmarksByUserId"],
        exact: false,
      });
    },
  });

  const toggleLikeComment = (id: string) => {
    console.log(id);
    const formData = {
      userPublicId: userId,
      commentPublicId: id,
      isLike: true,
      publicationPublicId: publicationDetailsData?.publicId,
    };
    likeCommentMutation.mutate(formData);
  };

  const { control, handleSubmit, setValue } = useForm<any>({});

  const createCommentMutation = useCustomMutation({
    endpoint: `PublicationComments/CreatePublicationComment`,
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) => error?.response?.data?.remark,
    onSuccessCallback: () => {
      //   toggleModal();
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
      //   superCommentPublicId: "string",
      publicationTitle: publicationDetailsData?.title,
      createdBy: userId,
    };
    createCommentMutation.mutate(newComment);
    // onAddComment(newComment);

    // Clear the input fields
    setValue("comment", "");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-4">Comments</h2>

      {/* Display Comments */}
      <ul className="space-y-3 mb-6">
        {comments?.map((comment: any) => (
          <li
            key={comment.id}
            className="p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <p className="text-gray-800">{comment.comment}</p>

            <div className="flex items-center space-x-4 mt-2">
              <button
                className="flex items-center space-x-1 text-primary hover:text-green-700 cursor-pointer"
                onClick={() => toggleLikeComment(comment.id)}
              >
                <ThumbsUp className="text-primary" />
                <span>{comment?.likeCount}</span>
              </button>

              {/* View Button */}
              <button
                className="flex items-center space-x-1 text-primary_DM hover:text-blue-700"
                // onClick={() => handleView(comment.id)}
              >
                <Eye />
                <span>{comment?.viewCount}</span>
              </button>

              {/* Reply icon */}
              <button className="flex items-center space-x-1 text-primary_DM hover:text-blue-700 cursor-pointer">
                <MessageCircle />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomTextArea label="Your comment" name="comment" control={control} />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export { Comments };

// {
//   "publicId": "e208a36c-a9c8-4037-8e04-d6db28323937",
//   "comment": "This is a great comment",
//   "publicationPublicId": "3b34a689-a90a-460c-ab0f-f1948cfa3fa3",
//   "superCommentPublicId": null,
//   "publicationTitle": "Laboriosam sunt qua",
//   "viewCount": 0,
//   "likeCount": 0,
//   "commenterId": "a7e36778-2fec-4b6e-8569-dbe47778dff0"
// }
