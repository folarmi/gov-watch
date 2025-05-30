import {
  globalSubscription,
  planTypes,
  standardSubscription,
} from "../../data";
import { SubscriptionFeatureList } from "./SubscriptionFeatureList";

const SubscriptionPlans = () => {
  // Find the plans by their names
  const classicMonthly = planTypes.find(
    (plan) => plan.planName === "Classic Monthly"
  );
  const classicBiannual = planTypes.find(
    (plan) => plan.planName === "Classic Biannual"
  );
  const classicYearly = planTypes.find(
    (plan) => plan.planName === "Classic Yearly"
  );
  const globalMonthly = planTypes.find(
    (plan) => plan.planName === "Global Monthly"
  );
  const globalBiannual = planTypes.find(
    (plan) => plan.planName === "Global Biannual"
  );
  const globalYearly = planTypes.find(
    (plan) => plan.planName === "Global Yearly"
  );

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Standard Subscription */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Standard Subscription</h2>
        <SubscriptionFeatureList features={standardSubscription} />

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span>Monthly</span>
            <span className="font-bold">₦{classicMonthly?.amount}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span>Biannual (6 months)</span>
            <span className="font-bold">₦{classicBiannual?.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Yearly</span>
            <span className="font-bold">₦{classicYearly?.amount}</span>
          </div>
        </div>
      </div>

      {/* Global Subscription */}
      <div className="border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Global Subscription</h2>
        <SubscriptionFeatureList features={globalSubscription} />

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span>Monthly</span>
            <span className="font-bold">₦{globalMonthly?.amount}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span>Biannual (6 months)</span>
            <span className="font-bold">₦{globalBiannual?.amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Yearly</span>
            <span className="font-bold">₦{globalYearly?.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SubscriptionPlans };
