import { UserType } from "../lib/features/auth/authSlice";

export const truncateText = (text: string, maxLength: number) => {
  const words = text.split(" ");
  if (words.length > maxLength) {
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
