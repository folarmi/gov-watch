import { SidebarItemProp } from "../types/generalTypes";
import coatOfArms from "../../../public/coatOfArms.svg";
import iconOne from "../../../public/iconOne.svg";
import iconTwo from "../../../public/iconTwo.svg";
import iconThree from "../../../public/iconThree.svg";
import iconFour from "../../../public/iconFour.svg";
import iconFive from "../../../public/iconFive.svg";
import iconSix from "../../../public/iconSix.svg";
import iconSeven from "../../../public/iconSeven.svg";
import iconEight from "../../../public/iconEight.svg";
import categoriesIcon from "../../../public/categories.svg";
import state from "../../../public/state.svg";
import lga from "../../../public/lga.svg";
import mda from "../../../public/mda.svg";
import region from "../../../public/region.svg";
import inbox from "../../../public/inbox.svg";

export const SidebarList: SidebarItemProp[] = [
  {
    id: 1,
    name: "Latest Articles",
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
  {
    id: 4,
    name: "Sign up",
    url: "/signup",
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
    imageUrl: coatOfArms,
  },
  {
    section: "Companies",
    articleTitle: "Duis aute irure dolor",
    summary:
      "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    date: "12 Feb 2023",
    promise: false,
    imageUrl: coatOfArms,
  },
  {
    section: "Agencies",
    articleTitle: "Ut enim ad minim veniam",
    summary:
      "proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: "05 Dec 2022",
    promise: true,
    imageUrl: coatOfArms,
  },
  {
    section: "Organizations",
    articleTitle: "Ut enim ad minim veniam",
    summary:
      "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    date: "18 Mar 2024",
    promise: true,
    imageUrl: coatOfArms,
  },
  {
    section: "Companies",
    articleTitle: "Lorem ipsum dolor sit amet",
    summary: "consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    date: "30 Nov 2023",
    promise: false,
    imageUrl: coatOfArms,
  },
  {
    section: "Agencies",
    articleTitle: "Duis aute irure dolor in reprehenderit",
    summary: "voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    date: "08 Sep 2023",
    promise: true,
    imageUrl: coatOfArms,
  },
  {
    section: "Organizations",
    articleTitle: "Sed ut perspiciatis unde",
    summary: "omnis iste natus error sit voluptatem accusantium doloremque",
    date: "25 Apr 2023",
    promise: false,
    imageUrl: coatOfArms,
  },
  {
    section: "Companies",
    articleTitle: "At vero eos et accusamus",
    summary:
      "qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
    date: "10 Jul 2024",
    promise: true,
    imageUrl: coatOfArms,
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

export const customerDashboard = [
  {
    id: 1,
    name: "Total Read",
    number: 700,
  },
  {
    id: 2,
    name: "Total Liked Post",
    number: 156,
  },
  {
    id: 3,
    name: "Bookmarks",
    number: 400,
  },
];

export const editorDashboard = [
  {
    id: 1,
    name: "Total Contributors",
    number: 700,
  },
  {
    id: 2,
    name: "Approved Publications ",
    number: 160,
  },
  {
    id: 3,
    name: "Reviewed Publications",
    number: 165,
  },
  {
    id: 4,
    name: "Pending  Publications",
    number: 5,
  },
  {
    id: 5,
    name: "Top Contributors",
    number: 56,
  },
  {
    id: 6,
    name: "Total Publications",
    number: 400,
  },
];

export const editorSideBarItems = [
  {
    id: 1,
    name: "No. of Contributors",
    image: iconTwo,
  },
  {
    id: 2,
    name: "Approved Publications",
    image: iconThree,
  },
  {
    id: 3,
    name: "Reviewed Publications",
    image: iconOne,
  },
  {
    id: 4,
    name: "Pending  Publications",
    image: iconFive,
  },
  {
    id: 5,
    name: "Total Publications",
    image: iconFour,
  },
];

export const contributorDashboard = [
  {
    id: 1,
    name: "Total Published",
    number: 700,
  },
  {
    id: 2,
    name: "Submitted  Publication",
    number: 600,
  },
  {
    id: 3,
    name: "Rejected Publication",
    number: 200,
  },
  {
    id: 4,
    name: "Approved Publication",
    number: 400,
  },
  {
    id: 5,
    name: "Bookmarks",
    number: 156,
  },
];

export const contributorSideBarItems = [
  {
    id: 1,
    name: "Total Publications",
    image: iconFour,
  },
  {
    id: 2,
    name: "Approved Publication",
    image: iconThree,
  },
  {
    id: 3,
    name: "Submitted Publications",
    image: iconEight,
  },
  {
    id: 4,
    name: "Unapproved Publication",
    image: iconSeven,
  },
  {
    id: 5,
    name: "Draft",
    image: iconSix,
  },
];

export const adminDashboard = [
  {
    id: 1,
    name: "Top Engaged Post",
    number: 700,
  },
  {
    id: 2,
    name: "Total Publications",
    number: 160,
  },
  {
    id: 3,
    name: "Submitted Publication",
    number: 165,
  },
  {
    id: 4,
    name: "Pending Publication",
    number: 5,
  },
  {
    id: 5,
    name: "Bookmarks",
    number: 56,
  },
  {
    id: 6,
    name: "Total Users",
    number: 400,
  },
];

export const adminDashboardSideBarItems = [
  {
    id: 1,
    name: "Manage Users",
    image: iconTwo,
  },
  {
    id: 2,
    name: "Categories",
    image: categoriesIcon,
  },
  {
    id: 3,
    name: "State",
    image: state,
  },
  {
    id: 4,
    name: "LGA",
    image: lga,
  },
  {
    id: 5,
    name: "MDA",
    image: mda,
  },
  {
    id: 6,
    name: "Region",
    image: region,
  },
  {
    id: 7,
    name: "All inbox",
    image: inbox,
  },
];
