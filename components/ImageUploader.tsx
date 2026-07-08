"use client";

import React, { useState, useRef } from "react";
import { Upload, X, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value?: string; // Stored image URL
  onChange: (url: string, fileId: string) => void;
  onRemove: () => void;
  label?: string;
  className?: string;
}

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  label = "Featured Image",
  className,
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract file ID from Google Drive URL if present
  const getFileIdFromUrl = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/[?&]id=([^&#]+)/);
    return match ? match[1] : null;
  };

  const oldFileId = value ? getFileIdFromUrl(value) : null;

  // Compress image helper using canvas
  const compressImage = (file: File): Promise<Blob | File> => {
    return new Promise((resolve) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        // SVG and GIFs do not get compressed
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Downscale high-res photos
          const MAX_WIDTH = 1400;
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob && blob.size < file.size) {
                  resolve(blob);
                } else {
                  resolve(file); // Keep original if compression is larger
                }
              },
              file.type,
              0.85 // 85% quality compress
            );
          } else {
            resolve(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const validateFile = (file: File): boolean => {
    setError(null);

    // 1. Validate File type
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension) || !ALLOWED_MIME_TYPES.includes(file.type)) {
      setError(`Invalid file type. Supported formats: ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()}`);
      return false;
    }

    // 2. Validate Size
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File size exceeds 10 MB limit. Uploaded size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      return false;
    }

    return true;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setLoading(true);
    setProgressText("Compressing...");
    setError(null);

    try {
      // 1. Client-side compression
      const processedBlob = await compressImage(file);
      const processedFile = new File([processedBlob], file.name, { type: file.type });

      setProgressText("Uploading to Google Drive...");
      const formData = new FormData();
      formData.append("file", processedFile);

      if (oldFileId) {
        formData.append("oldFileId", oldFileId);
      }

      // 2. Upload via Next.js API endpoint
      const response = await fetch("/api/google-drive/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image.");
      }

      onChange(data.publicUrl, data.fileId);
    } catch (err) {
      console.error(err);
      setError((err as { message?: string }).message || "An error occurred during file upload.");
    } finally {
      setLoading(false);
      setProgressText("");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleRemove = async () => {
    if (!oldFileId) {
      onRemove();
      return;
    }

    setLoading(true);
    setProgressText("Deleting from Google Drive...");
    setError(null);

    try {
      const response = await fetch("/api/google-drive/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: oldFileId }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete file.");
      }

      onRemove();
    } catch (err) {
      console.error(err);
      setError((err as { message?: string }).message || "Failed to remove image from cloud storage.");
    } finally {
      setLoading(false);
      setProgressText("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && <label className="text-xs font-black text-brand-navy-700 tracking-wide uppercase">{label}</label>}

      {value ? (
        /* Image Preview State */
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-brand-navy-100/80 group bg-brand-navy-50/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded featured asset preview"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />

          {/* Uploading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-brand-navy-950/70 flex flex-col items-center justify-center text-white text-xs gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-brand-accent-400" />
              <span className="font-bold">{progressText}</span>
            </div>
          )}

          {/* Action Overlay */}
          {!loading && (
            <div className="absolute inset-0 bg-brand-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-black hover:bg-red-700 transition-colors shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Dropzone Upload State */
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-3xl aspect-video cursor-pointer p-6 text-center transition-all duration-200 relative overflow-hidden",
            dragActive
              ? "border-brand-primary-600 bg-brand-primary-50/40 scale-[0.99]"
              : "border-brand-navy-200 bg-brand-navy-50/20 hover:bg-brand-navy-50/50 hover:border-brand-navy-300"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={ALLOWED_MIME_TYPES.join(",")}
            className="hidden"
            disabled={loading}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center text-brand-navy-600 gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-brand-primary-700" />
              <span className="text-sm font-bold">{progressText}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-navy-100/50 flex items-center justify-center text-brand-navy-600 shadow-inner">
                <Upload className="w-5 h-5 text-brand-navy-700" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-navy-900">
                  Drag and drop files here, or <span className="text-brand-primary-700 underline">browse</span>
                </p>
                <p className="text-xs text-brand-navy-500 mt-1">
                  Supports JPEG, PNG, WEBP, GIF, SVG (Max size: 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
