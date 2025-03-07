
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 10 * 1024 * 1024, // 10MB default
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return false;
    }

    // Check file type
    const fileType = file.type.toLowerCase();
    const acceptedTypes = accept.split(",").map(type => {
      return type.trim().replace(".", "").toLowerCase();
    });

    const isValidType = acceptedTypes.some(type => {
      if (type === "pdf") return fileType === "application/pdf";
      if (type === "jpg" || type === "jpeg") return fileType === "image/jpeg";
      if (type === "png") return fileType === "image/png";
      return false;
    });

    if (!isValidType) {
      setError("Invalid file type. Please upload PDF, JPG, or PNG.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = (file: File) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onFileSelect(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setProgress(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? "border-apuntea-purple bg-apuntea-light"
              : "border-border hover:border-primary/50 hover:bg-accent/50"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-lg font-medium">
              Drop your file here or click to browse
            </div>
            <div className="text-sm text-muted-foreground">
              Support for PDF, JPG, PNG. Max size: {maxSize / (1024 * 1024)}MB
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="bg-accent p-2 rounded">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground truncate max-w-[200px]">
                  {selectedFile.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-sm text-destructive animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
