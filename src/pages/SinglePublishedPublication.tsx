import { useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useGetDataById } from "../hooks/apiCalls";
import ArticleForm from "../component/forms/ArticleForm";
import Loader from "../component/Loader";

const SinglePublishedPublication = () => {
  const params = useParams();
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: publicationData, isLoading: publicationDataIsLoading } =
    useGetDataById({
      url:
        params?.id && userId
          ? `/Publications/GetUserPublicationById?publicId=${params?.id}&userId=${userId}&isDraft=true`
          : "",
      queryKey: ["GetUserPublicationByIdForSinglePublication"],
      enabled: !!params?.id && !!userId,
    });
  // SinglePublishedPublication
  return (
    <>
      {publicationDataIsLoading ? (
        <Loader />
      ) : (
        <div>
          <ArticleForm
            isEditing={true}
            // defaultValues={publicationData} // Pass the article data as default values
            defaultValues={publicationData}
            // onSubmit={handleEditSubmit}
            // handleFileUpload={handleFileUpload}
            // Pass other necessary props...
          />
        </div>
      )}
    </>
  );
};

export { SinglePublishedPublication };
