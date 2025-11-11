import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type DropdownProps = {
  label: string;
  icon?: string;
  closeIcon?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Dropdown({
  label,
  icon,
  closeIcon,
  children,
  defaultOpen = false,
}: DropdownProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between p-5 rounded-xl transition-all
          ${open ? "bg-[#243c7b] text-white" : "bg-white text-[#787486]"}
        `}
      >
        <div className="flex items-center gap-2">
          {open && closeIcon ? (
            <img src={`/${closeIcon}.png`} alt="" className="w-5 h-5" />
          ) : icon ? (
            <img src={`/${icon}.png`} alt="" className="w-5 h-5" />
          ) : null}

          <span className="font-medium text-sm">{label}</span>
        </div>

        <IoIosArrowDown
          className={`transition-transform duration-300 w-4 h-4 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className=" animate-fade">{children}</div>}
    </div>
  );
}
