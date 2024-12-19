import { Lightbulb, Clock, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export const InterviewPrep = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <Lightbulb className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-2">Be Prepared</h3>
            <p className="text-sm text-gray-600">
              Review your resume and the job description thoroughly before starting
              the interview.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <Clock className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-2">Take Your Time</h3>
            <p className="text-sm text-gray-600">
              Think before answering. It's okay to take a moment to gather your
              thoughts.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <Target className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-2">Stay Focused</h3>
            <p className="text-sm text-gray-600">
              Maintain a professional demeanor and speak clearly during the
              interview.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};