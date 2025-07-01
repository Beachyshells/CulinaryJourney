import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Heart, Printer } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Array<{
    item: string;
    amount: string;
    notes?: string;
  }>;
  instructions: Array<{
    step: number;
    instruction: string;
    tip?: string;
  }>;
  cookingTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  ageWhenMade: number;
  childMemory?: string;
  templateType: string;
  imageUrl?: string;
  isFavorite: boolean;
  isPrinted: boolean;
}

interface Child {
  id: number;
  name: string;
  age: number;
  gender: "girls" | "boys";
}

interface RecipeCardProps {
  recipe: Recipe;
  child: Child;
  className?: string;
}

export default function RecipeCard({ recipe, child, className = "" }: RecipeCardProps) {
  const { toast } = useToast();
  const isGirlsTheme = child.gender === "girls";

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/recipes/${recipe.id}/favorite`, {
        isFavorite: !recipe.isFavorite
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/children"] });
      queryClient.invalidateQueries({ queryKey: [`/api/children/${child.id}/recipes`] });
      toast({
        title: recipe.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: `${recipe.title} has been ${recipe.isFavorite ? "removed from" : "added to"} your favorites.`,
      });
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
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className={`recipe-card shadow-lg overflow-hidden border-2 ${isGirlsTheme ? 'border-pink-100' : 'border-blue-100'} ${className}`}>
      {/* Header */}
      <div className={`${isGirlsTheme ? 'gradient-girls' : 'gradient-boys'} p-6 text-white`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-poppins font-bold">{recipe.title}</h3>
            <p className={`${isGirlsTheme ? 'text-pink-100' : 'text-blue-100'}`}>
              {recipe.description}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
              <p className="text-sm">Age: {recipe.ageWhenMade}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.cookingTime} mins
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Serves 4
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
          </span>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Recipe Image */}
        {recipe.imageUrl && (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-48 object-cover rounded-lg mb-6" 
          />
        )}

        {/* Ingredients and Instructions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-poppins font-semibold text-gray-900 mb-3">Ingredients</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  • {ingredient.amount} {ingredient.item}
                  {ingredient.notes && (
                    <span className="text-gray-500 italic"> ({ingredient.notes})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-gray-900 mb-3">Instructions</h4>
            <ol className="text-sm space-y-2 text-gray-700">
              {recipe.instructions.map((instruction) => (
                <li key={instruction.step} className="flex items-start">
                  <span className={`${isGirlsTheme ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'} rounded-full w-5 h-5 inline-flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5`}>
                    {instruction.step}
                  </span>
                  <div>
                    {instruction.instruction}
                    {instruction.tip && (
                      <div className="text-gray-500 italic text-xs mt-1">
                        💡 {instruction.tip}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Child Memory */}
        {recipe.childMemory && (
          <div className={`mt-6 p-4 ${isGirlsTheme ? 'bg-pink-50' : 'bg-blue-50'} rounded-lg`}>
            <h5 className={`font-semibold ${isGirlsTheme ? 'text-pink-600' : 'text-blue-600'} mb-2`}>
              {child.name}'s Cooking Memory
            </h5>
            <p className="text-sm text-gray-700">
              "{recipe.childMemory}" - {child.name}, Age {recipe.ageWhenMade}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavoriteMutation.mutate()}
            disabled={toggleFavoriteMutation.isPending}
            className={`${recipe.isFavorite ? (isGirlsTheme ? 'text-pink-500' : 'text-blue-500') : 'text-gray-400'} hover:${isGirlsTheme ? 'text-pink-600' : 'text-blue-600'}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${recipe.isFavorite ? 'fill-current' : ''}`} />
            {recipe.isFavorite ? 'Favorited' : 'Add to Favorites'}
          </Button>

          <Button
            onClick={handlePrint}
            className={`${isGirlsTheme ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Recipe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
