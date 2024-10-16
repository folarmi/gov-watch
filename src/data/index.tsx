/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarItemProp } from "../types/generalTypes";
import iconOne from "../../public/iconOne.svg";
import iconTwo from "../../public/iconTwo.svg";
import iconThree from "../../public/iconThree.svg";
import iconFour from "../../public/iconFour.svg";
import iconFive from "../../public/iconFive.svg";
import iconSix from "../../public/iconSix.svg";
import iconSeven from "../../public/iconSeven.svg";
import iconEight from "../../public/iconEight.svg";
import lga from "../../public/lga.svg";
import mda from "../../public/mda.svg";
import inbox from "../../public/inbox.svg";
import { userTypeObject } from "../utils";
import {
  User,
  FileText,
  Hourglass,
  Slash,
  Globe,
  MapPin,
  Flag,
  Building,
  Layers,
  Building2,
  UserCheck,
  Grid,
  Briefcase,
  Tag,
  Inbox,
  CreditCard,
  Users,
} from "lucide-react";

export const SidebarList: SidebarItemProp[] = [
  {
    id: 1,
    name: "Latest Articles",
    url: "/",
  },
  {
    id: 2,
    name: "Contact us",
    url: "/contact-us",
  },
  {
    id: 3,
    name: "About us",
    url: "/about-us",
  },
  {
    id: 4,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 5,
    name: "Sign up",
    url: "/sign-up",
  },
];

export const SignedInSidebarList: any[] = [
  {
    id: 1,
    name: "Latest Publications",
    url: "/",
  },
  {
    id: 2,
    name: "Contact us",
    url: "/contact",
  },
  {
    id: 3,
    name: "About us",
    url: "/about-us",
  },
  {
    id: 4,
    name: "Dashboard",
    url: "/dashboard",
  },
];

export const FooterList: SidebarItemProp[] = [
  {
    id: 1,
    name: "Privacy",
    url: "/",
  },
  {
    id: 2,
    name: "Cookies Policy",
    url: "/contact",
  },
  {
    id: 3,
    name: "Terms of use",
    url: "/about-us",
  },
];

export const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
];

export const cardData = [
  {
    section: "Agencies",
    articleTitle: "Lorem ipsum dolor sit",
    summary: "consectetur. Neque eu velit diam vel venenatis",
    date: "22 Jan 2024",
    promise: true,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Companies",
    articleTitle: "Duis aute irure dolor",
    summary:
      "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    date: "12 Feb 2023",
    promise: false,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Agencies",
    articleTitle: "Ut enim ad minim veniam",
    summary:
      "proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: "05 Dec 2022",
    promise: true,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Organizations",
    articleTitle: "Ut enim ad minim veniam",
    summary:
      "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    date: "18 Mar 2024",
    promise: true,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Companies",
    articleTitle: "Lorem ipsum dolor sit amet",
    summary: "consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    date: "30 Nov 2023",
    promise: false,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Agencies",
    articleTitle: "Duis aute irure dolor in reprehenderit",
    summary: "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    date: "08 Sep 2023",
    promise: true,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Organizations",
    articleTitle: "Sed ut perspiciatis unde",
    summary: "omnis iste natus error sit voluptatem accusantium doloremque",
    date: "25 Apr 2023",
    promise: false,
    imageUrl: "/coatOfArms.svg",
  },
  {
    section: "Companies",
    articleTitle: "At vero eos et accusamus",
    summary:
      "qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    date: "10 Jul 2024",
    promise: true,
    imageUrl: "/coatOfArms.svg",
  },
];

export const stateInfo = [
  {
    id: 1,
    capital: "Ikeja",
    governor: "Babajide Sanwo-Olu",
    politicalParty: "All Progressive Congress (APC)",
    population: "16,536,018",
    landMass: "3,577 km²",
    financialAllocation: "246 trillion at 2023",
    mdas: 82,
    lga: 20,
  },
];

export const editorDashboard = [
  {
    id: 1,
    name: "Total Contributors",
    number: 700,
    path: "/editor-dashboard/total-contributors",
  },
  {
    id: 2,
    name: "Approved Publications ",
    number: 160,
    path: "/editor-dashboard/approved-publications",
  },
  {
    id: 3,
    name: "Reviewed Publications",
    number: 165,
    path: "/editor-dashboard/reviewed-publications",
  },
  {
    id: 4,
    name: "Pending  Publications",
    number: 5,
    path: "/editor-dashboard/pending-publications",
  },
  {
    id: 5,
    name: "Top Contributors",
    number: 56,
    path: "/editor-dashboard/top-contributors",
  },
  {
    id: 6,
    name: "Total Publications",
    number: 400,
    path: "/editor-dashboard/total-publications",
  },
];

export const editorSideBarItems = [
  {
    id: 1,
    name: "No. of Contributors",
    image: iconTwo,
    path: "/editor-dashboard/total-contributors",
  },
  {
    id: 2,
    name: "Approved Publications",
    image: iconThree,
    path: "/editor-dashboard/approved-publications",
  },
  {
    id: 3,
    name: "Reviewed Publications",
    image: iconOne,
    path: "/editor-dashboard/reviewed-publications",
  },
  {
    id: 4,
    name: "Pending  Publications",
    image: iconFive,
    path: "/editor-dashboard/pending-publications",
  },
  {
    id: 5,
    name: "Total Publications",
    image: iconFour,
    path: "/editor-dashboard/total-publications",
  },
];

export const contributorDashboard = [
  {
    id: 1,
    name: "Total Published",
    number: 700,
    path: "/contributor-dashboard",
  },
  {
    id: 2,
    name: "Submitted Publication",
    number: 600,
    path: "/contributor-dashboard/submitted-publications",
  },
  {
    id: 3,
    name: "Rejected Publication",
    number: 200,
    path: "/contributor-dashboard/unapproved-publications",
  },
  {
    id: 4,
    name: "Approved Publication",
    number: 400,
    path: "/contributor-dashboard/approved-publications",
  },
  {
    id: 5,
    name: "Bookmarks",
    number: 156,
    path: "/contributor-dashboard/bookmarks",
  },
];

export const contributorSideBarItems = [
  {
    id: 1,
    name: "Total Publications",
    image: iconFour,
    path: "/contributor-dashboard",
  },
  {
    id: 2,
    name: "Approved Publication",
    image: iconThree,
    path: "/contributor-dashboard/approved-publications",
  },
  {
    id: 3,
    name: "Submitted Publications",
    image: iconEight,
    path: "/contributor-dashboard/submitted-publications",
  },
  {
    id: 4,
    name: "Unapproved Publication",
    image: iconSeven,
    path: "/contributor-dashboard/unapproved-publications",
  },
  {
    id: 5,
    name: "Draft",
    image: iconSix,
    path: "/contributor-dashboard/drafts",
  },
];

export const dashboardSideBarItems = [
  {
    category: "User Management",
    items: [
      {
        id: 1,
        name: "Users",
        image: User,
        link: "/dashboard/manage-users",
      },
      {
        id: 11,
        name: "Subscription",
        // image: iconTwo,
        image: CreditCard,
        link: "/dashboard/subscription",
      },
    ],
    userRole: [userTypeObject.admin],
  },
  {
    category: "Publications",
    items: [
      {
        id: 2,
        name: "Drafts",
        // image: pending,
        image: FileText,
        link: "/dashboard/drafts",
      },
      {
        id: 1,
        name: "Pending",
        // image: pending,
        image: Hourglass,
        link: "/dashboard/pending",
      },
      {
        id: 5,
        name: "Total",
        // image: iconThree,
        image: Layers,
        link: "/dashboard/total",
      },
      {
        id: 4,
        name: "Rejected",
        // image: iconThree,
        image: Slash,
        link: "/dashboard/rejected",
      },
    ],
    userRole: [userTypeObject.admin, userTypeObject.editor],
  },
  {
    category: "Geographic Locations",
    items: [
      {
        id: 3,
        name: "Country",
        // image: state,
        image: Globe,
        link: "/dashboard/country",
      },
      {
        id: 7,
        name: "Region",
        // image: region,
        image: MapPin,
        link: "/dashboard/region",
      },
      {
        id: 4,
        name: "State",
        // image: state,
        image: Flag,
        link: "/dashboard/state",
      },
      {
        id: 5,
        name: "LGA",
        // image: lga,
        image: Building,
        link: "/dashboard/lga",
      },
      {
        id: 9,
        name: "Ward",
        // image: lga,
        image: MapPin,
        link: "/dashboard/ward",
      },
      {
        id: 10,
        name: "LCDA",
        // image: lga,
        image: Building2,
        link: "/dashboard/lcda",
      },
    ],
    userRole: [userTypeObject.admin, userTypeObject.editor],
  },
  {
    category: "Political Entities",
    items: [
      {
        id: 11,
        name: "Political Actors",
        // image: categoriesIcon,
        image: UserCheck,
        link: "/dashboard/political-actors",
      },
      {
        id: 12,
        name: "Political Parties",
        // image: categoriesIcon,
        image: Users,
        link: "/dashboard/political-parties",
      },
      {
        id: 2,
        name: "Categories",
        // image: categoriesIcon,
        image: Grid,
        link: "/dashboard/categories",
      },
    ],
    userRole: [userTypeObject.admin, userTypeObject.editor],
  },
  {
    category: "Miscellaneous",
    items: [
      {
        id: 6,
        name: "MDA",
        // image: mda,
        image: Briefcase,
        link: "/dashboard/mda",
      },
      {
        id: 13,
        name: "Tags",
        // image: lga,
        image: Tag,
        link: "/dashboard/tags",
      },
      {
        id: 8,
        name: "All inbox",
        // image: inbox,
        image: Inbox,
        link: "/dashboard/all-inbox",
      },
    ],
    userRole: [userTypeObject.admin, userTypeObject.editor],
  },
  {
    category: "Publications",
    items: [
      {
        id: 13,
        name: "Total",
        image: lga,
        link: "/dashboard/total",
      },
      {
        id: 8,
        name: "Pending",
        image: inbox,
        link: "/dashboard/pending",
      },
      {
        id: 8,
        name: "Rejected",
        image: inbox,
        link: "/dashboard/all-inbox",
      },
      {
        id: 8,
        name: "Approved",
        image: inbox,
        link: "/dashboard/all-inbox",
      },
      {
        id: 8,
        name: "Bookmarks",
        image: inbox,
        link: "/dashboard/all-inbox",
      },
    ],
    userRole: [userTypeObject.contributor],
  },
  {
    items: [
      {
        id: 6,
        name: "Users",
        image: mda,
        link: "/dashboard/corporate-users",
      },
      {
        id: 8,
        name: "Bookmarks",
        image: mda,
        link: "/dashboard/bookmarks",
      },
    ],
    userRole: [userTypeObject.organization],
  },
  {
    items: [
      {
        id: 12,
        name: "Bookmarks",
        image: mda,
        link: "/dashboard/bookmarks",
      },
      {
        id: 13,
        name: "Liked Articles",
        image: mda,
        link: "/dashboard/liked-articles",
      },
    ],
    userRole: [userTypeObject.user],
  },
];

export const avatarDropDown = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard/settings",
  },
  {
    id: 2,
    name: "Settings",
    link: "/dashboard/settings",
  },
  {
    id: 3,
    name: "Earnings",
    link: "/dashboard/settings",
  },
];

export const settingData = [
  {
    id: 1,
    name: "About",
    link: "/dashboard/settings",
  },
  {
    id: 2,
    name: " Change Password",
    link: "/dashboard/settings/change-password",
  },
  {
    id: 3,
    name: "Subscription",
    link: "/dashboard/settings/subscription",
  },
];

export const searchBarFilter = [
  {
    id: 1,
    name: "Ministries, Departments, Agencies (MDAs)",
  },
  {
    id: 2,
    name: "Political actors",
  },
  {
    id: 3,
    name: "State",
  },
  {
    id: 4,
    name: "Local Govt Area (LGA)",
  },
];

export const dummyPlans = [
  {
    id: 1,
    name: "2 team members",
    isActive: true,
  },
  {
    id: 2,
    name: "20GB Cloud storage",
    isActive: true,
  },
  {
    id: 3,
    name: "Integration help",
    isActive: true,
  },
  {
    id: 4,
    name: "Sketch Files",
    isActive: false,
  },
  {
    id: 5,
    name: "API Access",
    isActive: false,
  },
  {
    id: 6,
    name: "Complete documentation",
    isActive: false,
  },
  {
    id: 7,
    name: "24×7 phone & email support",
    isActive: false,
  },
];

<li className="flex line-through decoration-gray-500">
  <svg
    className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
  <span className="text-base font-normal leading-tight text-gray-500 ms-3">
    Sketch Files
  </span>
</li>;
