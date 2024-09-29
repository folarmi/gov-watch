import { Link, useParams } from "react-router-dom";
import { useGetDataById } from "../hooks/apiCalls";
import OuterPage from "../layouts/OuterPage";
import Loader from "../component/Loader";
import backButton from "../assets/backButton.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import sampleWriter from "../assets/sampleWriter.webp";

import { RenderArticle } from "../component/forms/RenderArticle";

const PublicationDetails = () => {
  const params = useParams();

  const {
    // data: publicationDetailsData,
    isLoading: publicationDetailsIsLoading,
  } = useGetDataById({
    url: `Publications/GetPublicationById?publicId=${params?.id}`,
    queryKey: ["GetAllUserBookmarksByUserId"],
    enabled: !!params?.id,
  });

  const publicationDetailsData = {
    publicId: "0898adeb-f0e8-43fe-92d9-9433bb4d646b",
    snippet: "Libero laudantium n",
    article:
      '<p><strong>The Evolution of Technology in the 21st Century</strong></p><p><br></p><p>The 21st century has been marked by an unprecedented acceleration in technological advancements. From the dawn of the digital revolution in the late 20th century, we have witnessed a profound transformation in the way we live, work, and communicate. The internet, once a luxury, has become an essential utility in most parts of the world. It has enabled the rise of global communication networks, fostering collaboration and breaking down geographical barriers. Social media, cloud computing, and mobile technology are just a few examples of how deeply technology has integrated into our daily lives, reshaping industries from education to healthcare and entertainment.</p><p><br></p><p>One of the most significant milestones in recent years has been the proliferation of artificial intelligence (AI). AI technologies, particularly machine learning and neural networks, have opened new horizons in data processing, predictive analytics, and automation. Industries like manufacturing, finance, and medicine have been transformed by AI’s ability to process vast amounts of data in real-time and make decisions with unprecedented accuracy. Self-driving cars, intelligent personal assistants, and automated customer service systems are all examples of AI’s potential. However, the rapid adoption of AI has also raised ethical concerns about job displacement and the extent to which machines should be allowed to make decisions for humans.</p><p><br></p><p>Another critical technological advancement is the development of blockchain technology. Initially introduced as the foundation of cryptocurrencies like Bitcoin, blockchain has since found applications in a wide range of fields, from supply chain management to secure voting systems. The decentralized nature of blockchain technology makes it highly secure and transparent, which has proven to be an invaluable feature in industries where trust and accountability are paramount. Despite its potential, blockchain adoption has been slower than expected, mainly due to regulatory challenges and a lack of standardization. However, as these hurdles are addressed, blockchain could revolutionize the way we manage digital assets and transactions.</p><p><br></p><p>The rise of the Internet of Things (IoT) has also played a pivotal role in the evolution of technology. IoT refers to the interconnected network of devices that communicate and exchange data over the internet. From smart thermostats to connected cars, IoT devices are becoming integral to our daily routines. In industries such as agriculture and manufacturing, IoT enables real-time monitoring and predictive maintenance, leading to increased efficiency and reduced operational costs. However, the increasing number of connected devices also presents security risks. As IoT devices become more prevalent, ensuring the security and privacy of data exchanged between these devices will be a significant challenge moving forward.</p><p><br></p><p><span style="color: rgb(14, 14, 14);">As we look to the future, it’s clear that technology will continue to evolve at a rapid pace. Emerging trends such as quantum computing, 5G networks, and augmented reality (AR) promise to push the boundaries of what is possible. Quantum computing, in particular, could revolutionize fields such as cryptography and material science by solving complex problems that are currently beyond the reach of classical computers. Similarly, 5G will enable faster and more reliable internet connections, making it possible for more devices to be connected simultaneously. Augmented reality, on the other hand, has the potential to reshape industries such as retail, education, and healthcare by providing immersive experiences that blend the digital and physical worlds. As these technologies mature, they will undoubtedly continue to shape our world in ways we cannot yet fully comprehend.</span>Qui dolores veritati.</p>',
    image:
      "http://govwatch.runasp.net/Uploads/08399785-c8e4-4a26-be18-b3e6757b4129_Screenshot 2024-09-27 at 20.48.02.png",
    imageCaption: "Ipsum pariatur Even",
    contributorPublicId: "a7e36778-2fec-4b6e-8569-dbe47778dff0",
    category: "Category Two",
    state: "Ethan Spears",
    ward: "Idona Mcneil",
    lcda: "Ifeoma Noble",
    region: "Region Two",
    province: null,
    isFederal: false,
    title: "5 page paragraph",
    authorName: "Zahir Goff",
    tags: "one, two, three",
    reference: "Vitae consectetur qu",
    link: "Et autem fugiat modi",
    contributorFullName: "Admin User",
    bio: "fdsadfghjkjhgfdvhvb",
    socialMediaLink: null,
    contributorImage: null,
    viewCount: "0",
    date: "Sunday 29 September, 2024",
    isPromise: false,
    isPromisedFulfilled: null,
    datePromiseMade: "1977-09-27T00:00:00",
    promiseDeadline: "1979-12-18T00:00:00",
    datePromiseFulfilled: "1979-02-20T00:00:00",
    politicalActorName: "Aphrodite Douglas",
    lga: "Alexander Calderon",
    mda: "Talon Bell",
    country: "Nigeria",
    isSuccessful: true,
    statusCode: 200,
    remark: "Publication retrieved successfully",
    totalCount: 1,
  };

  return (
    <OuterPage>
      {publicationDetailsIsLoading ? (
        <Loader />
      ) : (
        <section className="w-full max-w-[680px] mt-4 mx-auto">
          <Link to="/" className="cursor-pointer">
            <img src={backButton} className="w-5 h-5" />
          </Link>

          <div className="flex mt-2 mb-8 items-center gap-x-4">
            <p className="text-base text-primary font-bold">
              {publicationDetailsData?.category}
            </p>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>

            <div className="flex items-center">
              <img src={eyeIcon} className="mr-2" />
              <p>{publicationDetailsData?.viewCount} views</p>
            </div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <p className="text-base text-black/90 font-medium">
              {publicationDetailsData?.date}
            </p>
          </div>

          <main>
            <p
              style={{
                fontSize:
                  "font-size: clamp(2rem, 1.4783rem + 2.6087vw, 3.5rem)",
              }}
              className="text-6xl text-black font-black mb-2"
            >
              {publicationDetailsData?.title}
            </p>

            <img
              src="https://via.placeholder.com/800x400?text=Article+Placeholder"
              alt="Article placeholder image"
              className="w-full h-auto object-cover rounded-lg blur-xs my-4"
            />

            <RenderArticle articleContent={publicationDetailsData?.article} />

            {/* Start of additional information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 shadow-md">
              <h3 className="font-bold text-lg mb-2">Additional Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">State:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.state}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">LGA:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.lga}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Political Actor:
                  </span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.politicalActorName}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">MDAs:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.mda}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">Region:</span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.region}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Date Promise Made:
                  </span>
                  <p className="ml-2 text-gray-600">
                    {new Date(
                      publicationDetailsData?.datePromiseMade
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Promise Deadline:
                  </span>
                  <p className="ml-2 text-gray-600">
                    {new Date(
                      publicationDetailsData?.promiseDeadline
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-gray-700">
                    Date Promise Fulfilled:
                  </span>
                  <p className="ml-2 text-gray-600">
                    {publicationDetailsData?.datePromiseFulfilled
                      ? new Date(
                          publicationDetailsData?.datePromiseFulfilled
                        ).toLocaleDateString()
                      : "Not fulfilled"}
                  </p>
                </div>
              </div>
            </div>

            {publicationDetailsData?.bio !== null && (
              <p className="my-6 text-base font-normal">
                <span className="font-semibold">
                  {publicationDetailsData?.authorName}
                </span>{" "}
                is a {publicationDetailsData?.bio}
              </p>
            )}

            <p className="font-black mb-2">References</p>
            <p className="mb-8">{publicationDetailsData?.reference}</p>

            <p className="font-black mb-2">Tags</p>
            {publicationDetailsData?.tags.split(", ")?.map((item, index) => {
              return (
                <span
                  key={index}
                  className="bg-gray-100 capitalize text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  {item}
                </span>
              );
            })}

            <div className="flex items-start my-8">
              <div className="w-36 h-36 overflow-hidden rounded-full">
                <img
                  src={sampleWriter}
                  className="w-full h-full object-cover rounded-full"
                  alt="Writer"
                />
              </div>

              <div className="ml-6">
                <p className="font-bold text-3xl">
                  Written by {publicationDetailsData?.authorName}
                </p>
              </div>
            </div>
          </main>
        </section>
      )}
    </OuterPage>
  );
};

export { PublicationDetails };
