import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 no-print">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-gray-900 mb-6">
            Recipe Books That{' '}
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              Grow With Your Child
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create personalized recipe collections powered by AI. Tell your child's life story through food, 
            from their first cooking adventures at age 5 to culinary mastery as an adult.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition-colors"
            >
              Start Your Story
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-pink-500 hover:text-white transition-colors"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
