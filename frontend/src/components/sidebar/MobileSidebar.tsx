import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import Logo from "./Logo";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden  outline-none px-2 pt-7"
      >
        <IoMdMenu size={26} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40  z-40 md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-[#E6E6E6] z-50 transform transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Logo />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
