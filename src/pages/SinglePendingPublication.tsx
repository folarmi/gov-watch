import { useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useGetDataById } from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import Loader from "../component/Loader";
import { useEffect, useState } from "react";
import { userTypeObject } from "../utils";

const SinglePublication = () => {
  const params = useParams();
  const { userType, userId } = useAppSelector((state: RootState) => state.auth);

  const { data: publicationData, isLoading: publicationDataIsLoading } =
    useGetDataById({
      url:
        params?.id && userId
          ? `/Publications/GetUserPublicationById?publicId=${params?.id}&userId=${userId}&isDraft=false`
          : "",
      queryKey: ["GetUserPublicationByIdForSinglePublication"],
      enabled: !!params?.id && !!userId,
    });

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (publicationData?.tags) {
      // Split the tags string into an array
      const tagsArray = publicationData.tags.split(/\s*,\s*/);
      setTags(tagsArray);
    }
  }, [publicationData]);

  return (
    <>
      {publicationDataIsLoading ? (
        <Loader />
      ) : (
        <div>
          <ArticleForm
            // isEditing={
            //   userType === userTypeObject.admin &&
            //   userId !== publicationData?.contributorPublicId
            //     ? false
            //     : true
            // }
            tags={tags}
            setTags={setTags}
            isEditing={true}
            defaultValues={publicationData}
            isPending={
              userType === userTypeObject.admin ||
              userType === userTypeObject.editor
                ? false
                : true
            }
            // onSubmit={handleEditSubmit}
            // handleFileUpload={handleFileUpload}
            // Pass other necessary props...
          />
        </div>
      )}
    </>
  );
};

export { SinglePublication };
