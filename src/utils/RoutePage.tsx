import { Routes, Route } from "react-router-dom";
import {
  ContactUs,
  Home,
  About,
  SignIn,
  Signup,
  ForgotPassword,
  VerifyEmail,
  ManageUsers,
  PendingPublications,
  TotalArticles,
  Country,
  Region,
  State,
  LGA,
  Ward,
  PoliticalActors,
  PoliticalParties,
  Categories,
  MDA,
  Tags,
  AllInbox,
  CreatePublication,
  SinglePublication,
  Explore,
  StateDetails,
  CreateMultipleUsers,
  ResetPassword,
  CorporateUsers,
  Drafts,
  Rejected,
  Setting,
  ChangePassword,
  BookMarks,
  LikedArticles,
  PublicationDetails,
  Subscription,
  UserSubscription,
  PrivacyPolicy,
  TermsOfUse,
  SinglePublishedPublication,
  Pricing,
  SingleDraftPublication,
  SenatorialDistricts,
  PaymentHistory,
  Leaderboard,
  Reminders,
  DashboardAnalytics,
  ContributorLeaderboard,
  AuthorPage,
  Notifications,
  Messages,
} from "../pages";
import Reviewed from "../pages/Reviewed";
import { LCDA } from "../pages/Lcda";
import { CookiesPolicy } from "../pages/CookiesPolicy";
import GoogleAdScript from "../hooks/AdsScript";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { useAuth } from "../context/AuthContext";
import { RedirectOldPublication } from "./RedirectOldPublication";
// import Test from "../component/Test";

const RoutePage = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useAuth();

  const shouldShowAds = !isAuthenticated || !userObject.isSubscribed;

  return (
    <div>
      {shouldShowAds && (
        <GoogleAdScript
          isLoggedIn={isAuthenticated}
          isSubscribed={userObject.isSubscribed}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/latest-publications/:oldId"
          element={<RedirectOldPublication />}
        />
        <Route path="/publication/:id" element={<PublicationDetails />} />
        <Route path="/explore/:id" element={<StateDetails />} />
        <Route path="/dashboard/manage-users" element={<ManageUsers />} />
        <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
        <Route path="/dashboard/subscription" element={<UserSubscription />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route
          path="/dashboard/manage-users/create"
          element={<CreateMultipleUsers />}
        />
        <Route path="/dashboard/pending" element={<PendingPublications />} />
        <Route path="/dashboard/reviewed" element={<Reviewed />} />
        <Route path="/dashboard/total" element={<TotalArticles />} />
        <Route path="/dashboard/country" element={<Country />} />
        <Route path="/dashboard/region" element={<Region />} />
        <Route path="/dashboard/state" element={<State />} />
        <Route path="/dashboard/lga" element={<LGA />} />
        <Route path="/dashboard/ward" element={<Ward />} />
        <Route path="/dashboard/lcda" element={<LCDA />} />
        <Route path="/dashboard/lcda" element={<LCDA />} />
        <Route
          path="/dashboard/political-actors"
          element={<PoliticalActors />}
        />
        <Route
          path="/dashboard/political-parties"
          element={<PoliticalParties />}
        />
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route path="/dashboard/mda" element={<MDA />} />
        <Route path="/dashboard/tags" element={<Tags />} />
        <Route path="/dashboard/drafts" element={<Drafts />} />
        <Route path="/dashboard/rejected" element={<Rejected />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route
          path="/dashboard/create-publication"
          element={<CreatePublication />}
        />
        <Route path="/dashboard/settings" element={<Setting />} />
        <Route
          path="/dashboard/settings/payment-history"
          element={<PaymentHistory />}
        />
        <Route
          path="/dashboard/senatorial-districts"
          element={<SenatorialDistricts />}
        />
        <Route path="/dashboard/reminders" element={<Reminders />} />
        <Route
          path="/dashboard/contributor-leaderboard"
          element={<ContributorLeaderboard />}
        />
        <Route
          path="/dashboard/settings/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/dashboard/settings/subscription"
          element={<Subscription />}
        />
        <Route path="/dashboard/all-inbox" element={<AllInbox />} />
        <Route path="/dashboard/corporate-users" element={<CorporateUsers />} />
        <Route path="/dashboard/bookmarks" element={<BookMarks />} />
        <Route path="/dashboard/liked-articles" element={<LikedArticles />} />
        <Route path="/dashboard/pending/:id" element={<SinglePublication />} />
        <Route
          path="/dashboard/drafts/:id"
          element={<SingleDraftPublication />}
        />
        <Route
          path="/dashboard/published/:id"
          element={<SinglePublishedPublication />}
        />
      </Routes>
    </div>
  );
};

export default RoutePage;
