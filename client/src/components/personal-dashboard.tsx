import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Calendar, Trophy, Heart, Printer, Plus } from "lucide-react";
import { Link } from "wouter";

interface Child {
  id: number;
  name: string;
  age: number;
  gender: string;
}

interface PersonalDashboardProps {
  children: Child[];
}

export default function PersonalDashboard({ children }: PersonalDashboardProps) {
  // For demo purposes, we'll show data for the first child or create sample data
  const primaryChild = children?.[0] || { name: "Emma", age: 8, gender: "girls" };

  return (
    <section id="dashboard" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            Your Cooking Journey
          </h2>
          <p className="text-lg text-gray-600">
            Track your child's culinary adventure and see their growth over time
          </p>
        </div>

        {/* Profile Header */}
        <Card className="shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
              alt="Young chef" 
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-200" 
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-poppins font-bold text-gray-900">{primaryChild.name}'s Recipe Book</h3>
              <p className="text-gray-600 mb-2">Started cooking at age 5 • Now {primaryChild.age} years old</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">42 Recipes</span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">3 Years Cooking</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Intermediate Chef</span>
              </div>
            </div>
            <div className="md:ml-auto">
              <Link href={children?.[0] ? `/interview/${children[0].id}` : "/"}>
                <Button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Recipe
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-pink-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">42</p>
                <p className="text-sm text-gray-600">Total Recipes</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Days Cooking</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Achievements</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">28</p>
                <p className="text-sm text-gray-600">Favorites</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recipe Timeline */}
        <Card className="shadow-lg p-8 mb-8">
          <h3 className="text-xl font-poppins font-bold text-gray-900 mb-6">Recent Cooking Adventures</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Chocolate chip cookies" 
                className="w-16 h-16 rounded-lg object-cover" 
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Chocolate Chip Cookies</h4>
                <p className="text-sm text-gray-600">Made on March 15, 2024 • Age 8</p>
                <p className="text-sm text-gray-500 mt-1">"I made these for Dad's birthday! He said they were perfect." - {primaryChild.name}</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Completed</span>
                <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1621996346565-e3dbc6d2c5f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Fresh pasta with vegetables" 
                className="w-16 h-16 rounded-lg object-cover" 
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Veggie Pasta Surprise</h4>
                <p className="text-sm text-gray-600">Made on March 12, 2024 • Age 8</p>
                <p className="text-sm text-gray-500 mt-1">"I learned how to use the pasta machine! So fun to make shapes." - {primaryChild.name}</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Completed</span>
                <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Decorated birthday cake" 
                className="w-16 h-16 rounded-lg object-cover" 
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Rainbow Birthday Cake</h4>
                <p className="text-sm text-gray-600">Made on March 8, 2024 • Age 8</p>
                <p className="text-sm text-gray-500 mt-1">"My first time making frosting! It was messy but so yummy." - {primaryChild.name}</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Completed</span>
                <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recipe Categories */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="p-6 shadow-sm">
            <h4 className="font-poppins font-semibold text-gray-900 mb-4">Breakfast Adventures</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rainbow Pancakes</span>
                <span className="text-xs text-pink-500">★ Favorite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Super Smoothie Bowl</span>
                <span className="text-xs text-gray-400">Age 7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Breakfast Burrito</span>
                <span className="text-xs text-gray-400">Age 8</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-pink-500 text-sm font-medium hover:text-pink-600">
              View All (8) →
            </Button>
          </Card>

          <Card className="p-6 shadow-sm">
            <h4 className="font-poppins font-semibold text-gray-900 mb-4">Sweet Treats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Chocolate Chip Cookies</span>
                <span className="text-xs text-pink-500">★ Favorite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rainbow Birthday Cake</span>
                <span className="text-xs text-gray-400">Age 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ice Cream Sundae</span>
                <span className="text-xs text-gray-400">Age 6</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-pink-500 text-sm font-medium hover:text-pink-600">
              View All (12) →
            </Button>
          </Card>

          <Card className="p-6 shadow-sm">
            <h4 className="font-poppins font-semibold text-gray-900 mb-4">Main Dishes</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Veggie Pasta Surprise</span>
                <span className="text-xs text-pink-500">★ Favorite</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mini Pizzas</span>
                <span className="text-xs text-gray-400">Age 7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taco Tuesday</span>
                <span className="text-xs text-gray-400">Age 8</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-pink-500 text-sm font-medium hover:text-pink-600">
              View All (15) →
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
