import { useState } from "react";
import { Upload, File, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  type: "resume" | "jobDescription";
  onFileUpload: (file: File) => void;
}

export const FileUpload = ({ type, onFileUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type === "application/msword" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
        onFileUpload(selectedFile);
        toast({
          title: "File uploaded successfully",
          description: `${selectedFile.name} has been uploaded.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <input
        type="file"
        id={`file-upload-${type}`}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
      <label
        htmlFor={`file-upload-${type}`}
        className="cursor-pointer flex flex-col items-center"
      >
        {file ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-600">{file.name}</span>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Upload your {type === "resume" ? "resume" : "job description"}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              PDF or Word documents only
            </span>
          </>
        )}
      </label>
    </div>
  );
};