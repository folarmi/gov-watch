// import { useState } from "react";
// import PricingCard from "../component/PricingCards";
// import { planTypes } from "../data";
import OuterPage from "../layouts/OuterPage";
import { PricingComparisonTable } from "../component/molecules/PricingComparisonTable";
import { PricingCardTwo } from "../component/molecules/PricingPageTwo";
import { pricingPlans } from "../data";

const Pricing = () => {
  // const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <OuterPage>
      {/* <div className="flex flex-col md:flex-row flex-wrap justify-center items-center"> */}
      {/* <div className="grid grid-cols-3 mx-auto w-[80%]">
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
      </div> */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing Plans</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {pricingPlans.map((plan, idx) => (
            <PricingCardTwo key={idx} {...plan} />
          ))}
        </div>

        <PricingComparisonTable />

        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md mt-6 text-sm">
          Please note: At the moment, all pricing and content are tailored
          specifically for Nigeria. We’re working to expand to more countries
          soon.
        </div>
      </div>
    </OuterPage>
  );
};

export { Pricing };
