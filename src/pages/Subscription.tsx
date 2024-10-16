import PricingCard from "../component/PricingCards";
import { SettingsLayout } from "../layouts/SettingsLayout";

const Subscription = () => {
  return (
    <SettingsLayout>
      <div className="flex flex-wrap items-center">
        <PricingCard planName="Monthly" amount="1000" />
        <PricingCard planName="Biannual" amount="5800" />
        <PricingCard planName="Yearly" amount="11000" />
      </div>
    </SettingsLayout>
  );
};

export { Subscription };
