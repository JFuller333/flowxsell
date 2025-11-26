import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  text: string;
  section: string;
  options: { label: string; value: number }[];
}

const questions: Question[] = [
  // Alignment Flow
  {
    id: "q1",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "Can a first-time visitor instantly tell what problem your product solves?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q2",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "Do all your ads, emails, and pages communicate the same core promise?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q3",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "When customers describe your product, do they use the same words you use in your marketing?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q4",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "Does your offer connect emotionally—not just functionally—with your audience?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  // Conversion Flow
  {
    id: "q5",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Do your ad visuals and landing pages feel consistent in tone and message?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q6",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Is it clear what action a visitor should take on each page (only one primary CTA)?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
    ],
  },
  {
    id: "q7",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Do most users reach checkout without confusion or extra clicks?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
    ],
  },
  {
    id: "q8",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Are testimonials, reviews, or social proof visible before the purchase decision?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  // Retention Flow
  {
    id: "q9",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do customers receive helpful or educational follow-ups after buying?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q10",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do you have automated re-engagement or refill flows in place?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q11",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do customers have reasons to return (loyalty points, new drops, community, education)?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
  {
    id: "q12",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Is your repeat-purchase rate or subscription retention steadily improving?",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0.5 },
    ],
  },
];

const FlowXsellQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentSection = currentQ?.section;

  const handleAnswer = (value: string) => {
    const numValue = parseFloat(value);
    setAnswers({ ...answers, [currentQ.id]: numValue });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = answers[currentQ?.id] !== undefined;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <Card className="relative z-10 max-w-2xl w-full border-primary/20 bg-card/50 backdrop-blur-sm p-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-4xl font-bold neon-text-glow">Quiz Complete!</h2>
            
            <p className="text-lg text-muted-foreground">
              Thank you for completing the FlowXsell Business Quiz. Your responses have been recorded.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="neon" asChild>
                <Link to="/">
                  Return Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="relative z-10 max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              FlowXsell
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
            {currentSection}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right font-mono">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
              {currentQ.text}
            </h2>

            <RadioGroup
              value={answers[currentQ.id]?.toString()}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                  onClick={() => handleAnswer(option.value.toString())}
                >
                  <RadioGroupItem value={option.value.toString()} id={`${currentQ.id}-${option.value}`} />
                  <Label
                    htmlFor={`${currentQ.id}-${option.value}`}
                    className="flex-1 text-lg cursor-pointer group-hover:text-foreground transition-colors"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="group"
                variant={canProceed ? "default" : "outline"}
              >
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlowXsellQuiz;
