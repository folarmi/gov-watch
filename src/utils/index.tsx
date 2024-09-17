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
