import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ChefHat, Sparkles } from "lucide-react";
import { Link } from "wouter";

interface InterviewQuestion {
  id: string;
  question: string;
  type: "single_choice" | "multiple_choice" | "text" | "number";
  options?: string[];
  required: boolean;
}

interface Interview {
  id: number;
  childId: number;
  conversationData: {
    questions: InterviewQuestion[];
    answers: Record<string, any>;
    currentQuestionIndex: number;
  };
  status: string;
}

export default function RecipeInterview() {
  const params = useParams();
  const childId = parseInt(params.childId);
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [currentAnswer, setCurrentAnswer] = useState("");

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: child } = useQuery({
    queryKey: [`/api/children/${childId}`],
    enabled: isAuthenticated && !isNaN(childId),
  });

  const { data: interview, refetch: refetchInterview } = useQuery({
    queryKey: [`/api/children/${childId}/interview`],
    enabled: false, // We'll trigger this manually
  });

  const startInterviewMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/children/${childId}/interview/start`);
      return response.json();
    },
    onSuccess: (data) => {
      // Interview started successfully
      refetchInterview();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to start interview. Please try again.",
        variant: "destructive",
      });
    },
  });

  const answerQuestionMutation = useMutation({
    mutationFn: async ({ interviewId, questionId, answer }: { interviewId: number; questionId: string; answer: any }) => {
      const response = await apiRequest("POST", `/api/interview/${interviewId}/answer`, {
        questionId,
        answer
      });
      return response.json();
    },
    onSuccess: () => {
      setCurrentAnswer("");
      refetchInterview();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    },
  });

  const completeInterviewMutation = useMutation({
    mutationFn: async (interviewId: number) => {
      const response = await apiRequest("POST", `/api/interview/${interviewId}/complete`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Recipe Created! 🎉",
        description: `${data.recipe.title} is ready for cooking!`,
      });
      // Redirect to dashboard or recipe view
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create recipe. Please try again.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (child && isAuthenticated) {
      startInterviewMutation.mutate();
    }
  }, [child, isAuthenticated]);

  if (isLoading || !child) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading interview...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-pink-500" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
                Preparing Your Recipe Interview...
              </h2>
              <p className="text-gray-600">
                Our AI is getting ready to create the perfect recipe for {child.name}!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { questions, answers, currentQuestionIndex } = interview.conversationData;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  const handleSubmitAnswer = () => {
    if (!currentAnswer && currentQuestion.required) {
      toast({
        title: "Answer Required",
        description: "Please provide an answer to continue.",
        variant: "destructive",
      });
      return;
    }

    if (isLastQuestion) {
      // Submit final answer and complete interview
      answerQuestionMutation.mutate({
        interviewId: interview.id,
        questionId: currentQuestion.id,
        answer: currentAnswer
      }, {
        onSuccess: () => {
          completeInterviewMutation.mutate(interview.id);
        }
      });
    } else {
      answerQuestionMutation.mutate({
        interviewId: interview.id,
        questionId: currentQuestion.id,
        answer: currentAnswer
      });
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
              Creating Your Perfect Recipe! 🍳
            </h2>
            <p className="text-gray-600 mb-8">
              Our AI chef is working on a special recipe just for {child.name}. This might take a moment...
            </p>
            <div className="animate-pulse flex justify-center">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 ${child.gender === 'girls' ? 'gradient-girls' : child.gender === 'boys' ? 'gradient-boys' : 'gradient-neutral'} rounded-full flex items-center justify-center`}>
              <span className="text-2xl">
                {child.gender === 'girls' ? '👧' : child.gender === 'boys' ? '👦' : '🌟'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-poppins font-bold text-gray-900">
                Recipe Interview for {child.name}
              </h1>
              <p className="text-gray-600">Age {child.age} • Let's create something delicious together!</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className={`${child.gender === 'girls' ? 'gradient-girls' : child.gender === 'boys' ? 'gradient-boys' : 'gradient-neutral'} text-white`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-poppins">CookingStory AI Chef</CardTitle>
                <p className="text-white/90 text-sm">Recipe Assistant</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h3>
              
              {currentQuestion.type === "single_choice" && currentQuestion.options && (
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={currentAnswer === option ? "default" : "outline"}
                      className={`justify-start text-left h-auto p-4 ${
                        currentAnswer === option 
                          ? child.gender === 'girls' 
                            ? 'bg-pink-500 hover:bg-pink-600' 
                            : 'bg-blue-500 hover:bg-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentAnswer(option)}
                    >
                      <span className="text-base">{option}</span>
                    </Button>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === "text" && (
                <textarea
                  className="w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us more..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                />
              )}
              
              {currentQuestion.type === "number" && (
                <input
                  type="number"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter a number..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                />
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {currentQuestion.required && (
                  <span>* This question is required</span>
                )}
              </div>
              
              <Button
                onClick={handleSubmitAnswer}
                disabled={answerQuestionMutation.isPending || completeInterviewMutation.isPending}
                className={`px-8 py-3 ${child.gender === 'girls' 
                  ? 'bg-pink-500 hover:bg-pink-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-semibold`}
              >
                {answerQuestionMutation.isPending || completeInterviewMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : isLastQuestion ? (
                  "Create My Recipe! 🍳"
                ) : (
                  "Next Question"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
