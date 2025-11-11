import MobileSidebar from "./MobileSidebar";
import Logo from "./Logo";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <div className="border-r border-(--border-gray-1) sticky top-0 h-screen flex flex-col">
      <MobileSidebar />
      <div className="hidden md:flex flex-col flex-1 w-[318px]">
        <Logo />
        <SidebarContent />
      </div>
    </div>
  );
}
