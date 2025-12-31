import React, { useRef, useState, useCallback } from "react";
import { Upload as UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfileAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

type Props = {
  onUploadComplete: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // bytes
  acceptedFormats?: string[]; // mime types
  className?: string;
};

type FileMeta = {
  Tags?: string;
  Title?: string;
  Description?: string;
  Camera?: string;
  Aperture?: string;
  Location?: string;
  ISO?: string;
  CameraModel?: string;
  Photographer?: string;
  Focal?: string;
  RightsOwned?: boolean;
  PublishAndDistributePermission?: boolean;
};

type PendingFile = {
  file: File;
  preview: string;
  width?: number;
  height?: number;
  sizeKB: number;
  formatAllowed: boolean;
  sizeAllowed: boolean;
  lowQuality?: boolean;
  meta: FileMeta;
};

export default function UploadImages({
  onUploadComplete,
  maxFiles = 20,
  maxFileSize = 10 * 1024 * 1024,
  acceptedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const navigate = useNavigate();

  const openFilePicker = () => inputRef.current?.click();

  const inspectImage = (file: File): Promise<Partial<PendingFile>> =>
    new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        URL.revokeObjectURL(url);
        const sizeKB = Math.round(file.size / 1024);
        const lowQuality = width < 800 || height < 600 || sizeKB < 50;
        resolve({ preview: url, width, height, sizeKB, lowQuality });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ preview: url, sizeKB: Math.round(file.size / 1024), lowQuality: true });
      };
      img.src = url;
    });

  const handleFilesSelection = useCallback(
    async (list: FileList | null) => {
      setError(null);
      if (!list) return;
      const selected = Array.from(list);

      const room = Math.max(0, maxFiles - files.length);
      if (selected.length > room) {
        setError(`You can only add ${room} more file${room !== 1 ? "s" : ""}.`);
      }

      const slice = selected.slice(0, room);
      const processed: PendingFile[] = [];

      for (const f of slice) {
        const meta = await inspectImage(f);
        const formatAllowed = acceptedFormats.includes(f.type);
        const sizeAllowed = f.size <= maxFileSize;
        const sizeKB = Math.round(f.size / 1024);
        processed.push({
          file: f,
          preview: (meta.preview as string) || URL.createObjectURL(f),
          width: meta.width,
          height: meta.height,
          sizeKB,
          formatAllowed,
          sizeAllowed,
          lowQuality: meta.lowQuality,
          meta: {
            Title: f.name,
            Tags: "",
            Description: "",
            Camera: "",
            Aperture: "",
            Location: "",
            ISO: "",
            CameraModel: "",
            Photographer: "",
            Focal: "",
            RightsOwned: false,
            PublishAndDistributePermission: false,
          },
        });
      }

      setFiles((prev) => [...prev, ...processed]);
      if (inputRef.current) inputRef.current.value = "";
    },
    [acceptedFormats, files.length, maxFileSize, maxFiles]
  );

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelection(e.target.files);
  };

  const updateMeta = (index: number, key: keyof FileMeta, value: any) => {
    setFiles((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      next[index] = { ...next[index], meta: { ...next[index].meta, [key]: value } };
      return next;
    });
  };

  // Drag & drop handlers
  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((c) => c + 1);
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((c) => {
      const next = c - 1;
      if (next <= 0) {
        setIsDragActive(false);
        return 0;
      }
      return next;
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      e.dataTransfer!.dropEffect = "copy";
    } catch {}
    setIsDragActive(true);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setDragCounter(0);
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      handleFilesSelection(dt.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const next = [...prev];
      try {
        URL.revokeObjectURL(next[index].preview);
      } catch {}
      next.splice(index, 1);
      return next;
    });
  };

  const clearAll = () => {
    files.forEach((f) => {
      try {
        URL.revokeObjectURL(f.preview);
      } catch {}
    });
    setFiles([]);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccessMsg(null);

    if (files.length === 0) {
      setError("No files selected.");
      return;
    }

    const rejectedByFormat = files.filter((f) => !f.formatAllowed);
    const rejectedBySize = files.filter((f) => !f.sizeAllowed);

    if (rejectedByFormat.length > 0) {
      setError(`Some files have unsupported formats. They will still be attempted to upload.`);
    }

    if (rejectedBySize.length > 0) {
      setError((prev) =>
        prev ? prev + " Some files exceed max size and may be rejected by server." : "Some files exceed max size."
      );
    }

    setUploading(true);
    try {
      const form = new FormData();

      files.forEach((f, idx) => {
        form.append("files", f.file, f.file.name);

        // append meta fields matching backend FileMetaData property names
        const m = f.meta || {};
        form.append(`meta[${idx}].Tags`, m.Tags ?? "");
        form.append(`meta[${idx}].Title`, m.Title ?? f.file.name);
        form.append(`meta[${idx}].Description`, m.Description ?? "");
        form.append(`meta[${idx}].Camera`, m.Camera ?? "");
        form.append(`meta[${idx}].Aperture`, m.Aperture ?? "");
        form.append(`meta[${idx}].Location`, m.Location ?? "");
        form.append(`meta[${idx}].ISO`, m.ISO ?? "");
        form.append(`meta[${idx}].CameraModel`, m.CameraModel ?? "");
        form.append(`meta[${idx}].Photographer`, m.Photographer ?? "");
        form.append(`meta[${idx}].Focal`, m.Focal ?? "");
        form.append(`meta[${idx}].RightsOwned`, (m.RightsOwned ? "true" : "false"));
        form.append(
          `meta[${idx}].PublishAndDistributePermission`,
          (m.PublishAndDistributePermission ? "true" : "false")
        );
      });

      const resp = await userProfileAPI.uploadImages(form);

      // normalize response and treat HTTP-level success as success
      let ok = false;
      let body: any = null;
      if (resp instanceof Response) {
        ok = resp.ok;
        try {
          body = await resp.json();
        } catch {}
      } else if (resp && typeof resp === "object") {
        body = resp;
        ok = !!(resp.success === true || resp.status === "ok" || resp.status === 200);
        // fallback: treat object response as success if nothing indicates error
        if (!("success" in resp) && !("status" in resp) && !("error" in resp)) ok = true;
      } else if (resp) {
        ok = true;
      }

      if (!ok) {
        throw new Error(body?.message || "Upload failed");
      }

      // success: notify parent, clear, then navigate
      setSuccessMsg("Upload successful");
      const uploadedFiles = files.map((f) => f.file);
      clearAll();

      try {
        onUploadComplete(uploadedFiles);
      } catch {}

      // ensure redirect happens here immediately after successful upload
      try {
        navigate("/profile", { replace: true });
      } catch {}

      setTimeout(() => setSuccessMsg(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFilePicker();
        }}
        className={
          "border-dashed border-2 rounded-lg p-4 sm:p-6 md:p-8 flex flex-col gap-4 " +
          "transition-colors " +
          (isDragActive ? "border-primary/80 bg-primary/5" : "border-gray-200 bg-white") +
          " w-full min-h-[200px] sm:min-h-[240px]"
        }
        aria-label="File upload drop zone"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <h3 className="text-base sm:text-lg md:text-xl font-medium truncate mb-2" style={{ color: "#0C1633" }}>
              Select or drag images here
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              You can upload up to {maxFiles} images. Max size per file:{" "}
              {Math.round((maxFileSize / 1024 / 1024) * 100) / 100} MB.
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={openFilePicker} 
              style={{ 
                backgroundColor: "#2B21DA",
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-6"
            >
              <UploadIcon size={16} className="mr-2" />
              Select
            </Button>
            <Button 
              onClick={clearAll} 
              variant="ghost"
              className="flex-1 sm:flex-initial min-h-[44px] px-4 sm:px-6"
            >
              Clear
            </Button>
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {successMsg && <div className="text-sm text-green-700">{successMsg}</div>}

        {/* Preview + metadata editor */}
        {files.length > 0 && (
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            {files.map((f, i) => (
              <div key={i} className="bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                <div className="flex items-start gap-3 sm:gap-4">
                  <img src={f.preview} alt={f.file.name} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-black mb-1 break-words" style={{ color: "#0C1633" }}>{f.file.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-2">{f.width && f.height ? `${f.width}×${f.height}px • ${f.sizeKB}KB` : `${f.sizeKB}KB`}</div>
                    <div>
                      <button 
                        className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-medium min-h-[32px] px-2" 
                        onClick={() => removeFile(i)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 mb-1 block font-medium">Title</label>
                    <input
                      value={f.meta.Title}
                      onChange={(e) => updateMeta(i, "Title", e.target.value)}
                      className="block w-full border rounded-lg px-3 py-2 text-sm text-black min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Title"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm text-gray-600 mb-1 block font-medium">Photographer</label>
                    <input
                      value={f.meta.Photographer}
                      onChange={(e) => updateMeta(i, "Photographer", e.target.value)}
                      className="block w-full border rounded-lg px-3 py-2 text-sm text-black min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Photographer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1 block font-medium">Tags (comma separated)</label>
                    <input
                      value={f.meta.Tags}
                      onChange={(e) => updateMeta(i, "Tags", e.target.value)}
                      className="block w-full border rounded-lg px-3 py-2 text-sm text-black min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="tags, separated, by, comma"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs sm:text-sm text-gray-600 mb-1 block font-medium">Description</label>
                    <textarea
                      value={f.meta.Description}
                      onChange={(e) => updateMeta(i, "Description", e.target.value)}
                      className="block w-full border rounded-lg px-3 py-2 text-sm text-black min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                      rows={3}
                      placeholder="Short description"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:col-span-2">
                    <label className="inline-flex items-center text-xs sm:text-sm text-black cursor-pointer min-h-[44px]">
                      <input
                        type="checkbox"
                        checked={!!f.meta.RightsOwned}
                        onChange={(e) => updateMeta(i, "RightsOwned", e.target.checked)}
                        className="mr-2 w-4 h-4 cursor-pointer"
                      />
                      Rights owned
                    </label>

                    <label className="inline-flex items-center text-xs sm:text-sm text-black cursor-pointer min-h-[44px]">
                      <input
                        type="checkbox"
                        checked={!!f.meta.PublishAndDistributePermission}
                        onChange={(e) => updateMeta(i, "PublishAndDistributePermission", e.target.checked)}
                        className="mr-2 w-4 h-4 cursor-pointer"
                      />
                      Publish & distribute
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4 sm:mt-6">
          <Button 
            onClick={handleSubmit} 
            disabled={uploading || files.length === 0} 
            style={{ 
              backgroundColor: "#2B21DA",
              color: "#FFFFFF",
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "15px",
              lineHeight: "20px",
              fontWeight: 500,
            }}
            className="min-h-[44px] px-6 sm:px-8 w-full sm:w-auto rounded-xl hover:bg-[#2319b5] disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
}
