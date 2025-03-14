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
import { userTypeObject } from "../utils";
import {
  User,
  FileText,
  Hourglass,
  XCircleIcon,
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
  Check,
  BookMarkedIcon,
  Heart,
  Edit2,
  Shield,
  Trophy,
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
    url: "/privacy-policy",
  },
  {
    id: 2,
    name: "Cookies Policy",
    url: "/cookies-policy",
  },
  {
    id: 3,
    name: "Terms of use",
    url: "/terms-of-use",
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
        id: 15,
        name: "Dashboard",
        image: User,
        link: "/dashboard/analytics",
      },
      {
        id: 1,
        name: "Users",
        image: User,
        link: "/dashboard/manage-users",
      },
      {
        id: 11,
        name: "Subscription",
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
        image: FileText,
        link: "/dashboard/drafts",
      },
      {
        id: 1,
        name: "Pending",
        image: Hourglass,
        link: "/dashboard/pending",
      },
      {
        id: 5,
        name: "Published",
        image: Layers,
        link: "/dashboard/total",
      },
      {
        id: 4,
        name: "Rejected",
        image: XCircleIcon,
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
        image: Globe,
        link: "/dashboard/country",
      },
      {
        id: 7,
        name: "Region",
        image: MapPin,
        link: "/dashboard/region",
      },
      {
        id: 4,
        name: "State",
        image: Flag,
        link: "/dashboard/state",
      },
      {
        id: 5,
        name: "LGA",
        image: Building,
        link: "/dashboard/lga",
      },
      {
        id: 9,
        name: "Ward",
        image: MapPin,
        link: "/dashboard/ward",
      },
      {
        id: 10,
        name: "LCDA",
        image: Building2,
        link: "/dashboard/lcda",
      },
      {
        id: 30,
        name: "Senatorial Districts",
        image: Shield,
        link: "/dashboard/senatorial-districts",
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
        image: UserCheck,
        link: "/dashboard/political-actors",
      },
      {
        id: 12,
        name: "Political Parties",
        image: Users,
        link: "/dashboard/political-parties",
      },
      {
        id: 2,
        name: "Categories",
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
        image: Briefcase,
        link: "/dashboard/mda",
      },
      {
        id: 13,
        name: "Tags",
        image: Tag,
        link: "/dashboard/tags",
      },
      {
        id: 8,
        name: "Reminders",
        image: Inbox,
        link: "/dashboard/reminders",
      },
      {
        id: 17,
        name: "Leaderboard",
        image: Trophy,
        link: "/dashboard/contributor-leaderboard",
      },
    ],
    userRole: [userTypeObject.admin, userTypeObject.editor],
  },
  {
    category: "Publications",
    items: [
      {
        id: 16,
        name: "Dashboard",
        image: User,
        link: "/dashboard/analytics",
      },
      {
        id: 8,
        name: "Pending",
        image: Hourglass,
        link: "/dashboard/pending",
      },
      {
        id: 12,
        name: "Drafts",
        image: Edit2,
        link: "/dashboard/drafts",
      },
      {
        id: 9,
        name: "Rejected",
        image: XCircleIcon,
        link: "/dashboard/rejected",
      },
      {
        id: 10,
        name: "Approved",
        image: Check,
        link: "/dashboard/total",
      },
      {
        id: 11,
        name: "Bookmarks",
        image: BookMarkedIcon,
        link: "/dashboard/bookmarks",
      },
    ],
    userRole: [userTypeObject.contributor],
  },
  {
    items: [
      {
        id: 6,
        name: "Users",
        image: User,
        link: "/dashboard/corporate-users",
      },
      {
        id: 8,
        name: "Bookmarks",
        image: BookMarkedIcon,
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
        image: BookMarkedIcon,
        link: "/dashboard/bookmarks",
      },
      {
        id: 13,
        name: "Liked Articles",
        image: Heart,
        link: "/dashboard/liked-articles",
      },
    ],
    userRole: [userTypeObject.user],
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
  {
    id: 4,
    name: "Payment History",
    link: "/dashboard/settings/payment-history",
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
    name: "Bookmark publications",
    isActive: true,
  },
  {
    id: 2,
    name: "Setup Reminders",
    isActive: true,
  },
  {
    id: 3,
    name: "No Ads",
    isActive: true,
  },
  {
    id: 4,
    name: "Update comment on a post",
    isActive: true,
  },
  // {
  //   id: 5,
  //   name: "API Access",
  //   isActive: false,
  // },
  // {
  //   id: 6,
  //   name: "Complete documentation",
  //   isActive: false,
  // },
  // {
  //   id: 7,
  //   name: "24×7 phone & email support",
  //   isActive: false,
  // },
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

export const planTypes = [
  {
    id: 1,
    planName: "Monthly",
    amount: "1000",
  },
  {
    id: 2,
    planName: "Biannual",
    amount: "5800",
  },
  {
    id: 3,
    planName: "Yearly",
    amount: "11000",
  },
];

export const politicalLevelData = [
  {
    label: "Local",
    value: "local",
  },
  {
    label: "State",
    value: "state",
  },
  {
    label: "Federal",
    value: "federal",
  },
];

export const mobileStateData = [
  {
    id: 1,
    name: "Abia",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733422596/e3ff0781-0d07-4df4-8708-cede4368ba74.gif",
  },
  {
    id: 2,
    name: "Adamawa",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733423503/8c6d555b-ca2c-4a72-b7fa-9ae8693be319.png",
  },
  {
    id: 3,
    name: "Akwa Ibom",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733424515/00495c3d-baa5-44f8-bc95-3830b5aefa1f.svg",
  },
  {
    id: 4,
    name: "Anambra",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733424991/fbd9fcbc-551a-4dea-b1e3-0a4d7540d596.png",
  },
  {
    id: 5,
    name: "Bauchi",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733425400/0aa2727c-8ee4-4730-afc7-445812a8a248.png",
  },
  {
    id: 6,
    name: "Bayelsa",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733425774/fa6ad4db-f4db-477b-9f1a-382381a4165f.png",
  },
  {
    id: 7,
    name: "Benue",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733425988/9209758c-d530-482d-a197-441dd39f954b.png",
  },
  {
    id: 8,
    name: "Borno",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733426280/b6998d15-a4ba-4254-bb0a-12e519fc525d.gif",
  },
  {
    id: 9,
    name: "Cross River",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733426506/6487eec2-f97d-4fe0-ae4e-0fc8562d9c24.png",
  },
  {
    id: 10,
    name: "Delta",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733426768/5587578f-69a4-4cad-9d4c-cde9f1389b1c.gif",
  },
  {
    id: 11,
    name: "Ebonyi",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733426997/5713051a-5b45-44b2-96e1-24d5ae20ecd8.png",
  },
  {
    id: 12,
    name: "Edo",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733427293/8e0051d6-82b2-4b85-a56b-2e17ce7c28c7.png",
  },
  {
    id: 13,
    name: "Ekiti",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733469042/7f1a6caa-fa60-4589-9a5b-a1df73c5af50.gif",
  },
  {
    id: 14,
    name: "Enugu",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733474725/40a98ec0-14e3-4464-9c1c-69d361e7eaf7.png",
  },
  {
    id: 15,
    name: "Gombe",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733474876/583a2ca9-f0c5-42ea-bde3-41bd0c0732c3.png",
  },
  {
    id: 16,
    name: "Imo",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733475091/ae461bc8-bdb8-45ac-80d8-3e8f765124ce.png",
  },
  {
    id: 17,
    name: "Jigawa",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733475252/239e2ec0-c785-47c5-a907-ee2918f25cce.png",
  },
  {
    id: 18,
    name: "Kaduna",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733475428/83ffaa03-d8a2-4a3a-8eb9-21933f1fa771.png",
  },
  {
    id: 19,
    name: "Kano",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733475608/14aaf68c-64f5-4782-b534-b8408749dd3f.png",
  },
  {
    id: 20,
    name: "Katsina",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733475847/03089a59-0b11-49fb-92bb-a2bf8e35fc3d.png",
  },
  {
    id: 21,
    name: "Kebbi",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476014/fc022762-9f6f-48f5-8970-1f3c1079d79b.png",
  },
  {
    id: 22,
    name: "Kogi",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476129/b09f171f-23e1-443b-83d5-b078f1c39c0a.png",
  },
  {
    id: 23,
    name: "Kwara",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476244/e6cf402d-4da2-4442-837c-913cdff14e04.jpg",
  },
  {
    id: 24,
    name: "Lagos",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476368/f00e0fd9-caec-4f79-99e5-501aa3a82b89.png",
  },
  {
    id: 25,
    name: "Nasarawa",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476564/ff142d49-c9f8-4350-bfa1-976d0811de28.png",
  },
  {
    id: 26,
    name: "Niger",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476646/56ba8974-377a-4c76-92a3-70548f0b1aff.png",
  },
  {
    id: 27,
    name: "Ogun",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476854/7080fa63-54eb-4521-9f15-c334c2d8842f.jpg",
  },
  {
    id: 28,
    name: "Ondo",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733476955/7603b32d-d197-4282-8006-64f8ab594200.png",
  },
  {
    id: 29,
    name: "Osun",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733477378/8bdbf11a-6dd7-4ae4-8b99-d8ef4ac3f8e4.png",
  },
  {
    id: 30,
    name: "Oyo",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733477555/c980f2c4-8c6f-4245-bdbf-030cc25f3c36.png",
  },
  {
    id: 31,
    name: "Plateau",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733477693/25a7a217-f201-478d-a1f8-80f08c927cc2.jpg",
  },
  {
    id: 32,
    name: "Rivers",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733477841/33e281f7-d197-42d5-b036-d6134bda6891.png",
  },
  {
    id: 33,
    name: "Sokoto",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733477994/b5683479-d130-4091-a8dd-66f763071294.png",
  },
  {
    id: 34,
    name: "Taraba",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733478145/96b26ca0-da15-47ad-a804-94d704258839.png",
  },
  {
    id: 35,
    name: "Yobe",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733478278/a6204bf1-6571-4ac9-9f8d-506a3234f02b.png",
  },
  {
    id: 36,
    name: "Zamfara",
    image:
      "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1733478419/57dec115-025d-464a-bc7f-487e738fdc45.jpg",
  },
];
