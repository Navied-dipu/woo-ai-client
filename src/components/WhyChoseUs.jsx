// components/WhyChooseUs.jsx
import { ShieldCheck, Zap, Coins, Users } from "lucide-react";

const BENEFITS = [
  { icon: <Zap className="text-warning" size={24} />, title: "Instant Token Optimization", desc: "Our prompts are precision engineered to cut fluff context parameters, saving you significant API running costs." },
  { icon: <ShieldCheck className="text-success" size={24} />, title: "100% Tested & Verified", desc: "Every configuration listed undergoes automated multi-model output testing to prevent broken syntax loops." },
  { icon: <Coins className="text-primary" size={24} />, title: "Highest Creator Payouts", desc: "Sell your prompts securely on Woo-AI and enjoy industry-leading low processing fees keeping money in your pocket." },
  { icon: <Users className="text-secondary" size={24} />, title: "Thriving Community Support", desc: "Gain quick adjustments, fork variations, and collaborate inside our integrated prompt engineering forum networks." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-content1/20 border-y border-default-100 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold">The Woo-AI Advantage</h2>
          <p className="text-default-400 mt-2">Elevating simple text queries into robust, monetizeable assets across global creative workflows.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((item, index) => (
            <div key={index} className="p-6 bg-background rounded-2xl border border-default-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-content2 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-default-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}