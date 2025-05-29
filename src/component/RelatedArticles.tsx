// import { useMemo } from "react";
// import { useGetData } from "../hooks/apiCalls";
// import { Article, Publication } from "../types/generalTypes";
// import { Link } from "react-router-dom";
// import { scrollToTop } from "../utils";

// type Prop = {
//   article: Publication;
// };

// const RelatedArticles = ({ article }: Prop) => {
//   const queryParams = useMemo(() => {
//     const params = new URLSearchParams();

//     // if (article?.tags) params.append("tagName", article.tags);
//     if (article?.category) params.append("categoryName", article.category);
//     if (article?.politicalActorName)
//       params.append("politicalActorName", article.politicalActorName);
//     // if (article?.id) params.append("exclude", article.id);
//     // params.append("limit", 3); // optional

//     return params.toString();
//   }, [article?.category, article?.politicalActorName]);

//   const { data: relatedArticles, isLoading } = useGetData({
//     url: `Publications/GetLatestPublications?${queryParams}`,
//     queryKey: ["GetRelatedArticles", article?.publicId, queryParams],
//   });

//   if (isLoading) return <p>Loading related articles...</p>;
//   if (!relatedArticles?.length) return null;

//   const filteredArticles = (relatedArticles || []).filter(
//     (item: Article) => item?.publicId?.trim() !== article?.publicId?.trim()
//   );

//   return (
//     <div className="related-articles mt-10">
//       <h3 className="text-xl font-semibold mb-4">Related Articles</h3>

//       <ul className="flex flex-wrap items-center gap-4">
//         {filteredArticles?.map((item: Article) => (
//           <li key={item.publicId} className="border p-4 rounded">
//             <Link to={`/publication/${item.publicId}`} onClick={scrollToTop}>
//               <p className="font-medium text-sm whitespace-nowrap">
//                 {item.title}
//               </p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RelatedArticles;

import { useGetData } from "../hooks/apiCalls";
import { Article, Publication } from "../types/generalTypes";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils";

type Prop = {
  article: Publication;
};

const RelatedArticles = ({ article }: Prop) => {
  // Build query params directly without useMemo
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (article?.category) params.append("categoryName", article.category);
    if (article?.politicalActorName) {
      params.append("politicalActorName", article.politicalActorName);
    }
    return params.toString();
  };

  const queryParams = buildQueryParams();

  const { data: relatedArticles, isLoading } = useGetData({
    url: `Publications/GetLatestPublications?${queryParams}`,
    queryKey: ["GetRelatedArticles", queryParams],
  });

  if (isLoading) return <p>Loading related articles...</p>;

  // More robust filtering
  const filteredArticles = (relatedArticles || []).filter((item: Article) => {
    return item?.publicId && item.publicId.trim() !== article?.publicId?.trim();
  });

  if (!filteredArticles.length) return null;

  return (
    <div className="related-articles mt-10">
      <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
      <ul className="flex flex-wrap items-center gap-4">
        {filteredArticles.map((item: Article) => (
          <li key={item.publicId} className="border p-4 rounded">
            <Link to={`/publication/${item.publicId}`} onClick={scrollToTop}>
              <p className="font-medium text-sm whitespace-nowrap">
                {item.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedArticles;
