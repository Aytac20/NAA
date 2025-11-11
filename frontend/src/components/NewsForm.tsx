import { useState } from "react";
import NewsStep1 from "./NewsStep1";
import NewsStep2 from "./NewsStep2";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost, updatePost } from "../api/postsApi";
import SuccessModal from "./SuccessModal";
import type { Post } from "../types";
import StepBar from "./StepBar";

interface NewsFormProps {
  setOpenModal: (value: boolean) => void;
  post?: Post | null;
}

const schema = z.object({
  title: z.string().min(3),
  slug: z.string(),
  type: z.enum(["news", "announcement"]),
  description: z.string().min(5),
  coverImage: z.string().min(1),
  gallery: z.array(z.string()).min(1, "Add at least one image."),
});

export type CreatePost = z.infer<typeof schema>;

export default function NewsForm({ setOpenModal, post }: NewsFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: post ? updatePost : addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsSuccessModalOpen(true);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreatePost>({
    resolver: zodResolver(schema),
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          type: post.type,
          description: post.description,
          coverImage: post.coverImage,
          gallery: post.gallery || [],
        }
      : {
          title: "",
          slug: "naa.edu/az",
          type: "news",
          description: "",
          coverImage: "",
          gallery: [],
        },
  });
  const onSubmit = (data: CreatePost) => {
    if (post) {
      mutation.mutate({
        ...post,
        ...data,
      });
    } else {
      mutation.mutate(data);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4  ">
        <div className="bg-white w-full max-w-[728px] h-[90%] rounded-2xl p-6 md:p-9 flex flex-col gap-6 relative overflow-y-auto">
          <div className="h-full flex flex-col ">
            {" "}
            <div className="flex items-center gap-2 py-2">
              <button className="flex items-center gap-2 border border-[#243C7B] rounded-full py-1 px-3 hover:border-[#243C7B] transition">
                <img src="/aze.png" alt="AZ" className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium">AZ</span>
              </button>

              <button className="flex items-center gap-2 border border-[#D9D9D9] rounded-full py-1 px-3 hover:border-[#243C7B] transition">
                <img src="/eng.png" alt="EN" className="w-5 h-5 rounded-full" />
                <span className="text-sm font-medium">EN</span>
              </button>
            </div>
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-4 text-[#666] hover:text-black"
            >
              ✕
            </button>
            <div className="flex items-center justify-between text-[28px] md:text-[28px]">
              <h2 className="text-3xl ">
                {post
                  ? "Edit News / Announcement"
                  : "Create News / Announcement"}
              </h2>
              <p className="text-[28px] ">
                <span className="text-[#243C7B]">{step}</span> /2
              </p>
            </div>
            <StepBar step={step} setStep={setStep} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full justify-between flex-col h-full"
            >
              {step === 1 && (
                <NewsStep1
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  trigger={trigger}
                  next={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <div className="h-full flex flex-col justify-between">
                  <NewsStep2
                    gallery={watch("gallery")}
                    setGallery={(val) => setValue("gallery", val)}
                  />

                  <div className="flex justify-between  text-[14px] border border-[#f0f0f0] p-6 rounded-xl ">
                    <button type="button" onClick={() => setOpenModal(false)}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#243c7b] px-8 py-3 rounded-lg text-white"
                    >
                      {post ? "Save Changes" : "Submit"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          onClose={() => {
            setIsSuccessModalOpen(false);
            setOpenModal(false); // ✅ burada bağlayırıq
          }}
        />
      )}
    </>
  );
}
