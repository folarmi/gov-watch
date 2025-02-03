import Loader from "../component/Loader";
import PricingCard from "../component/PricingCards";
import { useGetData } from "../hooks/apiCalls";
import { SettingsLayout } from "../layouts/SettingsLayout";
import { useAppSelector } from "../lib/hook";
import { RootState } from "../lib/store";

const Subscription = () => {
  const { userId } = useAppSelector((state: RootState) => state.auth);

  const { data: userObject, isLoading } = useGetData({
    url: `Users/GetUserById?publicId=${userId}`,
    queryKey: ["GetUserDetails"],
  });

  console.log(userObject);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SettingsLayout>
          <div className="flex flex-wrap items-center">
            <PricingCard planName="Monthly" amount="1000" />
          </div>
        </SettingsLayout>
      )}
    </>
  );
};

export { Subscription };
