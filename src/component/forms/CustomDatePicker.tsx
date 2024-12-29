import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <label className="block text-gray-700 mb-2">Select a Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="border border-gray-300 rounded-lg px-4 py-2"
        useShortMonthInDropdown
      />
    </div>
  );
};

export { CustomDatePicker };
