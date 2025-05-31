import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Bookmark Publications",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Setup Reminders",
    values: [true, true, true, true, true, true],
  },
  {
    label: "No Ads",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Comment on a post",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Content from country of origin",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Content from country of residence",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Content from country of residence",
    values: [true, true, true, true, true, true],
  },
  {
    label: "Change country of Residence once a year",
    values: [true, true, true, false, false, false],
  },
  {
    label: "Change country of interest anytime",
    values: [false, false, false, true, true, true],
  },
  {
    label: "Change country of residence anytime",
    values: [false, false, false, true, true, true],
  },
];

const planHeaders = [
  "Classic Monthly",
  "Classic Biannual",
  "Classic Yearly",
  "Global Monthly",
  "Global Biannual",
  "Global Yearly",
];

export const PricingComparisonTable = () => {
  return (
    <div className="overflow-x-auto mt-12">
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold">Features</th>
            {planHeaders.map((plan, i) => (
              <th key={i} className="p-3 font-semibold">
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-3 font-medium">{row.label}</td>

              {row.values.map((value, i) => (
                <td key={i} className="p-3 text-gray-700 text-center">
                  {value ? (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mx-auto">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mx-auto">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
