import { useState } from "react";

interface NewsStep2Props {
  gallery: string[];
  setGallery: (val: string[]) => void;
}

export default function NewsStep2({ gallery, setGallery }: NewsStep2Props) {
  const [isUploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);

    const urls: string[] = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "naa_news");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpgn62ht7/image/upload",
        { method: "POST", body: data }
      );
      const result = await res.json();
      urls.push(result.secure_url);
    }

    setGallery([...gallery, ...urls]);
    setUploading(false);
  };

  const handleRemove = (url: string) => {
    setGallery(gallery.filter((img) => img !== url));
  };

  return (
    <div className="flex flex-col gap-5   p-5 ">
      <div className="border border-[#f0f0f0] rounded-[14px] h-[344px] p-5 gap-4 flex flex-col">
        <label>
          Gallery Images
          <p className="text-[14px] text-[#717182]">
            JPG/PNG, multiple allowed
          </p>
        </label>

        <label className="border border-[#f0f0f0] h-[249px] items-center  rounded-[14px] flex-col  flex justify-center cursor-pointer hover:bg-gray-50">
          <img src="/upload.png" className="w-9 h-9" />
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleUpload}
          />
          <span className="text-[14px] text-[#787486]">
            {" "}
            {isUploading ? "Uploading..." : "Upload an Image"}
          </span>
        </label>
      </div>

      <div className="flex gap-4">
        {gallery.map((url) => (
          <div key={url} className="relative  w-32 h-24 ">
            <img
              src={url}
              className=" object-cover rounded-lg border shadow-sm"
            />
            <button
              onClick={() => handleRemove(url)}
              className="absolute top-2 right-2 bg-white border text-red-600 rounded-full p-1"
            >
              <img src="/smalldelete.png" className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
