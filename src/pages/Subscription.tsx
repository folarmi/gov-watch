import moment from "moment";
import Loader from "../component/Loader";
import { useGetData } from "../hooks/apiCalls";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";
import { SubscriptionInfo } from "../utils/SubscriptionInfo";

const Subscription = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: userObject, isLoading } = useGetData({
    url: `Users/GetUserById?publicId=${userId}`,
    queryKey: ["GetUserDetails"],
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SettingsLayout>
          <div className="flex items-center">
            <SubscriptionInfo
              isSubscribed={userObject?.subscriptionStatus !== 0}
              expirationDate={moment(
                userObject?.subscriptionExpirationDate
              ).format("DD-MM-YYYY")}
            />
            {/* <PricingCard planName="Monthly" amount="1000" /> */}
          </div>
        </SettingsLayout>
      )}
    </>
  );
};

export { Subscription };
