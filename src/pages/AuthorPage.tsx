/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { Link, useParams } from "react-router-dom";
// import Loader from "../component/Loader";
// import { useGetData } from "../hooks/apiCalls";
// import OuterPage from "../layouts/OuterPage";
// import { Avatar } from "../component/Avatar";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useEffect, useState } from "react";

// const AuthorPage = () => {
//   const { id } = useParams();
//   const [hasMore, setHasMore] = useState(true);
//   const [pageNumber, setPageNumber] = useState<any>(1);
//   const [items, setItems] = useState<any>([]);
//   const pageSize = 10;

//   const { data: userBioData, isLoading: userBioIsLoading } = useGetData({
//     url: `Users/GetUserBioById?publicId=${id}`,
//     queryKey: ["GetUserBioById"],
//   });

//   const { data: publicationData, isLoading } = useGetData({
//     url: `Publications/GetLatestPublications?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
//     queryKey: ["GetLatestPublicationsByUserId", pageNumber],
//   });

//   const fetchMoreData = () => {
//     if (hasMore) {
//       setPageNumber((prevPageNumber: number) => prevPageNumber + 1);
//     }
//   };

//   // Reset items for the first page
//   useEffect(() => {
//     if (items === undefined) {
//       setHasMore(false);
//       setItems([]);
//       return;
//     }

//     setItems((prevItems: any) => {
//       if (pageNumber === 1) {
//         return publicationData;
//       } else {
//         return [...prevItems, ...publicationData]; // Append new data
//       }
//     });

//     if (publicationData?.length === 0 || publicationData?.length < pageSize) {
//       setHasMore(false);
//     }
//   }, [publicationData, pageNumber, pageSize]);

//   return (
//     <OuterPage>
//       <>
//         {isLoading || userBioIsLoading ? (
//           <Loader />
//         ) : (
//           <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//             {/* Author Bio Section */}
//             <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//               <div className="sm:flex items-center p-8">
//                 {/* <div className="sm:flex-shrink-0"> */}
//                 <Avatar
//                   size="lg"
//                   imageUrl={userBioData?.image}
//                   name={` ${userBioData?.firstName || ""} ${
//                     userBioData?.lastName || ""
//                   }`.trim()}
//                 />
//                 {/* </div> */}
//                 <div className="p-6">
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     {userBioData?.firstName} {userBioData?.lastName}
//                   </h1>
//                   <p className="mt-4 text-gray-600">
//                     {userBioData?.bio || "-"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Publications Section */}
//             <div className="max-w-3xl mx-auto mt-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Publications
//               </h2>
//               <InfiniteScroll
//                 dataLength={items?.length || 0}
//                 style={{
//                   overflow: "hidden",
//                 }}
//                 next={fetchMoreData}
//                 hasMore={hasMore}
//                 loader={
//                   <div className="flex justify-center items-center py-4">
//                     <div className="w-6 h-6 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
//                   </div>
//                 }
//                 endMessage={
//                   <p className="text-center py-6 text-gray-600 font-semibold text-lg italic">
//                     You've reached the end 🎉
//                   </p>
//                 }
//               >
//                 <div className="space-y-6">
//                   {items?.map((publication: any, index: any) => (
//                     <div
//                       key={index}
//                       className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <Link
//                         to={`/latest-publications/${publication?.publicId}`}
//                         className="sm:flex"
//                       >
//                         {/* Publication Image */}
//                         <div className="sm:flex-shrink-0">
//                           <img
//                             className="h-48 w-full object-cover sm:h-32 sm:w-32 rounded-lg"
//                             src={publication?.image}
//                             alt={publication?.title}
//                           />
//                         </div>
//                         {/* Publication Details */}
//                         <div className="mt-4 sm:mt-0 sm:ml-6">
//                           <h3 className="text-xl font-semibold text-gray-900">
//                             {publication?.title}
//                           </h3>
//                           <p className="text-sm text-gray-500 mt-1">
//                             {publication?.date}
//                           </p>
//                           <p className="mt-2 text-gray-600">
//                             {publication.content.length > 100
//                               ? `${publication.content.slice(0, 100)}...`
//                               : publication.content}
//                           </p>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </InfiniteScroll>
//             </div>
//           </div>
//         )}
//       </>
//     </OuterPage>
//   );
// };

// export { AuthorPage };
import { Link, useParams } from "react-router-dom";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import { Avatar } from "../component/Avatar";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const AuthorPage = () => {
  const { id } = useParams();
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Start with page 1
  const [items, setItems] = useState<any[]>([]);
  const pageSize = 10;

  const { data: userBioData, isLoading: userBioIsLoading } = useGetData({
    url: `Users/GetUserBioById?publicId=${id}`,
    queryKey: ["GetUserBioById"],
  });

  const { data: publicationData } = useGetData({
    url: `Publications/GetLatestPublications?userId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    queryKey: ["GetLatestPublicationsByUserId", pageNumber], // Include pageNumber in queryKey
  });

  // Update items and hasMore state when publicationData changes
  useEffect(() => {
    if (publicationData) {
      if (pageNumber === 1) {
        setItems(publicationData); // Reset items for the first page
      } else {
        setItems((prevItems) => [...prevItems, ...publicationData]); // Append new data
      }

      // Check if there's more data to load
      if (publicationData.length === 0 || publicationData.length < pageSize) {
        setHasMore(false); // No more data to load
      }
    }
  }, [publicationData, pageNumber, pageSize]);

  // Fetch more data function
  const fetchMoreData = () => {
    if (hasMore) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // Increment pageNumber
    }
  };

  return (
    <OuterPage>
      {userBioIsLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          {/* Author Bio Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="sm:flex items-center p-8">
              <Avatar
                size="lg"
                imageUrl={userBioData?.image}
                name={`${userBioData?.firstName || ""} ${
                  userBioData?.lastName || ""
                }`.trim()}
              />
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {userBioData?.firstName} {userBioData?.lastName}
                </h1>
                <p className="mt-4 text-gray-600">{userBioData?.bio || "-"}</p>
              </div>
            </div>
          </div>

          {/* Publications Section */}
          <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Publications
            </h2>
            <InfiniteScroll
              dataLength={items.length} // Total number of items loaded
              style={{ overflow: "hidden" }}
              next={fetchMoreData} // Function to load more data
              hasMore={hasMore} // Whether there's more data to load
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
              <div className="space-y-6">
                {items.map((publication: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link
                      to={`/latest-publications/${publication?.publicId}`}
                      className="sm:flex"
                    >
                      {/* Publication Image */}
                      <div className="sm:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover sm:h-32 sm:w-32 rounded-lg"
                          src={publication?.image}
                          alt={publication?.title}
                        />
                      </div>
                      {/* Publication Details */}
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {publication?.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {publication?.date}
                        </p>
                        <p className="mt-2 text-gray-600">
                          {publication.content.length > 100
                            ? `${publication.content.slice(0, 100)}...`
                            : publication.content}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </OuterPage>
  );
};

export { AuthorPage };
