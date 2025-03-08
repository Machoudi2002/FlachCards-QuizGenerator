import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ file, onFileChange }) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      onFileChange(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="flex flex-col items-center space-y-4">
        <label
          className={cn(
            "bg-card p-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-all w-full"
          )}
        >
          <Input type="file" accept="application/pdf" onChange={handleFileInputChange} className="hidden" />
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center">
            {file ? file.name : "Drag & drop a PDF or click to upload"}
          </p>
        </label>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
