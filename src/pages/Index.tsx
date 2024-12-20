import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { InterviewPrep } from "@/components/InterviewPrep";
import { InterviewInterface } from "@/components/InterviewInterface";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<File | null>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const { toast } = useToast();

  const handleStartInterview = () => {
    if (!resume || !jobDescription) {
      toast({
        variant: "destructive",
        title: "Missing files",
        description: "Please upload both your resume and the job description before starting the interview.",
      });
      return;
    }
    setIsInterviewStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Interview Simulator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and job description, and practice your interview
            skills with our AI interviewer.
          </p>
        </div>

        {!isInterviewStarted && (
          <>
            <InterviewPrep />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <FileUpload type="resume" onFileUpload={setResume} />
              <FileUpload
                type="jobDescription"
                onFileUpload={setJobDescription}
              />
            </div>
          </>
        )}

        <InterviewInterface
          onStartInterview={handleStartInterview}
          isInterviewStarted={isInterviewStarted}
          resume={resume}
          jobDescription={jobDescription}
        />
      </div>
    </div>
  );
};

export default Index;