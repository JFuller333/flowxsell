import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q2",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "Do all your ads, emails, and pages communicate the same core promise?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q3",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "When customers describe your product, do they use the same words you use in your marketing?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q4",
    section: "Alignment Flow (Brand & Market Fit)",
    text: "Does your offer connect emotionally—not just functionally—with your audience?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  // Conversion Flow
  {
    id: "q5",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Do your ad visuals and landing pages feel consistent in tone and message?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q6",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Is it clear what action a visitor should take on each page (only one primary CTA)?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q7",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Do most users reach checkout without confusion or extra clicks?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q8",
    section: "Conversion Flow (User Journey & Trust)",
    text: "Are testimonials, reviews, or social proof visible before the purchase decision?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  // Retention Flow
  {
    id: "q9",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do customers receive helpful or educational follow-ups after buying?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q10",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do you have automated re-engagement or refill flows in place?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q11",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Do customers have reasons to return (loyalty points, new drops, community, education)?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q12",
    section: "Retention Flow (Post-Purchase Experience)",
    text: "Is your repeat-purchase rate or subscription retention steadily improving?",
    options: [
      { label: "Yes", value: 1 },
      { label: "Unsure", value: 0.5 },
      { label: "No", value: 0 },
    ],
  },
];

const FlowXsellQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [webhookUrl] = useState("https://hooks.zapier.com/hooks/catch/25120721/uky71vx/");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentSection = currentQ?.section;

  const handleAnswer = (value: string) => {
    const numValue = parseFloat(value);
    setAnswers({ ...answers, [currentQ.id]: numValue });
  };

  const sendToZapier = async (webhookUrl: string, quizData: any) => {
    console.log("🚀 Starting webhook send...");
    console.log("📍 Webhook URL:", webhookUrl);
    console.log("📦 Quiz Data:", quizData);
    
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(quizData),
      });
      
      console.log("✅ Webhook request sent (no-cors mode, cannot verify status)");
      return true;
    } catch (error) {
      console.error("❌ Error sending to Zapier:", error);
      return false;
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmitToSheet = async () => {
    console.log("🎯 Submit button clicked");
    console.log("Email:", email);
    console.log("Webhook URL:", webhookUrl);
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSending(true);

    // Calculate scores by section
    const alignmentScore = questions
      .slice(0, 4)
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    
    const conversionScore = questions
      .slice(4, 8)
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    
    const retentionScore = questions
      .slice(8, 12)
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    const quizData = {
      email,
      timestamp: new Date().toISOString(),
      alignment_flow_score: alignmentScore,
      conversion_flow_score: conversionScore,
      retention_flow_score: retentionScore,
      total_score: alignmentScore + conversionScore + retentionScore,
      // Individual answers
      ...questions.reduce((acc, q, idx) => {
        const answer = answers[q.id];
        acc[`q${idx + 1}_answer`] = answer === 1 ? "Yes" : answer === 0.5 ? "Unsure" : "No";
        return acc;
      }, {} as Record<string, string>),
    };

    console.log("📤 Sending to Zapier...");
    const success = await sendToZapier(webhookUrl, quizData);
    
    setIsSending(false);

    if (success) {
      console.log("✅ Success response");
      toast.success("Response sent to Google Sheets!");
    } else {
      console.log("❌ Failed response");
      toast.error("Failed to send. Check your webhook URL.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = answers[currentQ?.id] !== undefined;

  // Calculate scores for results display
  const alignmentScore = questions
    .slice(0, 4)
    .reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  
  const conversionScore = questions
    .slice(4, 8)
    .reduce((sum, q) => sum + (answers[q.id] || 0), 0);
  
  const retentionScore = questions
    .slice(8, 12)
    .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

  const getHealthStatus = (score: number) => {
    if (score >= 3.5) return { label: "Excellent Flow", color: "text-green-500", bg: "bg-green-500/10" };
    if (score >= 2.5) return { label: "Good Flow", color: "text-yellow-500", bg: "bg-yellow-500/10" };
    if (score >= 1.5) return { label: "Needs Attention", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { label: "Major Flow Break", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const flowSections = [
    { name: "Alignment Flow", score: alignmentScore, description: "Brand & Market Fit" },
    { name: "Conversion Flow", score: conversionScore, description: "User Journey & Trust" },
    { name: "Retention Flow", score: retentionScore, description: "Post-Purchase Experience" },
  ];

  const primaryDisrupter = flowSections.reduce((min, flow) => 
    flow.score < min.score ? flow : min
  );

  // Email capture screen
  if (showEmailCapture) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative z-10 max-w-2xl w-full">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mb-4 mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold">Get Your Results</h2>
              <p className="text-muted-foreground">
                Enter your email to receive your Flow Health assessment
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitToSheet(); }} className="space-y-4 max-w-md mx-auto pt-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-primary/20 text-lg py-6"
                />
                
                <Button 
                  type="submit"
                  size="lg" 
                  variant="neon" 
                  className="w-full"
                  disabled={isSending || !email}
                >
                  {isSending ? "Submitting..." : "Submit Results"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground pt-4">
                We'll email you a detailed breakdown of your assessment
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        
        <div className="relative z-10 max-w-4xl w-full space-y-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 mb-4">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                
                <h2 className="text-4xl font-bold neon-text-glow">Your Flow Health Results</h2>
                
                <p className="text-lg text-muted-foreground mt-4">
                  Here's your personalized assessment across all three flows
                </p>
              </div>

              {/* Flow Scores */}
              <div className="space-y-6">
                {flowSections.map((flow) => {
                  const health = getHealthStatus(flow.score);
                  const percentage = (flow.score / 4) * 100;
                  
                  return (
                    <div key={flow.name} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{flow.name}</h3>
                          <p className="text-sm text-muted-foreground">{flow.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{flow.score.toFixed(1)}/4</div>
                          <div className={`text-sm font-medium ${health.color}`}>{health.label}</div>
                        </div>
                      </div>
                      
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Primary Disrupter */}
              <div className="border border-primary/30 rounded-lg p-6 bg-primary/5">
                <h3 className="text-lg font-semibold mb-2">🎯 Primary Flow Disrupter</h3>
                <p className="text-foreground/90">
                  <span className="font-bold text-primary">{primaryDisrupter.name}</span> scored lowest at {primaryDisrupter.score.toFixed(1)}/4. 
                  This is your biggest opportunity for improvement and should be your first priority.
                </p>
              </div>

              {/* Overall Interpretation */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">📊 Overall Flow Health</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><strong>4–5:</strong> Excellent - Flow is strong and automated; focus on optimization</p>
                  <p><strong>2.5–3.9:</strong> Moderate - Flow is partially aligned but inconsistent</p>
                  <p><strong>1–2.4:</strong> Disrupted - Flow breaks or misalignments are slowing growth</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="neon" 
                  onClick={() => setShowEmailCapture(true)}
                >
                  Continue to Submit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">
                    Return Home
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
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
