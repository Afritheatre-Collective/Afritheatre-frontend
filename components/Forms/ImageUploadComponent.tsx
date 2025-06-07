"use client";

import { useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import Image from "next/image";

type ImageUploadProps = {
  onUploadSuccess: (fileUrl: string) => void;
  initialImageUrl?: string;
};

const ImageUploadComponent = ({
  onUploadSuccess,
  initialImageUrl,
}: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|png|jpg|gif|webp)/)) {
      toast.error("Please upload an image file (JPEG, PNG, JPG, GIF, WEBP)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setImageUrl(data.url);
      onUploadSuccess(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />

      <div
        onClick={triggerFileInput}
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isUploading
            ? "bg-gray-100 border-gray-300"
            : "bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400"
        }`}
      >
        {imageUrl ? (
          <>
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt="Uploaded venue"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
              <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
                Click to change image
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold text-blue-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {imageUrl && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate max-w-xs">
            {imageUrl.split("/").pop()}
          </p>
          <button
            type="button"
            onClick={() => {
              setImageUrl(null);
              onUploadSuccess("");
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
