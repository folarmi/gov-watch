import PricingCard from "../component/PricingCards";
import OuterPage from "../layouts/OuterPage";

const Pricing = () => {
  return (
    <OuterPage>
      <div className="flex flex-wrap justify-center items-center">
        <PricingCard planName="Monthly" amount="1000" />
        <PricingCard planName="Biannual" amount="5800" />
        <PricingCard planName="Yearly" amount="11000" />
      </div>
    </OuterPage>
  );
};

export { Pricing };
