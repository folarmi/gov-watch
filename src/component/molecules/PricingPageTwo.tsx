// components/PricingCard.tsx

type PricingCardProps = {
  title: string;
  price: string;
  frequency: string;
  emails: string;
  contacts: string;
  cta: string;
  isMostPopular?: boolean;
  isFree?: boolean;
};

export const PricingCardTwo = ({
  title,
  price,
  frequency,
  cta,
  isMostPopular,
  isFree,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col border rounded-xl p-6 shadow-sm bg-white ${
        isMostPopular ? "border-green-600 shadow-lg" : ""
      }`}
    >
      {isMostPopular && (
        <span className="text-xs text-white bg-green-600 w-fit px-2 py-1 rounded-full mb-3">
          Most popular
        </span>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="text-2xl font-bold mt-2">{price}</div>
      <p className="text-sm text-gray-500 mb-4">{frequency}</p>

      <button
        className={`mt-auto py-2 px-4 rounded-md font-medium ${
          isFree
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-primary text-white hover:bg-green-600"
        }`}
      >
        {cta}
      </button>
    </div>
  );
};
