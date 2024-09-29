import { SettingsLayout } from "../layouts/SettingsLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const Setting = () => {
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

  console.log(userObject);

  return (
    <SettingsLayout>
      <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-green-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">BIO</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>
        </div>
        <p>{userData.bio}</p>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">DETAILS</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Email</span>
            <span>{userObject.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Social Media Link</span>
            <a href="#" className="text-green-600 hover:underline">
              {userData.socialLink}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">State of Residence</span>
            <span>{userData.residence}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Other Information</span>
            <span>{userData.otherInfo}</span>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export { Setting };
