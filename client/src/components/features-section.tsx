import { UserPlus, Bot, Printer } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            How CookingStory Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform creates personalized recipe experiences that adapt to your child's age and interests
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">Create Profile</h3>
            <p className="text-gray-600">Set up your child's profile with age, preferences, and dietary needs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">AI Interview</h3>
            <p className="text-gray-600">Answer guided questions to create the perfect recipe for your child</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Printer className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-3">Print & Cook</h3>
            <p className="text-gray-600">Get beautifully designed recipe cards ready for the kitchen</p>
          </div>
        </div>

        {/* Theme Selection Demo */}
        <div className="bg-gray-100 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-poppins font-bold text-center mb-8">Choose Your Theme</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border-4 border-pink-200">
              <div className="gradient-girls rounded-lg p-4 mb-4">
                <h4 className="text-white font-poppins font-bold text-xl">Girls Edition</h4>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 bg-pink-500 rounded"></div>
                <div className="w-8 h-8 bg-pink-600 rounded"></div>
                <div className="w-8 h-8 bg-pink-400 rounded"></div>
              </div>
              <p className="text-sm text-gray-600">Warm pinks and purples with playful designs</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-4 border-blue-200">
              <div className="gradient-boys rounded-lg p-4 mb-4">
                <h4 className="text-white font-poppins font-bold text-xl">Boys Edition</h4>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
                <div className="w-8 h-8 bg-green-500 rounded"></div>
                <div className="w-8 h-8 bg-blue-400 rounded"></div>
              </div>
              <p className="text-sm text-gray-600">Cool blues and greens with adventurous themes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
