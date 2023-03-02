import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../day-picker.css";
// https://react-day-picker.js.org
export default function DatePicker({ onSave }) {
  const [selected, setSelected] = useState(null);

  return (
    <DayPicker
      mode="single"
      styles={{
        months: { fontSize: "0.75rem", fontFamily: "Poppins" },
      }}
      selected={selected}
      onSelect={setSelected}
      footer={
        <div className="flex space-x-4">
          <button
            className="w-full bg-blue-600 text-white p-2 rounded"
            type="button"
            onClick={() => onSave(format(selected, "PP"))}
          >
            Save {selected ? `- ${format(selected, "PP")}` : null}
          </button>
          <button
            className="w-full bg-blue-600 text-white p-2 rounded"
            type="button"
            onClick={() => onSave(format(new Date(), "PP"))}
          >
            Today
          </button>
        </div>
      }
    />
  );
}
