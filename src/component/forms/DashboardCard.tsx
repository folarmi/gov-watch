type Prop = {
  icon: React.ElementType;
  name: string;
  count: number;
  iconColor: string;
  bgColor: string;
};
const DashboardCard = ({
  count,
  name,
  icon: Icon,
  iconColor,
  bgColor,
}: Prop) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
      <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
        <Icon className="w-6 h-6" style={{ color: iconColor }} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{name}</p>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
    </div>
  );
};

export { DashboardCard };
