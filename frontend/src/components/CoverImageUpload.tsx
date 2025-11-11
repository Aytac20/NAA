import { useState } from "react";

export default function CoverImageUpload({
  setImageUrl,
  currentImage,
}: {
  setImageUrl: (url: string) => void;
  currentImage: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "naa_news");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpgn62ht7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploaded = await res.json();
    setImageUrl(uploaded.secure_url);

    // **Save name too**
    setImageName(file.name);

    setLoading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[14px] text-[#6C6C6C]">Cover Image</label>

      {!currentImage ? (
        <label className="border border-[#f0f0f0] rounded-[14px] p-3 flex items-center justify-center text-[#8A8A8A] cursor-pointer shadow-xs gap-3 hover:bg-gray-50 transition w-full">
          <input type="file" className="hidden" onChange={handleFileUpload} />
          <img src="/image.png" className="w-[22px]" />
          {isLoading ? "Uploading..." : "Upload Cover Image"}
        </label>
      ) : (
        <div className="flex flex-col gap-2 w-fit">
          {/* Image Preview */}
          <img
            src={currentImage}
            className="w-32 h-24 object-cover rounded-xl border shadow-sm"
          />

          {/* Filename pill like screenshot */}
          <div className="flex items-center text-[14px] border w-[90%] border-[#3BB54A] text-[#3BB54A] px-1.5 py-0.5 rounded-full select-none gap-4">
            <span className="truncate max-w-[120px]">
              {imageName ? imageName : " Photo name"}
            </span>

            <button
              type="button"
              onClick={handleRemoveImage}
              className=" font-bold ml-2 hover:text-red-500 transition  "
            >
              <span className="h-4 w-4 bg-[#3BB54A] rounded-full text-white items-center flex justify-center pb-0.5">
                {" "}
                ×
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
