import { useState } from "react";
import PricingCard from "../component/PricingCards";
import { planTypes } from "../data";
import OuterPage from "../layouts/OuterPage";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <OuterPage>
      <div className="flex flex-col md:flex-row justify-center items-center">
        {planTypes?.map(({ amount, id, planName }) => {
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
              />
            </div>
          );
        })}
      </div>
    </OuterPage>
  );
};

export { Pricing };
