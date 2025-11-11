import { IoMdClose } from "react-icons/io";
import type { Post } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/postsApi";

interface DeleteModalProps {
  post?: Post | null;
  onClose: () => void;
}

export default function DeleteModal({ onClose, post }: DeleteModalProps) {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.04)] flex items-center justify-center z-50">
      <div className="bg-white md:w-[520px] w-[90%] rounded-2xl p-8 flex flex-col items-center gap-6">
        <button
          onClick={onClose}
          className="self-end text-[#666] hover:text-black"
        >
          <IoMdClose />
        </button>

        <div className="h-24 w-24 bg-[#FDEEEE] flex items-center justify-center rounded-full">
          <img src="/delete.png" alt="delete" className="h-[40px] w-[40px]" />
        </div>

        <div className="text-center max-w-[420px]">
          <h2 className="text-[22px] font-semibold text-[#1E1E1E] mb-2">
            Delete Post
          </h2>
          <p className="text-[15px] text-[#4F4F4F] leading-[22px]">
            Are you sure you want to delete —{" "}
            <i className="font-semibold">{post?.title}</i>?
          </p>
        </div>

        <div className="flex w-full gap-4 mt-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg border border-[#D8D8D8] text-[#1E1E1E] font-medium hover:bg-[#F5F5F5] transition"
          >
            No
          </button>

          <button
            onClick={() => post && deletePostMutation.mutate(post.id)}
            className="w-full py-3 rounded-lg bg-[#D82C2C] text-white font-medium hover:bg-[#C32626] transition"
            disabled={!post}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
