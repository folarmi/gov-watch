/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from "../lib/features/auth/authSlice";

export const truncateText = (text: string, maxLength: number) => {
  const words = text?.split(" ");
  if (words?.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  } else {
    return text;
  }
};

export const dashboardPath = (userType: UserType) => {
  let dashboardPath;
  if (userType === "Admin") dashboardPath = "/admin-dashboard";
  else if (userType === "Editor") dashboardPath = "/editor-dashboard";
  else if (userType === "Contributor") dashboardPath = "/contributor-dashboard";
  else if (userType === "User") dashboardPath = "/dashboard";

  return dashboardPath;
};

export const continents = [
  { id: 1, name: "Africa" },
  { id: 2, name: "Antarctica" },
  { id: 3, name: "Asia" },
  { id: 4, name: "Europe" },
  { id: 5, name: "North America" },
  { id: 6, name: "Australia" },
  { id: 7, name: "South America" },
];

export function shouldFetchPublications(userType: string) {
  if (!userType) return false;
  if (userType === "Contributor") {
    // Logic to determine if contributor should fetch
    return true; // Apply custom logic for contributors
  }
  // For non-contributors
  return true;
}

export const getPublicationTypeByUserId = `Publications/GetAllPublicationsByUserId?userId=`;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

export const userTypeObject = {
  contributor: "Contributor",
  admin: "Admin",
  editor: "Editor",
  user: "User",
  organization: "Organization",
};

export const calculateTimeDifference = (
  deadline: string,
  setTimeDifference: any
) => {
  if (!deadline) return;

  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  const difference = deadlineDate.getTime() - currentDate.getTime();

  const isPastDeadline = difference < 0;

  // Convert the difference to absolute value for formatting
  const diff = Math.abs(difference);

  // Calculate days, hours, and minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Set time difference string and indicate whether it's past the deadline
  if (isPastDeadline) {
    setTimeDifference(
      `${days}days ${hours}hours ${minutes}mins ${seconds}secs past deadline`
    );
  } else {
    setTimeDifference(
      `${days}days ${hours}hours ${minutes}mins ${seconds}secs to deadline`
    );
  }
};

export const queryParamsToAdd = (param: string, filter: string) => {
  let returnedQueryParam;
  if (param === "Ministries, Departments, Agencies (MDAs)") {
    returnedQueryParam = `mdaName=${filter}`;
  } else if (param === "Political actors") {
    returnedQueryParam = `politicalActorName=${filter}`;
  } else if (param === "State") {
    returnedQueryParam = `stateName=${filter}`;
  } else if (param === "Local Govt Area (LGA)") {
    returnedQueryParam = `lgaName=${filter}`;
  } else if (param === "") {
    returnedQueryParam = `name=${filter}`;
  }

  return returnedQueryParam;
};

export const directUserToPageOnLogin = (userType: UserType) => {
  let pageToRedirect;
  if (userType === userTypeObject.contributor) {
    pageToRedirect = "/dashboard/total";
  } else if (userType === userTypeObject.admin) {
    pageToRedirect = "/dashboard/manage-users";
  } else if (userType === userTypeObject.editor) {
    pageToRedirect = "/dashboard/drafts";
  } else if (userType === userTypeObject.organization) {
    pageToRedirect = "/dashboard/corporate-users";
  } else if (userType === userTypeObject.user) {
    pageToRedirect = "/dashboard/bookmarks";
  } else {
    pageToRedirect = "/sign-in";
  }
  return pageToRedirect;
};
