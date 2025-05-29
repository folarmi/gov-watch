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

export interface Publication {
  publicId: string;
  snippet: string;
  article: string;
  image: string;
  imageCaption: string;
  contributorPublicId: string;
  category: string;
  state: string;
  senatorialDistrict: string | null;
  ward: string | null;
  lcda: string;
  region: string | null;
  isFederal: boolean;
  title: string;
  authorName: string;
  tags: string;
  reference: string;
  link: string;
  contributorFullName: string;
  bio: string;
  socialMediaLink: string;
  contributorImage: string;
  viewCount: string;
  date: string;
  lastModifiedDate: string | null;
  isPromise: boolean;
  isCredible: boolean;
  isPromiseFulfilled: boolean | null;
  datePromiseMade: string | null;
  promiseDeadline: string | null;
  dateIncidentStarted: string;
  dateIncidentResolved: string | null;
  datePromiseFulfilled: string | null;
  politicalActorName: string;
  lga: string;
  mda: string;
  country: string;
  isSuccessful: boolean;
  statusCode: number;
  remark: string;
  totalCount: number;
}
