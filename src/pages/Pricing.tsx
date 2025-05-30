import { useState } from "react";
import PricingCard from "../component/PricingCards";
import { planTypes } from "../data";
import OuterPage from "../layouts/OuterPage";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <OuterPage>
      {/* <div className="flex flex-col md:flex-row flex-wrap justify-center items-center"> */}
      <div className="grid grid-cols-3 mx-auto w-[80%]">
        {planTypes?.map(({ amount, id, planName, features }) => {
          return (
            <div
              className="mr-0 md:mr-8 mt-8"
              key={id}
              onClick={() => setSelectedPlan(planName)}
            >
              <PricingCard
                planName={planName}
                amount={amount}
                selectedPlan={selectedPlan}
                features={features}
              />
            </div>
          );
        })}
      </div>
    </OuterPage>
  );
};

export { Pricing };
