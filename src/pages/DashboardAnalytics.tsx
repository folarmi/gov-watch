/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Award,
  BookMarkedIcon,
  Clock,
  Eye,
  EyeIcon,
  FileText,
  Flag,
  Globe,
  ImagePlus,
  Library,
  Map,
  Tag,
  Trophy,
  UsersIcon,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hook";
import { useGetData } from "../hooks/apiCalls";
import { leaderboardFilter, userTypeObject } from "../utils";
import { DashboardCard } from "../component/forms/DashboardCard";
import Loader from "../component/Loader";
import CustomSelect from "../component/CustomSelect";
import { useForm } from "react-hook-form";
import { useState } from "react";

const DashboardAnalytics = () => {
  const { control } = useForm();
  const [selectedFilter, setSelectedFilter] = useState("daily");

  const { userType, userId } = useAppSelector((state: RootState) => state.auth);

  const { data: userCountData, isLoading: userCountIsLoading } = useGetData({
    url: "Users/GetCountOfUsers",
    queryKey: ["GetCountOfUsers"],
    enabled: userType === userTypeObject.admin,
  });

  const { data: countOfPublications, isLoading: countOfPublicationsIsLoading } =
    useGetData({
      url: "Publications/GetCountOfPublications",
      queryKey: ["GetCountOfPublications"],
      enabled:
        userType === userTypeObject.admin || userType === userTypeObject.editor,
    });

  const { data: countriesData, isLoading: countriesDataIsLoading } = useGetData(
    {
      url: "Countries/GetCountOfCountries?isDeleted=false",
      queryKey: ["GetCountOfCountries"],
      enabled:
        userType === userTypeObject.admin || userType === userTypeObject.editor,
    }
  );

  const { data: regionsData, isLoading: regionsDataIsLoading } = useGetData({
    url: "Regions/GetCountOfRegion?isDeleted=false",
    queryKey: ["GetCountOfRegion"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const { data: reviewsData, isLoading: reviewsDataIsLoading } = useGetData({
    url: "Reviews/GetCountOfReviews?isDeleted=false",
    queryKey: ["GetCountOfReviews"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const { data: stateData, isLoading: stateDataIsLoading } = useGetData({
    url: "States/GetCountOfStates?isDeleted",
    queryKey: ["GetCountOfStates"],
    enabled: userType === userTypeObject.admin,
  });

  const { data: tagsData, isLoading: tagsDatasLoading } = useGetData({
    url: "Tags/GetCountOfTags?isDeleted=false",
    queryKey: ["GetCountOfTags"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const { data: remindersData, isLoading: remindersDataIsLoading } = useGetData(
    {
      url: "Reminders/GetCountOfReminders?isDeleted=false",
      queryKey: ["GetCountOfReminders"],
      enabled:
        userType === userTypeObject.admin || userType === userTypeObject.editor,
    }
  );

  const { data: leaderboardData, isLoading: leaderboardDataIsLoading } =
    useGetData({
      url: `LeaderBoards/GetContributorLeaderBoardByContributorId?period=${selectedFilter}&publicId=${userId}`,
      queryKey: ["GetContributorLeaderBoardByContributorId", selectedFilter],
      enabled: userType === userTypeObject.contributor,
    });

  const {
    data: publicationViewsData,
    isLoading: publicationViewsDataIsLoading,
  } = useGetData({
    url: "Publications/GetCountOfPublishedPublicationsViews",
    queryKey: ["GetCountOfPublishedPublicationsViews"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const {
    data: searchLeaderBoardData,
    isLoading: searchLeaderBoardDataIsLoading,
  } = useGetData({
    url: "SearchLeaderBoards/GetCountOfSearchLeaderBoards?isDeleted=false",
    queryKey: ["GetCountOfSearchLeaderBoards"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const { data: uploadData, isLoading: uploadDataIsLoading } = useGetData({
    url: "Uploads/GetCountOfUploads?isDeleted=false",
    queryKey: ["GetCountOfUploads"],
    enabled:
      userType === userTypeObject.admin || userType === userTypeObject.editor,
  });

  const { data: bookmarksData, isLoading: bookmarksIsLoading } = useGetData({
    url: `UserBookmarks/GetCountOfUserBookmarks?userId=${userId}`,
    queryKey: ["GetCountOfUserBookmarks"],
  });

  const {
    data: approvedPublicationsData,
    isLoading: approvedPublicationsIsLoading,
  } = useGetData({
    url: `Publications/GetCountOfPublicationsByUserId?userId=${userId}`,
    queryKey: ["GetCountOfPublicationsByUserId"],
    enabled: userType === userTypeObject.contributor,
  });

  const {
    data: userPublicationViewsData,
    isLoading: userPublicationViewsDataIsLoading,
  } = useGetData({
    url: `Publications/GetCountOfPublishedPublicationsViewsByUserId?userId=${userId}`,
    queryKey: ["GetCountOfPublicationsByUserId"],
    enabled: userType === userTypeObject.contributor,
  });

  return (
    <>
      {userCountIsLoading ||
      countOfPublicationsIsLoading ||
      countriesDataIsLoading ||
      regionsDataIsLoading ||
      reviewsDataIsLoading ||
      stateDataIsLoading ||
      tagsDatasLoading ||
      remindersDataIsLoading ||
      publicationViewsDataIsLoading ||
      searchLeaderBoardDataIsLoading ||
      uploadDataIsLoading ||
      bookmarksIsLoading ||
      approvedPublicationsIsLoading ||
      userPublicationViewsDataIsLoading ? (
        <Loader />
      ) : (
        <DashboardLayout>
          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Dashboard Analytics
            </h1>

            {/* Key Metrics Grid */}
            {userType === userTypeObject.admin && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                  name="Total Users"
                  icon={UsersIcon}
                  count={userCountData?.totalCount || 0}
                  iconColor="#3b82f6"
                  bgColor="#eff6ff"
                />
                <DashboardCard
                  name="Total States"
                  icon={Flag}
                  count={stateData?.totalCount || 0}
                  iconColor="#ec4899"
                  bgColor="#fdf2f8"
                />
                <DashboardCard
                  name="Total Bookmarks"
                  icon={BookMarkedIcon}
                  count={bookmarksData?.totalCount || 0}
                  iconColor="#3b82f6"
                  bgColor="#eff6ff"
                />
              </div>
            )}

            {(userType === userTypeObject.admin ||
              userType === userTypeObject.editor) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardCard
                  name="Total Publications"
                  icon={Library}
                  count={countOfPublications?.totalCount || 0}
                  iconColor="#22c55e"
                  bgColor="#f0fdf4"
                />

                <DashboardCard
                  name="Total Countries"
                  icon={Globe}
                  count={countriesData?.totalCount || 0}
                  iconColor="#a855f7"
                  bgColor="#faf5ff"
                />

                <DashboardCard
                  name="Total Regions"
                  icon={Map}
                  count={regionsData?.totalCount || 0}
                  iconColor="#eab308"
                  bgColor="#fefce8"
                />

                <DashboardCard
                  name="Total Reviews"
                  icon={FileText}
                  count={reviewsData?.totalCount || 0}
                  iconColor="#ef4444"
                  bgColor="#fef2f2"
                />

                <DashboardCard
                  name="Total Tags"
                  icon={Tag}
                  count={tagsData?.totalCount || 0}
                  iconColor="#84cc16"
                  bgColor="#f7fee7"
                />

                <DashboardCard
                  name="Total Reminders"
                  icon={Clock}
                  count={remindersData?.totalCount || 0}
                  iconColor="#a855f7"
                  bgColor="#faf5ff"
                />

                <DashboardCard
                  name="Publication Views"
                  icon={Eye}
                  count={publicationViewsData?.totalCount || 0}
                  iconColor="#64748b"
                  bgColor="#f8fafc"
                />

                <DashboardCard
                  name="Total LeaderBoards"
                  icon={Trophy}
                  count={searchLeaderBoardData?.totalCount || 0}
                  iconColor="#71717a"
                  bgColor="#e4e4e7"
                />

                <DashboardCard
                  name="Total Uploads"
                  icon={ImagePlus}
                  count={uploadData?.totalCount || 0}
                  iconColor="#f59e0b"
                  bgColor="#fde68a"
                />
              </div>
            )}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"></div> */}

            {userType === userTypeObject.contributor && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <DashboardCard
                    name="Total Bookmarks"
                    icon={BookMarkedIcon}
                    count={bookmarksData?.totalCount || 0}
                    iconColor="#3b82f6"
                    bgColor="#eff6ff"
                  />
                  <DashboardCard
                    name="Approved Publications"
                    icon={Library}
                    count={approvedPublicationsData?.totalCount || 0}
                    iconColor="#22c55e"
                    bgColor="#f0fdf4"
                  />
                  <DashboardCard
                    name="Publications Views"
                    icon={EyeIcon}
                    count={userPublicationViewsData?.totalCount || 0}
                    iconColor="#22c55e"
                    bgColor="#f0fdf4"
                  />
                </div>

                <div className="w-1/2">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Leaderboard
                  </h1>

                  <CustomSelect
                    name="country"
                    options={leaderboardFilter}
                    isLoading={false}
                    label="Filter By"
                    control={control}
                    placeholder="Select Filter"
                    customOnChange={(name: any) =>
                      setSelectedFilter(name?.value)
                    }
                  />

                  {leaderboardDataIsLoading ? (
                    <Loader />
                  ) : (
                    <DashboardCard
                      name="Rank"
                      icon={Award}
                      count={leaderboardData?.rank || "N/A"}
                      iconColor="#ec4899"
                      bgColor="#fdf2f8"
                    />
                  )}
                </div>
              </>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              {/* <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Sales Overview
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="uv"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div> */}

              {/* Bar Chart Placeholder */}
              {/* <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  User Engagement
                </h2>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Bar Chart Placeholder</p>
                </div>
              </div> */}
            </div>

            {/* Recent Activity Table */}
            {/* <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2">User</th>
                    <th className="py-2">Action</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">John Doe</td>
                    <td className="py-3">Logged In</td>
                    <td className="py-3">2023-10-01</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Jane Smith</td>
                    <td className="py-3">Updated Profile</td>
                    <td className="py-3">2023-10-02</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Mike Johnson</td>
                    <td className="py-3">Made a Purchase</td>
                    <td className="py-3">2023-10-03</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export { DashboardAnalytics };
