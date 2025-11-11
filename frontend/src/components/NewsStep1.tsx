import TextEditor from "./text-editor/TextEditor";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
  UseFormTrigger,
} from "react-hook-form";
import CoverImageUpload from "./CoverImageUpload";
import type { CreatePost } from "./NewsForm";

interface Step1Props {
  register: UseFormRegister<CreatePost>;
  trigger: UseFormTrigger<CreatePost>;
  setValue: UseFormSetValue<CreatePost>;
  watch: UseFormWatch<CreatePost>;
  errors: FieldErrors<CreatePost>;
  next: () => void;
}

export default function NewsStep1({
  register,
  trigger,
  setValue,
  watch,
  errors,
  next,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Title */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[14px] text-[#374151]">Title</label>
        <input
          {...register("title")}
          type="text"
          placeholder="Enter title"
          className="border border-[#E6E6E6] rounded-[10px] p-3 outline-none focus:ring-1 focus:ring-[#243C7B] w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[14px] text-[#374151]">Slug</label>
        <input
          {...register("slug")}
          disabled
          className="border border-[#E6E6E6] bg-[#F8F8F8] rounded-[10px] p-3 text-[#AFAFAF] w-full"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5 w-full ">
        <label className="text-[14px] text-[#374151]">Category</label>

        <div className="flex flex-col sm:flex-row gap-2.5">
          {(["news", "announcement"] as const).map((t) => (
            <button
              type="button"
              key={t}
              className={`px-3.5 py-2 rounded-[20px] border flex items-center justify-center gap-1.5 w-full sm:w-auto ${
                watch("type") === t
                  ? "border-[#1447e6] text-[#1447e6]"
                  : "border-[#dcdcdc] text-[#888]"
              }`}
              onClick={() => setValue("type", t, { shouldValidate: true })}
            >
              <img
                src={t === "news" ? "/news.png" : "/anounce.png"}
                className="w-4"
              />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="text-red-500 text-sm">Please select a category.</p>
        )}
      </div>

      {/* Cover Image */}
      <CoverImageUpload
        setImageUrl={(url) =>
          setValue("coverImage", url, { shouldValidate: true })
        }
        currentImage={watch("coverImage")}
      />
      {errors.coverImage && (
        <p className="text-red-500 text-sm">Upload a cover image.</p>
      )}

      {/* Editor */}
      <div className="w-full ">
        <TextEditor
          value={watch("description")}
          onChange={(val) =>
            setValue("description", val || "", { shouldValidate: true })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required.</p>
        )}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={async () => {
          const valid = await trigger([
            "title",
            "slug",
            "description",
            "coverImage",
          ] as const);

          if (valid) next();
        }}
        className="w-full bg-[#243C7B] text-white py-3.5 rounded-[10px] text-[18px] font-medium hover:bg-[#1c3170] transition mb-6"
      >
        Next
      </button>
    </div>
  );
}
