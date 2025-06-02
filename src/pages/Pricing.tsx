import { useState } from "react";
// import PricingCard from "../component/PricingCards";
// import { planTypes } from "../data";
import OuterPage from "../layouts/OuterPage";
import { PricingComparisonTable } from "../component/molecules/PricingComparisonTable";
import { pricingPlans } from "../data";
import { PricingCard } from "../component/PricingCards";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <OuterPage>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing Plans</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {pricingPlans.map((plan, idx) => (
            <div className="" onClick={() => setSelectedPlan(plan.title)}>
              <PricingCard key={idx} {...plan} selectedPlan={selectedPlan} />
            </div>
          ))}
        </div>

        <PricingComparisonTable />

        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md mt-6 text-sm">
          Disclaimer: At the moment, all pricing and content are tailored
          specifically for Nigeria. We are working to expand to more countries
          soon and your global plan subscription can help to determine which
          countries we prioritize in our expansion.
        </div>
      </div>
    </OuterPage>
  );
};

export { Pricing };
