import React from "react";
import { useNavigate } from "react-router-dom";

interface SubscriptionInfoProps {
  isSubscribed: boolean;
  expirationDate: string;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  isSubscribed,
  expirationDate,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2">
          {isSubscribed ? "You're Subscribed! 🎉" : "Subscription Expired 😢"}
        </h1>

        {isSubscribed ? (
          <p className="text-green-600 text-lg">
            Your subscription is active until{" "}
            <span className="font-semibold">{expirationDate}</span>.
          </p>
        ) : (
          <p className="text-red-600 text-lg">
            Your subscription has expired. Please renew to continue.
          </p>
        )}

        <button
          onClick={() => navigate("/pricing")}
          className={`mt-6 px-6 py-2 rounded-lg text-white ${
            isSubscribed
              ? "bg-primary hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isSubscribed ? "Manage Subscription" : "Renew Now"}
        </button>
      </div>
    </div>
  );
};

export { SubscriptionInfo };
