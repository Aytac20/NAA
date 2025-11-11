import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Option = {
  label: string;
  value: string;
  color: string;
};

type StatusSelectProps = {
  value: Option;
  onChange: (val: Option) => void;
  options: Option[];
};

export default function StatusSelect({
  value,
  onChange,
  options,
}: StatusSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-[146px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between border border-[#E4E4E7] rounded-xl px-3 py-2 w-full text-sm bg-white"
      >
        <span className="flex items-center gap-2">
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{ backgroundColor: value.color }}
          />
          {value.label}
        </span>

        <IoIosArrowDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 w-[146px] mt-1 bg-white rounded-[10px] shadow-lg border border-[#E4E4E7] py-2 z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50"
            >
              <span
                className="w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: opt.color }}
              />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
