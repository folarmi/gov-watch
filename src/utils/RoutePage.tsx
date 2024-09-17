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
} from "../pages";
import Reviewed from "../pages/Reviewed";
import { LCDA } from "../pages/Lcda";
const RoutePage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-u" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<StateDetails />} />
        <Route path="/dashboard/manage-users" element={<ManageUsers />} />
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
        <Route
          path="/dashboard/create-publication"
          element={<CreatePublication />}
        />
        <Route path="/dashboard/all-inbox" element={<AllInbox />} />
        <Route path="/dashboard/pending/:id" element={<SinglePublication />} />
      </Routes>
    </div>
  );
};

export default RoutePage;
