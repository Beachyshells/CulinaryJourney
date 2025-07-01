import { Bot, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AIInterviewDemo() {
  return (
    <section className="py-20 bg-gray-50 no-print">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            AI Recipe Interview
          </h2>
          <p className="text-lg text-gray-600">
            Our AI asks the right questions to create the perfect recipe for your child
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <CardTitle className="font-semibold">CookingStory AI</CardTitle>
                <p className="text-sm text-gray-500">Recipe Assistant</p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-pink-500" />
                </div>
                <div className="ml-3 bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hi! I'm excited to help create a recipe for Emma. Let's start with some questions!</p>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-pink-500" />
                </div>
                <div className="ml-3 bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">What type of meal are we making today?</p>
                  <div className="mt-2 space-y-1">
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      🥞 Breakfast
                    </Button>
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      🥪 Lunch
                    </Button>
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      🍽️ Dinner
                    </Button>
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      🧁 Dessert
                    </Button>
                  </div>
                </div>
              </div>

              {/* User Response */}
              <div className="flex items-start justify-end">
                <div className="mr-3 bg-pink-500 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-white">Breakfast please!</p>
                </div>
                <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-xs font-bold">E</span>
                </div>
              </div>

              {/* AI Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-pink-500" />
                </div>
                <div className="ml-3 bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Great choice! What's Emma's current cooking skill level?</p>
                  <div className="mt-2 space-y-1">
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      🌟 Beginner (5-7 years)
                    </Button>
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      ⭐ Intermediate (8-12 years)
                    </Button>
                    <Button variant="outline" size="sm" className="block w-full text-left justify-start h-auto py-1 px-3 text-xs">
                      ✨ Advanced (13+ years)
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                The AI will ask 5-7 personalized questions to create the perfect recipe
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
