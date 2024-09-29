import React, { ReactNode } from "react";
import { Header } from "../component/Header";
import { settingData } from "../data";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

interface LayoutProps {
  children: ReactNode;
}

const SettingsLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const userData = {
    name: "JANE DOE",
    role: "Contributor",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec tincidunt arcu. Pellentesque sodales purus sed nisi congue, non fermentum nisl consequat. Cras sollicitudin a nulla ut congue.",
    email: "janedoe@gmail.com",
    socialLink: "Janedoe/linkedin.com",
    residence: "Lagos",
    otherInfo: "I am a Lawyer.",
    profilePic: "https://via.placeholder.com/150",
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <div className="bg-white w-3/4 shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-32 bg-green_200">
            <div className="absolute inset-0 flex justify-center">
              <div className="relative -bottom-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="pt-12 pb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {userObject?.fullName}
            </h2>
            <p className="text-green-600">{userObject?.userRole}</p>
          </div>

          <div className="flex">
            <div className="w-1/4 p-6 border-r">
              {settingData.map(({ id, name, link }) => {
                return (
                  <div
                    className={`w-full whitespace-nowrap py-2 px-4 rounded ${pathName.startsWith(
                      link
                        ? "text-white hover:bg-green-600 bg-green-700"
                        : "text-gray-700 bg-gray-300 hover:bg-gray-400"
                    )}`}
                  >
                    <Link
                      to={link}
                      key={id}
                      //   className={`w-full whitespace-nowrap  py-2 px-4 rounded ${pathName.startsWith(
                      //     link
                      //       ? "text-white hover:bg-green-600 bg-green-700"
                      //       : "text-gray-700 bg-gray-300 hover:bg-gray-400"
                      //   )}`}
                    >
                      {name}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="w-3/4 p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsLayout };
