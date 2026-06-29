import CreatorOnboarding from "@/components/CreatorOnBording";
import CustomerReviews from "@/components/CustomerReview";
import FeaturedPrompts from "@/components/FeatureCard";
import HeroBanner from "@/components/HeroBanner";
import LivePlayground from "@/components/LivePlayground";
import TopCreators from "@/components/TopCreator";
import WhyChooseUs from "@/components/WhyChoseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroBanner />
      <FeaturedPrompts></FeaturedPrompts>
      <WhyChooseUs />
      <TopCreators />
      <CustomerReviews />
      <LivePlayground />
      <CreatorOnboarding />
    </div>
  );
}
