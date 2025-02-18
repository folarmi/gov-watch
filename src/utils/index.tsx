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

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Helper function to add singular/plural labels
  const pluralize = (value: number, label: string) =>
    `${value} ${label}${value === 1 ? "" : "s"}`;

  // Create the time difference string with proper pluralization
  const timeString = [
    days > 0 && pluralize(days, "day"),
    hours > 0 && pluralize(hours, "hour"),
    minutes > 0 && pluralize(minutes, "minute"),
    seconds > 0 && pluralize(seconds, "second"),
  ]
    .filter(Boolean) // Remove empty values
    .join(" ");

  // Set time difference string and indicate whether it's past the deadline
  if (isPastDeadline) {
    setTimeDifference(`${timeString} past deadline`);
  } else {
    setTimeDifference(`${timeString} to deadline`);
  }
};

// utils/calculateIncidentDuration.ts
export const calculateIncidentDuration = (
  startDate: string | undefined,
  resolvedDate: string | null | undefined // Allow resolvedDate to be null
): string => {
  if (!startDate) return "No start date provided";

  const start = new Date(startDate);
  // const resolved = resolvedDate === null ? new Date() : new Date(resolvedDate); // Use current date if resolvedDate is null
  const resolved = resolvedDate ? new Date(resolvedDate) : new Date();
  const difference = resolved.getTime() - start.getTime();
  const isResolved = resolvedDate !== null; // Check if resolvedDate is not null

  // Convert the difference to absolute value for formatting
  const diff = Math.abs(difference);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Helper function to add singular/plural labels
  const pluralize = (value: number, label: string) =>
    `${value} ${label}${value === 1 ? "" : "s"}`;

  // Create the time difference string with proper pluralization
  const timeString = [
    days > 0 && pluralize(days, "day"),
    hours > 0 && pluralize(hours, "hour"),
    minutes > 0 && pluralize(minutes, "minute"),
    seconds > 0 && pluralize(seconds, "second"),
  ]
    .filter(Boolean) // Remove empty values
    .join(" ");

  // Return the formatted string based on whether the incident is resolved
  if (isResolved) {
    return `${timeString} since resolution`;
  } else {
    return `${timeString} since incident started`;
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
    pageToRedirect = "/dashboard/pending";
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

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll animation
  });
};

export const getUserInitials = (userObject: any, userType: string) => {
  if (userType !== userTypeObject.organization) {
    const firstInitial = userObject?.firstName?.[0] || "";
    const lastInitial = userObject?.lastName?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  return userObject?.organizationName?.slice(0, 2)?.toUpperCase() || "";
};
