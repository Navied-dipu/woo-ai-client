// components/LivePlayground.jsx
"use client";
import { useState } from "react";
import { Button, Code, Input } from "@heroui/react";
import { Play, Copy, Check } from "lucide-react";
import FadeIn from "./FadeIn";

export default function LivePlayground() {
  const [topic, setTopic] = useState("E-commerce");
  const [copied, setCopied] = useState(false);

  const promptText = `Act as an expert software architect. Generate a highly secure Next.js API handler route designed specifically for processing a payload request containing nested parameters for an [${topic || "___"}] framework deployment. Enable strict validation filters.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Test Before You Buy</h2>
          <p className="text-default-400 mt-2">See how our variables inject structural arguments seamlessly inside dynamic templates.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-content1/50 border border-default-100 rounded-3xl p-6 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">Dynamic Injection Variable</h3>
              <p className="text-sm text-default-400 mb-4">Change the marketplace category to view target template layout reconfiguration changes.</p>
              <Input label="App Category" variant="bordered" value={topic} onValueChange={setTopic} className="w-full" />
            </div>
            <div className="flex gap-2">
              <Button color="primary" endContent={<Play size={16} />} className="w-full font-semibold">Test Sample Output</Button>
              <Button isIconOnly variant="flat" onValueChange={handleCopy}>
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <div className="bg-black p-5 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[200px]">
            <Code className="bg-transparent text-success-400 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {promptText}
            </Code>
            <div className="text-right text-[10px] text-default-500 font-mono mt-4">Woo-AI Engine • Fully Token Optimized</div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}