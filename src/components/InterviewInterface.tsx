import { Mic, MicOff, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Message {
  type: "user" | "ai";
  content: string;
}

interface InterviewInterfaceProps {
  onStartInterview: () => void;
  isInterviewStarted: boolean;
}

export const InterviewInterface = ({
  onStartInterview,
  isInterviewStarted,
}: InterviewInterfaceProps) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    // This is where you'll later integrate the actual microphone handling
  };

  // Temporary function to simulate AI responses - will be replaced with actual AI integration
  const handleSendMessage = () => {
    if (isMicOn) {
      const userMessage: Message = {
        type: "user",
        content: "Your response has been recorded.",
      };
      const aiMessage: Message = {
        type: "ai",
        content: "Tell me about your experience with React development?",
      };
      setMessages((prev) => [...prev, userMessage, aiMessage]);
      setIsMicOn(false);
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
          <div className="space-y-6">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
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

            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isMicOn ? "destructive" : "default"}
                onClick={handleMicToggle}
                className="flex items-center gap-2"
              >
                {isMicOn ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Start Recording
                  </>
                )}
              </Button>
              {isMicOn && (
                <Button onClick={handleSendMessage} variant="outline">
                  Send Response
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};