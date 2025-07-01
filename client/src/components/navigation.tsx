import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <h1 className="text-2xl font-poppins font-bold text-gray-900">
                  <UtensilsCrossed className="inline h-6 w-6 text-pink-500 mr-2" />
                  CookingStory
                </h1>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/">
                    <a className="text-gray-900 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </a>
                  </Link>
                  <Link href="/dashboard">
                    <a className="text-gray-500 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </a>
                  </Link>
                  <div className="flex items-center space-x-4">
                    {user?.profileImageUrl && (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-600">
                      Hi, {user?.firstName || "Chef"}!
                    </span>
                    <Button 
                      onClick={() => window.location.href = "/api/logout"}
                      variant="outline"
                      className="text-sm"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <a href="#home" className="text-gray-900 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="#features" className="text-gray-500 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                    Features
                  </a>
                  <a href="#dashboard" className="text-gray-500 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </a>
                  <Button 
                    onClick={() => window.location.href = "/api/login"}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {isAuthenticated ? (
                <>
                  <Link href="/">
                    <a className="text-gray-900 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                      Home
                    </a>
                  </Link>
                  <Link href="/dashboard">
                    <a className="text-gray-500 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                      Dashboard
                    </a>
                  </Link>
                  <div className="px-3 py-2">
                    <span className="text-sm text-gray-600">
                      Hi, {user?.firstName || "Chef"}!
                    </span>
                  </div>
                  <Button 
                    onClick={() => window.location.href = "/api/logout"}
                    variant="outline"
                    className="mx-3 mb-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <a href="#home" className="text-gray-900 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                    Home
                  </a>
                  <a href="#features" className="text-gray-500 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                    Features
                  </a>
                  <a href="#dashboard" className="text-gray-500 hover:text-pink-500 block px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </a>
                  <Button 
                    onClick={() => window.location.href = "/api/login"}
                    className="bg-pink-500 text-white mx-3 mt-2"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
