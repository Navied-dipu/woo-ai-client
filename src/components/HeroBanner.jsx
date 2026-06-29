// components/HeroBanner.jsx
"use client";
import { Input, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

const TRENDING_TAGS = ["ChatGPT Midjourney", "Claude 3.5 Sonnet", "SaaS Automation", "UI/UX Generation", "SEO Copywriting"];

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-b from-background via-background/50 to-content1/20">
      {/* Background Tech Glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 -z-10 w-72 h-72 bg-primary/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Chip Fix Maintained */}
          <Chip variant="flat" color="primary" className="mb-4 gap-1.5 inline-flex items-center justify-center">
            <Sparkles size={14} />
            Welcome to Woo-AI Marketplace
          </Chip>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
            Buy & Sell High-Performance <br /> AI Prompts Instantly
          </h1>
          <p className="mt-4 text-xl text-default-500 max-w-2xl mx-auto">
            Stop guessing the right inputs. Access top-tier engineered prompts built to maximize productivity, code output, and creative results.
          </p>
        </motion.div>

        {/* Search Bar & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto bg-content1/50 backdrop-blur-md p-2 rounded-2xl border border-default-200/60 shadow-xl"
        >
          {/* FIX: Changed variant to "bordered" so isClearable strips correctly and functions perfectly */}
          <Input
            className="w-full"
            placeholder="Search thousands of vetted engineering prompts..."
            startContent={<Search className="text-default-400" size={20} />}
            variant="bordered"
            radius="lg"
          />
          <Button color="primary" size="lg" className="font-semibold shadow-lg shadow-primary/30">
            Start Exploring
          </Button>
        </motion.div>

        {/* Trending Tags */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-center gap-2 items-center">
          <span className="text-sm text-default-400 mr-2">Hot Prompts:</span>
          {TRENDING_TAGS.map((tag, idx) => (
            <Chip key={idx} variant="dot" color="secondary" className="cursor-pointer hover:scale-105 transition-transform">
              {tag}
            </Chip>
          ))}
        </motion.div>
      </div>
    </section>
  );
}