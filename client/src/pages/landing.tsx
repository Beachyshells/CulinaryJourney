import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AIInterviewDemo from "@/components/ai-interview-demo";
import RecipeCardTemplates from "@/components/recipe-card-templates";
import PersonalDashboard from "@/components/personal-dashboard";
import SubscriptionPlans from "@/components/subscription-plans";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AIInterviewDemo />
      <RecipeCardTemplates />
      <PersonalDashboard />
      <SubscriptionPlans />
      <Footer />
    </div>
  );
}
