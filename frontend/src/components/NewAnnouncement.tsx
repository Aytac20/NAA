import { useState } from "react";
import NewsForm from "./NewsForm";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postsApi";

export default function NewAnnouncement() {
  const [openModal, setOpenModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <div className="w-full flex items-center justify-between pb-6">
      {/* Left Text */}
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-medium ">News & Announcements</p>
        <span className="text-sm text-[#787486]">{data?.length} Posts</span>
      </div>
     
      {/* Add Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 bg-[#243C7B] px-5 py-2 rounded-full text-white hover:bg-[#1F356E] transition-all"
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
          <img src="/plus.png" alt="Plus" className="w-3 h-3" />
        </span>
        <span className="text-sm font-medium leading-none whitespace-nowrap">
          Add News or Announcement
        </span>
      </button>

      {openModal && <NewsForm setOpenModal={setOpenModal} />}
    </div>
  );
}
