import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { userProfileAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

type ImageMeta = {
  file: File;
  preview: string;
  title: string;
  tags: string;
  description: string;
  ownsRights: boolean;
};

type Props = {
  initialFiles: (File | { file: File; preview: string })[]; // ✅ Accept both formats
  onAddMore: () => void;
  onSubmitComplete: () => void;
};



export default function ImageMetaEditor({
  initialFiles,
  onAddMore,
  onSubmitComplete,
}: Props) {
  // ✅ Normalize initialFiles
  const normalizedFiles = initialFiles.map((f) =>
    f instanceof File ? { file: f, preview: URL.createObjectURL(f) } : f
  );

  const [images, setImages] = useState<ImageMeta[]>(
    normalizedFiles.map((f) => ({
      file: f.file,
      preview: f.preview,
      title: "",
      tags: "",
      description: "",
      ownsRights: false,
    }))
  );
// 👇 add dropzone logic for new files
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: "",
      tags: "",
      description: "",
      ownsRights: false,
    }));
    setImages((prev) => [...prev, ...newImages]); // ✅ append to existing
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const navigate = useNavigate();

  const handleFieldChange = (field: keyof ImageMeta, value: any) => {
    setImages((prev) => {
      const next = [...prev];
      next[selectedIndex] = { ...next[selectedIndex], [field]: value };
      return next;
    });
  };

  const handleTagInput = (value: string) => {
    //const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
    handleFieldChange("tags", value);
  };

  const handleDelete = () => {
    if (images.length <= 1) return;
    const next = [...images];
    next.splice(selectedIndex, 1);
    setImages(next);
    setSelectedIndex(0);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    images.forEach((img, idx) => {
      form.append("files", img.file, img.file.name);
       form.append(`meta[${idx}].Title`, img.title);
form.append(`meta[${idx}].Tags`, img.tags);
form.append(`meta[${idx}].Description`, img.description);
form.append(`meta[${idx}].OwnsRights`, String(img.ownsRights));
form.append(`meta[${idx}][width]`, String( "200"));
        form.append(`meta[${idx}][height]`, String("300"));
        form.append(`meta[${idx}][lowQuality]`, String(!!false));
    });

    try {
      const resp = await userProfileAPI.uploadImages(form);
            // const ok = resp && (resp.success === true || resp.status === "ok");
            // if (!ok) throw new Error(resp?.message || "Upload failed");
      console.log("✅ Upload successful");
      onSubmitComplete();
      navigate("/profile");
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  return (
    <div className="flex bg-white rounded-3xl p-6 gap-6 shadow-md">
      {/* LEFT SIDE — thumbnails + add */}
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.preview}
            alt={img.file.name}
            onClick={() => setSelectedIndex(i)}
            className={`w-24 h-24 rounded-lg object-cover cursor-pointer border-2 ${
              selectedIndex === i ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
        <div
  {...getRootProps()}
  className={`w-24 h-24 rounded-lg flex items-center justify-center border border-amber-100 transition-colors
    ${isDragActive ? "bg-blue-50 border-blue-400" : "bg-amber-50 hover:bg-amber-100"}
  `}
>
  <input {...getInputProps()} />
  <Plus className="text-gray-700" size={32} />
</div>
      </div>

      {/* MIDDLE — main image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={selectedImage.preview}
          alt={selectedImage.file.name}
          className="w-full max-h-[600px] object-cover rounded-2xl"
        />
      </div>

      {/* RIGHT SIDE — meta form */}
      <div className="flex flex-col flex-[0.7] gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Title</label>
          <input
            type="text"
            value={selectedImage.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2"
            placeholder="Enter title"
            style={{color:"black"}}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">Tags</label>
          <input
            type="text"
            value={selectedImage.tags}
            onChange={(e) => handleTagInput(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2"
            placeholder="Enter comma-separated tags"
            style={{color:"black"}}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Description (This is used to ease search.)
          </label>
          <textarea
            value={selectedImage.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 min-h-[120px]"
            placeholder="Describe"
            style={{color:"black"}}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={selectedImage.ownsRights}
            onChange={(e) => handleFieldChange("ownsRights", e.target.checked)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm text-gray-800">I own the rights of this image.</span>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
