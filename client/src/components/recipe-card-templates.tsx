import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Printer } from "lucide-react";

export default function RecipeCardTemplates() {
  return (
    <section className="py-20 bg-white no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Beautiful Recipe Cards
          </h2>
          <p className="text-lg text-gray-600">
            Choose from multiple professionally designed templates, optimized for printing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Girls Template */}
          <Card className="recipe-card shadow-lg overflow-hidden border-2 border-pink-100">
            <div className="gradient-girls p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-poppins font-bold">Rainbow Pancakes</h3>
                  <p className="text-pink-100">Perfect for Sunday morning fun!</p>
                </div>
                <div className="text-right">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <p className="text-sm">Age: 6-8</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  20 mins
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Serves 4
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Beginner
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              <img 
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Colorful rainbow pancakes with berries" 
                className="w-full h-48 object-cover rounded-lg mb-6" 
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">Ingredients</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 2 cups flour</li>
                    <li>• 2 eggs</li>
                    <li>• 1½ cups milk</li>
                    <li>• Food coloring</li>
                    <li>• 2 tbsp sugar</li>
                    <li>• 1 tsp baking powder</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">Instructions</h4>
                  <ol className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-pink-100 text-pink-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">1</span>
                      Mix dry ingredients
                    </li>
                    <li className="flex items-start">
                      <span className="bg-pink-100 text-pink-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">2</span>
                      Add wet ingredients
                    </li>
                    <li className="flex items-start">
                      <span className="bg-pink-100 text-pink-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">3</span>
                      Divide into bowls
                    </li>
                    <li className="flex items-start">
                      <span className="bg-pink-100 text-pink-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">4</span>
                      Add different colors
                    </li>
                    <li className="flex items-start">
                      <span className="bg-pink-100 text-pink-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">5</span>
                      Cook and stack!
                    </li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                <h5 className="font-semibold text-pink-600 mb-2">Emma's Cooking Memory</h5>
                <p className="text-sm text-gray-700">
                  "Today I made rainbow pancakes for the first time! I mixed all the colors and Mom helped me flip them. The purple ones were my favorite! - Age 6, March 2024"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Boys Template */}
          <Card className="recipe-card shadow-lg overflow-hidden border-2 border-blue-100">
            <div className="gradient-boys p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-poppins font-bold">Super Hero Sandwiches</h3>
                  <p className="text-blue-100">Power-packed lunch adventure!</p>
                </div>
                <div className="text-right">
                  <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                    <p className="text-sm">Age: 7-10</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  15 mins
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Serves 2
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Easy
                </span>
              </div>
            </div>

            <CardContent className="p-6">
              <img 
                src="https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Creative sandwich with colorful ingredients" 
                className="w-full h-48 object-cover rounded-lg mb-6" 
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">Ingredients</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 4 slices bread</li>
                    <li>• Turkey slices</li>
                    <li>• Cheese slices</li>
                    <li>• Lettuce</li>
                    <li>• Tomatoes</li>
                    <li>• Mayo or mustard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">Instructions</h4>
                  <ol className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">1</span>
                      Toast the bread
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">2</span>
                      Spread the sauce
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">3</span>
                      Layer the ingredients
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">4</span>
                      Cut into fun shapes
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">5</span>
                      Enjoy your creation!
                    </li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-600 mb-2">Alex's Cooking Memory</h5>
                <p className="text-sm text-gray-700">
                  "I made super hero sandwiches and cut them with cookie cutters! Dad said they were the best lunch ever. I want to make them again tomorrow! - Age 8, March 2024"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            <Printer className="h-4 w-4 mr-2" />
            Print Recipe Cards
          </Button>
        </div>
      </div>
    </section>
  );
}
