/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useCustomMutation, useGetData } from "../hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Modal from "./modals/Modal";
import { CommentBox } from "./modals/CommentBox";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { processCommentsOptimized } from "../utils";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

type Prop = {
  comments: any;
  publicationDetailsData: any;
  setPageNumber: any;
  pageNumber: number;
  pageSize: number;
};

const Comments = ({
  comments,
  publicationDetailsData,
  setPageNumber,
  pageNumber,
  pageSize,
}: Prop) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [createCommentModal, setCreateCommentModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<any>([]);
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );

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

  const { data: commentRepliesData, isLoading: commentRepliesIsLoading } =
    useGetData({
      url: `PublicationComments/GetAllPublicationCommentsResponses?publicationId=${params?.id}&superCommentId=${expandedCommentId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      queryKey: ["GetAllPublicationCommentsReplies"],
      enabled: !!expandedCommentId,
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
    if (!isAuthenticated) {
      toast.error("Please sign in to make a comment");
      return;
    }

    setCreateCommentModal(!createCommentModal);
    setReplyingTo(commentID?.publicId);
  };

  const handleViewReplies = (commentId: string) => {
    if (expandedCommentId === commentId) {
      // Collapse the comment if it's already expanded
      setExpandedCommentId(null);
    } else {
      // Expand the comment and fetch replies
      setExpandedCommentId(commentId);
    }
  };

  useEffect(() => {
    if (comments === undefined) {
      // If comments is undefined, set hasMore to false and clear items
      setHasMore(false);
      setItems([]);
      return;
    }

    // If comments is defined, update items and hasMore
    if (pageNumber === 1) {
      setItems(comments);
    } else {
      setItems((prevItems: any) => [...prevItems, ...comments]);
    }

    // Detect no more comments
    if (comments.length === 0 || comments.length < pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [comments, pageNumber, pageSize]);

  // useEffect(() => {
  //   if (comments) {
  //     // Reset articles when pageNumber is 1 (new search)
  //     if (pageNumber === 1) {
  //       setItems(comments);
  //       setHasMore(true); // Reset pagination state
  //     } else {
  //       // Append for infinite scroll
  //       setItems((prevItems: any) => [...prevItems, ...comments]);
  //     }

  //     // Detect no more articles
  //     if (comments.length === 0 || comments.length < pageSize) {
  //       setHasMore(false);
  //     } else {
  //       // If comments is undefined, set hasMore to false
  //       setHasMore(false);
  //     }
  //   }
  // }, [comments]);

  // const fetchMoreData = () => {
  //   if (hasMore && comments !== undefined) {
  //     setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
  //   }
  // };

  const fetchMoreData = () => {
    if (hasMore && comments !== undefined && comments.length > 0) {
      setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
    }
  };

  const processedComments = processCommentsOptimized(comments);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-4">Comments</h2>
      <InfiniteScroll
        dataLength={comments?.length || 0}
        style={{
          overflow: "hidden",
        }}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-4">
            <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
          </div>
        }
        endMessage={
          <p className="text-center py-6 text-gray-600 font-semibold text-lg italic">
            You've reached the end 🎉
          </p>
        }
      >
        {/* Display Comments */}
        <ul className="space-y-3 mb-6">
          {processedComments?.map((comment: any) => (
            <>
              {comment.superCommentPublicId === null && (
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
                      <span>{comment?.replyCount}</span>
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

                  <p
                    onClick={() => handleViewReplies(comment?.publicId)}
                    className="pt-3 text-primary hover:text-primary_DM cursor-pointer font-medium underline transition-colors duration-200"
                  >
                    View replies
                  </p>

                  {expandedCommentId === comment?.publicId && (
                    <div className="pl-6 mt-3 space-y-3">
                      {commentRepliesIsLoading ? (
                        <div className="flex justify-center items-center py-4">
                          <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        commentRepliesData?.publicationCommentViewModel?.map(
                          (reply: any) => (
                            <div
                              key={reply.id}
                              className="p-3 border-l-8 border-gray-200"
                            >
                              <p className="text-gray-700">{reply.comment}</p>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
                </li>
              )}
            </>
          ))}
        </ul>

        {/* Display Icons When There Are No Comments */}
        {items === undefined ||
          (items.length === 0 && (
            <p className="text-center text-xl font-medium">No comments yet</p>
          ))}
        <div className="flex items-center space-x-4 mt-2">
          <button
            className="flex items-center space-x-1 text-primary_DM cursor-pointer"
            onClick={() => toggleModal(null)}
          >
            <MessageCircle />
            <span>Reply</span>
          </button>
        </div>
      </InfiniteScroll>
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
