export interface SidebarItemProp {
  name: string;
  url: string;
  id: number;
}

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserType = {
  username: string;
  email: string;
  role: string;
  post: number;
  status: boolean;
  lastLogin: string;
};

export type CategoriesType = {
  categories: string;
  about: string;
  post: number;
};

export type StateType = {
  state: string;
  about: string;
  post: number;
};

export type LGAType = {
  lga: string;
  about: string;
  post: number;
};

export type MDAType = {
  mdaCode: string;
  ministries: string;
  departments: string;
  agencies: string;
};

export type RegionType = {
  name: string;
};

export type InboxType = {
  username: string;
  email: string;
  role: string;
  subject: string;
};

export interface Article {
  id?: string;
  title: string;
  date: string;
  image: string;
  section: string;
  summary: string;
  isPromise: boolean;
  publicId: string;
  promiseDeadline?: string;
  isPromiseFulfilled?: boolean;
  isBookmarked?: boolean;
  isCredible?: boolean;
  dateIncidentStarted?: string;
  dateIncidentResolved?: string;
  isLiked?: boolean;
}
