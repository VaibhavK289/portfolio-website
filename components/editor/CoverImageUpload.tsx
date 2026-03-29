"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [handleUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    } else {
      setError("Please drop a valid image file.");
    }
  }, [handleUpload]);

  const handleRemove = useCallback(() => {
    onChange("");
    setError("");
  }, [onChange]);

  // Preview mode — show the uploaded image
  if (value) {
    return (
      <div className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
        <div className="relative aspect-[21/9] md:aspect-[3/1] max-h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          title="Remove cover image"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-3 left-3 text-xs text-white/70 font-medium bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
          Cover Image
        </div>
      </div>
    );
  }

  // Upload zone
  return (
    <div className="space-y-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200
          flex flex-col items-center justify-center gap-3 py-10 px-6
          ${isDragging
            ? "border-primary-500 bg-primary-500/5 scale-[1.01]"
            : "border-neutral-700 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-900/80"
          }
          ${isUploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-8 h-8 text-primary-400 animate-spin" />
            <span className="text-sm text-neutral-400">Uploading...</span>
          </>
        ) : (
          <>
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-colors
              ${isDragging ? "bg-primary-500/10 text-primary-400" : "bg-neutral-800 text-neutral-400"}
            `}>
              {isDragging ? (
                <Upload className="w-6 h-6" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-300">
                {isDragging ? "Drop image here" : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                JPEG, PNG, WebP, or GIF • Max 5MB
              </p>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-medium px-1">{error}</p>
      )}
    </div>
  );
}
