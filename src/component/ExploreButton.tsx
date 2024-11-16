import { Link } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const ExploreButton: React.FC = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  return (
    <Link to="/explore" className="fixed bottom-0 right-0 mr-4 md:mr-16 mb-4">
      <button className="bg-primary text-xs md:text-base font-extrabold text-white p-3 md:p-5 rounded-lg md:rounded-[35px] shadow-lg flex items-center">
        Explore {userObject?.country !== "" ? userObject?.country : "Nigeria"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="white"
        >
          <path d="M8 4l8 8-8 8" />
        </svg>
      </button>
    </Link>
  );
};

export default ExploreButton;

// {
//   "publicId": "27546f65-1410-40a3-8587-0c11964984f6",
//   "firstName": "Admin",
//   "lastName": "Govwatch",
//   "fullName": "Admin Govwatch",
//   "email": "admin@govwatch.ng",
//   "bio": null,
//   "socialMediaLink": null,
//   "image": null,
//   "volunteeringCapacity": null,
//   "otherInformation": null,
//   "userRole": "Admin",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiI2MTgzMjNhYi0yOWRiLTQ5ZjEtYTU4NS1iOGI0NWJkOTIzNWMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdvdndhdGNoLm5nIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9wcmltYXJ5c2lkIjoiMjc1NDZmNjUtMTQxMC00MGEzLTg1ODctMGMxMTk2NDk4NGY2IiwiZXhwIjoxNzMxNzM5NDY2LCJpc3MiOiJodHRwczovL3d3dy5nb3Z3YXRjaC5uZy8iLCJhdWQiOiJodHRwczovL3d3dy5nb3Z3YXRjaC5uZy8ifQ.U4nJC4RZyhyHDIHZMZsEfsnG7iphWmdXLlHd8wVi6rA",
//   "validTo": "2024-11-16T06:44:26Z",
//   "isSubscribed": false,
//   "subscriptionDate": null,
//   "subscriptionExpirationDate": null,
//   "ward": null,
//   "lga": null,
//   "lcda": null,
//   "organizationName": null,
//   "isOrganization": false,
//   "state": null,
//   "country": "Nigeria",
//   "countryImage": "https://res.cloudinary.com/dk9i5q1bg/image/upload/v1731528807/3affccbf-11cc-4559-a389-64525ca60548.png",
//   "isStaff": true,
//   "isActiveStaff": true,
//   "isSuccessful": true,
//   "statusCode": 200,
//   "remark": "Login successful for Admin Govwatch at 11/16/2024 2:44:26 AM",
//   "totalCount": 1
// }
