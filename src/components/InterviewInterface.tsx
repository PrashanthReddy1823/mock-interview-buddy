import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { sendMessageToAI } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { AudioRecorder } from "./AudioRecorder";

interface Message {
  type: "user" | "ai";
  content: string;
}

interface InterviewInterfaceProps {
  onStartInterview: () => void;
  isInterviewStarted: boolean;
  resume: File | null;
  jobDescription: File | null;
}

export const InterviewInterface = ({
  onStartInterview,
  isInterviewStarted,
  resume,
  jobDescription,
}: InterviewInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAudioRecorded = async (audioBlob: Blob) => {
    setIsLoading(true);

    try {
      // Create a File object from the Blob
      const audioFile = new File([audioBlob], "audio_message.wav", {
        type: "audio/wav",
      });

      // Add user message placeholder
      const userMessage: Message = {
        type: "user",
        content: "🎤 Voice message sent",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Get AI response
      const aiResponse = await sendMessageToAI(audioFile, resume, jobDescription);
      
      const aiMessage: Message = {
        type: "ai",
        content: aiResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process voice message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              ? "Interview in progress. Click the microphone button and speak your response."
              : "Ready to start your interview? Click the button below when you're ready."}
          </p>
        </div>

        {!isInterviewStarted ? (
          <Button
            onClick={onStartInterview}
            className="mx-auto flex items-center gap-2"
          >
            Start Interview
          </Button>
        ) : (
          <div className="space-y-6">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  Let's begin! Tell me about yourself.
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.type === "user"
                        ? "bg-primary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>

            <div className="flex justify-center pt-4">
              <AudioRecorder onRecordingComplete={handleAudioRecorded} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};