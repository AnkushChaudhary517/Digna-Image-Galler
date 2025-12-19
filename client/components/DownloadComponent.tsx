import React, { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfileAPI } from "@/services/api";
import { useError } from "@/context/ErrorContext";

type SelectedFile = {
  file: File;
  preview: string;
  width?: number;
  height?: number;
  sizeKB: number;
  lowQuality?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onUploaded?: () => void;
};

export default function DownloadComponent({ open, onClose, onUploaded }: Props) {
  const { showError } = useError();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  if (!open) return null;

  const validateImage = (file: File): Promise<Partial<SelectedFile>> =>
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

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const arr = Array.from(files).slice(0, 20);
    const processed: SelectedFile[] = [];
    for (const f of arr) {
      const meta = await validateImage(f);
      processed.push({
        file: f,
        preview: (meta.preview as string) || URL.createObjectURL(f),
        width: meta.width,
        height: meta.height,
        sizeKB: meta.sizeKB || Math.round(f.size / 1024),
        lowQuality: meta.lowQuality,
      });
    }
    setSelectedFiles((p) => [...p, ...processed]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (i: number) => {
    setSelectedFiles((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[i].preview);
      next.splice(i, 1);
      return next;
    });
  };

  const handleCancel = () => {
    selectedFiles.forEach((s) => URL.revokeObjectURL(s.preview));
    setSelectedFiles([]);
    setUploadError(null);
    setUploadSuccess(null);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const form = new FormData();
      selectedFiles.forEach((s, idx) => {
        form.append("files", s.file, s.file.name);
        form.append(`meta[${idx}][width]`, String(s.width || 0));
        form.append(`meta[${idx}][height]`, String(s.height || 0));
        form.append(`meta[${idx}][lowQuality]`, String(!!s.lowQuality));
      });

      // Use the central api service for uploads
      const resp = await userProfileAPI.uploadImages(form);

      const ok = resp && (resp.success === true || resp.status === "ok");
      if (!ok) throw new Error(resp?.message || "Upload failed");

      setUploadSuccess("Uploaded successfully");
      handleCancel();
      onUploaded?.();
      // keep modal open briefly so user sees success, then close
      setTimeout(() => {
        setUploadSuccess(null);
        onClose();
      }, 900);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setUploadError(errorMessage);
      showError(
        err instanceof Error ? err : new Error(errorMessage),
        "Upload Error"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,6,23,0.5)",
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal
        style={{
          width: "min(920px, 96%)",
          maxHeight: "90vh",
          overflow: "auto",
          background: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(2,6,23,0.35)",
          padding: 20,
          position: "relative",
          zIndex:1000
        }}
      >
        <button
          onClick={() => {
            handleCancel();
            onClose();
          }}
          aria-label="Close"
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            background: "transparent",
            border: "none",
          }}
        >
          <X />
        </button>

        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#0C1633" }}>Upload Images</h3>
        <p style={{ marginTop: 6, marginBottom: 12, color: "#666" }}>
          Select multiple images. Low-quality images will be indicated but you may still upload them.
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            style={{ display: "none" }}
            id="download-component-file-input"
          />
          <label htmlFor="download-component-file-input" style={{ display: "inline-block" }}>
            <Button
              onClick={() => fileInputRef.current?.click()}
              style={{ backgroundColor: "#1E90FF", color: "#000", border: "none" }}
            >
              <Upload size={16} style={{ marginRight: 8 }} />
              Select files
            </Button>
          </label>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <Button 
              style={{
                backgroundColor: "#2B21DA",
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              onClick={handleCancel} 
              className="rounded-xl hover:bg-[#2319b5]"
            >
              Clear
            </Button>
            <Button 
              style={{
                backgroundColor: "#2B21DA",
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              onClick={handleSubmit} 
              disabled={uploading || selectedFiles.length === 0}
              className="rounded-xl hover:bg-[#2319b5] disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </div>

        {uploadError && <div style={{ color: "red", marginBottom: 8 }}>{uploadError}</div>}
        {uploadSuccess && <div style={{ color: "green", marginBottom: 8 }}>{uploadSuccess}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
          {selectedFiles.map((s, i) => (
            <div
              key={i}
              style={{
                background: "#FAFAFB",
                borderRadius: 8,
                padding: 8,
                display: "flex",
                gap: 8,
                alignItems: "center",
                border: "1px solid #F1F1F3",
              }}
            >
              <img src={s.preview} alt={s.file.name} style={{ width: 72, height: 56, objectFit: "cover", borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0C1633" }}>{s.file.name}</div>
                <div style={{ fontSize: 12, color: s.lowQuality ? "#D23" : "#666" }}>
                  {s.width && s.height ? `${s.width}×${s.height}px • ${s.sizeKB}KB` : `${s.sizeKB}KB`}
                  {s.lowQuality ? " • Low quality" : ""}
                </div>
              </div>
              <button onClick={() => handleRemove(i)} aria-label="Remove" style={{ background: "transparent", border: "none" }}>
                <X />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}