import Dropdown from "./Dropdown";

export default function SidebarContent() {
  return (
    <div className="flex flex-col flex-1 justify-between  ">
      {/* TOP SECTIONS */}
      <section className="mt-4 space-y-2 px-3">
        <Dropdown label="NAA Website" icon="home2" closeIcon="home1">
          <div className="mt-1  bg-white rounded-[12px] px-3  flex p-5 flex-col border gap-4 border-(--border-gray-1) text-sm text-[#787486] shadow-xs">
            <a className="hover:text-[#1F4189] py-1 cursor-pointer">Post</a>
            <a className="hover:text-[#1F4189] py-1 cursor-pointer">
              Media Library
            </a>
            <a className="hover:text-[#1F4189] py-1 cursor-pointer">
              System Settings
            </a>
          </div>
        </Dropdown>
        <Dropdown label="Library" icon="library"></Dropdown>
        <Dropdown label="Meteorology" icon="meteorology"></Dropdown>
        <Dropdown label="Museum" icon="museum"></Dropdown>
      </section>

      {/* BOTTOM */}
      <section className="px-3 flex flex-col gap-3 pb-4 border border-t border-(--border-gray-1) pt-6">
        <button className="flex items-center gap-2 text-sm hover:text-(--text-blue) rounded-lg transition-colors p-3 border border-(--border-gray-1)">
          <img src="/settings.png" width={18} height={18} alt="settings" />
          <span className="text-[--text-gray-2]">Settings</span>
        </button>

        <div className="bg-(--bg-blue)  flex items-center gap-3 px-4 py-3 rounded-xl text-(--text-white)">
          <img
            src="/admin.png"
            alt="Admin"
            className="h-[38px] w-[38px] rounded-full object-cover"
          />

          <div className="flex flex-col ">
            <span className="text-[14px] font-medium leading-3.5">
              Khayal Ahmadli
            </span>
            <span className="text-[12px] font-normal text-(--text-gray-4)">
              khahmadli
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
