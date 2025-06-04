import { useState, useRef, ChangeEvent } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { X } from "lucide-react";

interface FileInputProps {
  id: string;
  name: string;
  onChange: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  error?: string;
}

export function FileInput({
  id,
  name,
  onChange,
  multiple = false,
  maxFiles = 5,
  accept,
  error,
}: FileInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const filesArray = Array.from(fileList);
    
    // Check if adding these files would exceed the max files limit
    if (multiple && selectedFiles.length + filesArray.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    // Update state
    const newFiles = multiple ? [...selectedFiles, ...filesArray] : filesArray;
    setSelectedFiles(newFiles);
    onChange(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
    
    // Reset the file input if all files are removed
    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <Input
          id={id}
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className={error ? "border-red-500" : ""}
        >
          {multiple ? "Select Files" : "Select File"}
        </Button>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm truncate max-w-xs">{file.name}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
