import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function SubscriptionPlans() {
  return (
    <section className="py-20 bg-white no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            Flexible options to grow with your child's cooking journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Per Recipe Plan */}
          <Card className="rounded-2xl border-2 border-gray-200 p-8 hover:border-pink-200 transition-colors">
            <CardHeader className="text-center p-0 mb-6">
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 mb-2">
                Per Recipe
              </CardTitle>
              <p className="text-gray-600 mb-6">Perfect for trying us out</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$2.99</span>
                <span className="text-gray-600">/recipe</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Single recipe creation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">AI-powered interview</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Printable recipe card</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic templates</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                onClick={() => window.location.href = "/api/login"}
              >
                Try One Recipe
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Plan */}
          <Card className="rounded-2xl border-2 border-pink-500 p-8 relative transform lg:scale-105 shadow-lg">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center p-0 mb-6">
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 mb-2">
                Monthly Cookbook
              </CardTitle>
              <p className="text-gray-600 mb-6">Best for active young chefs</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$12.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited recipe creation</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Cooking journey tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Progress achievements</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Export recipe book</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                onClick={() => window.location.href = "/api/login"}
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className="rounded-2xl border-2 border-gray-200 p-8 hover:border-blue-200 transition-colors">
            <CardHeader className="text-center p-0 mb-6">
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 mb-2">
                Annual Cookbook
              </CardTitle>
              <p className="text-gray-600 mb-6">Best value for growing chefs</p>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">$99.99</span>
                <span className="text-gray-600">/year</span>
              </div>
              <p className="text-sm text-green-600 font-medium mb-4">Save $56 per year!</p>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Monthly</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Printed recipe book</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Custom themes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Family sharing</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                onClick={() => window.location.href = "/api/login"}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 7-day free trial • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </section>
  );
}
