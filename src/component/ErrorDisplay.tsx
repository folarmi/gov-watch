import { toast } from "react-toastify";

interface Errors {
  [key: string]: string[];
}

const ErrorDisplay = ({ errors }: { errors: Errors }) => {
  return (
    <div>
      {Object.keys(errors).map((field) => (
        <div key={field} className="mb-4">
          <h4 className="font-semibold text-red-500">{field} Errors:</h4>
          <ul className="list-disc pl-5">
            {errors[field].map((error, index) => (
              <li key={index} className="text-red-500 text-sm">
                {/* {error} */}
                {toast.error(error)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay;
