type Prop = {
  flagUrl: string;
  stateName: string;
};

const StateCard = ({ flagUrl, stateName }: Prop) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer p-3 flex items-center gap-3 mb-4">
      <img
        src={flagUrl}
        alt={`${stateName} flag`}
        className="w-10 h-10 object-cover rounded-md"
      />
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {stateName}
      </h3>
    </div>
  );
};

export { StateCard };
