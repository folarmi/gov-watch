import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../hooks/apiCalls";
import { useAppSelector } from "../../lib/hook";
import { RootState } from "../../lib/store";
import CustomButton from "../CustomButton";
import { directUserToPageOnLogin } from "../../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ApprovePublication = ({ toggleModal, getValues }: any) => {
  const navigate = useNavigate();
  const { userId, userType } = useAppSelector((state: RootState) => state.auth);
  const approvePublicationMutation = useCustomMutation({
    endpoint: "Publications/UpdatePublicationForAdmin",
    method: "put",
    successMessage: (data: any) => data?.remark,
    errorMessage: (error: any) =>
      error?.response?.data?.remark || error?.response?.data,
    onSuccessCallback: () => {
      navigate(directUserToPageOnLogin(userType));
    },
  });

  const approvePublicationFunction = () => {
    const latestData = getValues();

    const keysToDelete = [
      "isSuccessful",
      "statusCode",
      "remark",
      "totalCount",
      "region",
      "contributorFullName",
      "bio",
      "socialMediaLink",
      "contributorImage",
      "viewCount",
      "date",
    ];

    keysToDelete.forEach((key) => {
      delete latestData[key];
    });

    const data: any = {
      ...latestData,
      isApproval: true,
      lastModifiedBy: userId,
    };

    approvePublicationMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">
        Confirm Publication Approval
      </h2>
      <p className="text-sm mb-4">
        Are you sure you want to approve this publication?
      </p>

      <form className="flex items-center">
        <CustomButton
          className="w-fit mr-8"
          variant="secondary"
          onClick={toggleModal}
        >
          Cancel
        </CustomButton>
        <CustomButton
          loading={approvePublicationMutation.isPending}
          onClick={(e) => {
            e.preventDefault();
            approvePublicationFunction();
          }}
          className="w-fit"
        >
          Confirm
        </CustomButton>
      </form>
    </div>
  );
};

export default ApprovePublication;
