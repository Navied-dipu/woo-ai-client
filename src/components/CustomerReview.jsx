// components/CustomerReviews.jsx
"use client";
import { Card, CardHeader, CardBody, Avatar } from "@heroui/react";
import { Star } from "lucide-react";
import FadeIn from "./Fadein";


const REVIEWS = [
  { name: "Alex Mercer", role: "SaaS Founder", text: "The development prompts on Woo-AI saved me thousands in dev costs. They drop boilerplate architecture instantly.", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Jessica Vane", role: "UI/UX Designer", text: "Finding consistent image outputs was structural nightmare until I discovered Woo-AI creators. Magnificent presets.", avatar: "https://i.pravatar.cc/150?img=22" },
  { name: "David Kim", role: "Digital Marketer", text: "The multi-step blog generation prompt completely systemized our pipeline workflows. Absolute high-yield asset.", avatar: "https://i.pravatar.cc/150?img=15" },
];

export default function CustomerReviews() {
  return (
    <section className="py-20 bg-content1/20 border-y border-default-100 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold">Loved by AI Innovators</h2>
            <p className="text-default-400 mt-2">Hear how businesses and engineers are scaling their throughput using Woo-AI.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <Card className="p-4 h-full bg-background border border-default-100 shadow-sm">
                <CardHeader className="flex gap-3 justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <Avatar radius="full" size="md" src={review.avatar} />
                    <div>
                      <h4 className="text-sm font-bold text-default-700">{review.name}</h4>
                      <p className="text-xs text-default-400">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex text-warning">
                    {Array(5).fill(null).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </CardHeader>
                <div className="py-2 text-sm text-default-500 italic">
                  "{review.text}"
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}