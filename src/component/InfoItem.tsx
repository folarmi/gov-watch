type InfoItemProps = {
  label: string;
  value?: string | null;
  isDate?: boolean;
};

const InfoItem = ({ label, value, isDate = false }: InfoItemProps) => {
  if (!value) return null;

  const formattedValue = isDate ? new Date(value).toLocaleDateString() : value;

  return (
    <div className="flex items-center">
      <span className="font-semibold text-gray-700">{label}:</span>
      <p className="ml-2 text-gray-600">{formattedValue}</p>
    </div>
  );
};

export { InfoItem };
