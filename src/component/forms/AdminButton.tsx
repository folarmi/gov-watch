/* eslint-disable @typescript-eslint/no-explicit-any */

import { Loader2 } from "lucide-react";

type AdminButtonProp = {
  onClick?: any;
  buttonText: string;
  isLoading?: boolean;
};

const AdminButton = ({ onClick, buttonText, isLoading }: AdminButtonProp) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex items-center justify-center gap-2"
      disabled={isLoading} // Disable while loading to prevent multiple clicks
    >
      {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : buttonText}
    </button>
  );
};

export default AdminButton;
