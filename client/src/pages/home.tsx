import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, User, Trophy } from "lucide-react";
import { Link } from "wouter";
import ChildProfileForm from "@/components/child-profile-form";
import { useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showChildForm, setShowChildForm] = useState(false);

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

  const { data: children, isLoading: childrenLoading } = useQuery({
    queryKey: ["/api/children"],
    enabled: isAuthenticated,
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
    },
  });

  if (isLoading || childrenLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your cooking journey...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || "Chef"}! 👨‍🍳
          </h1>
          <p className="text-gray-600">
            Ready to create some delicious memories with your little chefs?
          </p>
        </div>

        {/* No Children State */}
        {!children || children.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-12 w-12 text-pink-500" />
              </div>
              <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-4">
                Let's Create Your First Child Profile
              </h2>
              <p className="text-gray-600 mb-8">
                Start your cooking journey by adding your little chef's profile. We'll create age-appropriate recipes just for them!
              </p>
              <Button 
                onClick={() => setShowChildForm(true)}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Child Profile
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Button 
                onClick={() => setShowChildForm(true)}
                className="h-auto p-6 bg-white hover:bg-gray-50 text-gray-900 border-2 border-dashed border-gray-300 hover:border-pink-300"
                variant="outline"
              >
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                  <div className="font-semibold">Add Child</div>
                  <div className="text-sm text-gray-500">Create new profile</div>
                </div>
              </Button>
              
              <Link href="/dashboard">
                <Button className="h-auto p-6 bg-blue-500 hover:bg-blue-600 text-white w-full">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2" />
                    <div className="font-semibold">View Dashboard</div>
                    <div className="text-sm opacity-90">Recipe collection</div>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Children Profiles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <Card key={child.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className={`${child.gender === 'girls' ? 'gradient-girls' : 'gradient-boys'} text-white rounded-t-lg`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-poppins">{child.name}</CardTitle>
                        <p className="text-white/90">Age {child.age}</p>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                        <p className="text-sm font-medium">
                          {child.gender === 'girls' ? '👧' : '👦'} {child.gender}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          12 recipes
                        </span>
                        <span className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          8 achievements
                        </span>
                      </div>
                    </div>
                    
                    {child.preferences && (
                      <p className="text-sm text-gray-600 mb-4">
                        Loves: {child.preferences}
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <Link href={`/interview/${child.id}`}>
                        <Button className={`flex-1 ${child.gender === 'girls' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                          <Plus className="h-4 w-4 mr-2" />
                          New Recipe
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button variant="outline" className="px-4">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Child Profile Form Modal */}
      {showChildForm && (
        <ChildProfileForm 
          onClose={() => setShowChildForm(false)}
          onSuccess={() => {
            setShowChildForm(false);
            // Refresh children list
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
