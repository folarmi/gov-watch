/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useCustomMutation } from "../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Modal from "./modals/Modal";
import { CommentBox } from "./modals/CommentBox";

type Prop = {
  comments: any;
  publicationDetailsData: any;
};

const Comments = ({ comments, publicationDetailsData }: Prop) => {
  const queryClient = useQueryClient();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [createCommentModal, setCreateCommentModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

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
    const formData = {
      userPublicId: userId,
      commentPublicId: id,
      isLike: true,
      publicationPublicId: publicationDetailsData?.publicId,
    };
    likeCommentMutation.mutate(formData);
  };

  const toggleModal = (commentID: any) => {
    setCreateCommentModal(!createCommentModal);
    setReplyingTo(commentID?.publicId);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-4">Comments</h2>

      {/* Display Comments */}
      <ul className="space-y-3 mb-6">
        {comments?.map((comment: any) => (
          <li
            key={comment?.id}
            className="p-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <p className="text-gray-800">{comment?.comment}</p>

            <div className="flex items-center space-x-4 mt-2">
              <button
                className="flex items-center space-x-1 text-primary_DM cursor-pointer"
                onClick={() => toggleModal(comment)}
              >
                <MessageCircle />
                <span>Reply</span>
              </button>

              <button
                className="flex items-center space-x-1 text-primary hover:text-green-700 cursor-pointer"
                onClick={() => toggleLikeComment(comment?.id)}
              >
                <ThumbsUp className="text-primary" />
                <span>{comment?.likeCount}</span>
              </button>

              <button className="flex items-center space-x-1 text-primary_DM">
                <Eye />
                <span>{comment?.viewCount}</span>
              </button>
            </div>

            <p>view 1 reply</p>
          </li>
        ))}
      </ul>

      {/* Display Icons When There Are No Comments */}
      {comments === undefined && (
        <div className="flex items-center space-x-4 mt-2">
          <button
            className="flex items-center space-x-1 text-primary_DM cursor-pointer"
            onClick={() => toggleModal(null)}
          >
            <MessageCircle />
            <span>Reply</span>
          </button>
        </div>
      )}

      {/* Comment Form */}

      <Modal show={createCommentModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CommentBox
            toggleModal={toggleModal}
            publicationDetailsData={publicationDetailsData}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        </div>
      </Modal>
    </div>
  );
};

export { Comments };
