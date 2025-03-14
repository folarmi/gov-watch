import { Bell } from "lucide-react";

type Prop = {
  count: number;
};

const NotificationIcon = ({ count }: Prop) => {
  return (
    <div className="relative inline-block mr-4">
      <Bell size={36} />
      {count > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
          {count}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
