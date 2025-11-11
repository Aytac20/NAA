import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type FilterProps = {
  label?: string;
  children?: React.ReactNode;
  selected: string;
  defaultOpen?: boolean;
};

export default function Filter({
  label,
  selected,
  children,
  defaultOpen = false,
}: FilterProps) {
  const [open, setOpen] = useState(defaultOpen);

  function toggle() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="relative select-none">
      <button
        onClick={toggle}
        className="flex items-center justify-between border border-[#E4E4E7] rounded-xl px-3 py-2 w-[146px] text-[14px] font-medium bg-white"
      >
        <span className="text-(--text-black) font-medium">
          {selected || label}
        </span>

        <IoIosArrowDown
          className={`transition-transform duration-300 w-4 h-4 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-[110%] left-0 w-full bg-white rounded-xl shadow-md border border-[#E4E4E7] py-2 z-20 text-[#787486] text-[14px]">
          {children}
        </div>
      )}
    </div>
  );
}
