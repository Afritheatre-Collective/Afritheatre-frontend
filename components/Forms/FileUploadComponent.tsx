import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TheatreFormData } from "@/types/theatre";

interface FileUploadComponentProps {
  formData: TheatreFormData;
  setFormData: React.Dispatch<React.SetStateAction<TheatreFormData>>;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div className="space-y-2">
      <Label className="font-bold">Upload Supporting Documents</Label>
      <Input
        type="file"
        multiple
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFormData((prev) => ({
              ...prev,
              files: [...prev.files, ...newFiles],
            }));
          }
        }}
      />
      {formData.files.length > 0 && (
        <div className="mt-2">
          <Label>Selected Files:</Label>
          <ul className="list-disc pl-5">
            {formData.files.map((file: File, index: number) => (
              <li key={index} className="flex items-center justify-between">
                <span>{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      files: prev.files.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
