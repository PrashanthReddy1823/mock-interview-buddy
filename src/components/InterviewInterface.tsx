import { Mic, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InterviewInterfaceProps {
  onStartInterview: () => void;
  isInterviewStarted: boolean;
}

export const InterviewInterface = ({
  onStartInterview,
  isInterviewStarted,
}: InterviewInterfaceProps) => {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-4xl p-8 bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <User2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">AI Interviewer</h2>
          <p className="text-gray-600 text-center max-w-md">
            {isInterviewStarted
              ? "Interview in progress. Speak clearly and take your time with responses."
              : "Ready to start your interview? Click the button below when you're ready."}
          </p>
        </div>

        {!isInterviewStarted ? (
          <Button
            onClick={onStartInterview}
            className="mx-auto flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Start Interview
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Recording...</span>
          </div>
        )}
      </Card>
    </div>
  );
};