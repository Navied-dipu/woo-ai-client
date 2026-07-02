"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Button, Avatar, Chip } from "@heroui/react";
// Import optimized Next.js Image component
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bookmark, ArrowRight, ShoppingCart, Copy, Flame } from "lucide-react";
import FadeIn from "./Fadein";
import { getPrompts } from "@/lib/api/prompts";
import Link from "next/link";

export default function FeaturedPrompts({ isLoggedIn, prompts = [] }) {
  const router = useRouter();
  const [trendingPrompts, setTrendingPrompts] = useState([]);

  useEffect(() => {
    async function fetchAndSortPrompts() {
      try {
        // 1. Fetch the data safely
        const allPrompts = await getPrompts();

        // 2. Sort by copyCount descending and strict slice to top 6 items
        const topSix = (allPrompts || [])
          .sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0))
          .slice(0, 6);

        setTrendingPrompts(topSix);
      } catch (error) {
        console.error("Failed to load trending prompts:", error);
        // Fallback fallback handling via props
        const sortedProps = [...prompts]
          .sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0))
          .slice(0, 6);
        setTrendingPrompts(sortedProps);
      }
    }

    fetchAndSortPrompts();
  }, [prompts]);

 

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Trending Prompts on Woo-AI</h2>
            <p className="text-default-400 mt-2">The top 6 highest performing, verified assets making waves right now.</p>
          </div>
          <Button variant="ghost" className="gap-2 inline-flex items-center" onClick={() => router.push("/store")}>
            Browse Store
            <ArrowRight size={16} />
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingPrompts.map((prompt, index) => (
          <FadeIn key={prompt._id?.$oid || prompt._id || prompt.id || index} delay={index * 0.1}>
            <Card className="h-full bg-content1/40 backdrop-blur-sm border border-default-100 hover:border-primary/50 transition-all duration-300 relative overflow-hidden flex flex-col" isHoverable>

              {/* Dynamic Rank Ribbon Layered nicely over the image container */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-warning to-danger text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full z-20 flex items-center gap-1 shadow-md">
                <Flame size={10} className="fill-black" />
                #{index + 1} TRENDING
              </div>

              {/* Card Image Banner Container */}
              <div className="relative w-full h-48 overflow-hidden bg-default-100 z-0">
                <Image
                  fill
                  alt={prompt.title || "Prompt banner"}
                  className="z-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src={prompt.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"}
                  sizes="(max-w-7xl) 33vw, 100vw"
                  priority={index < 3}
                />
              </div>

              {/* CardHeader shifted padding back to match image spacing */}
              <CardHeader className="flex justify-between items-start gap-3 pt-4 px-4">
                <div className="flex gap-3 items-center">
                  <Avatar radius="full" size="sm" src={prompt.creator?.avatar || "https://i.pravatar.cc/150"} />
                  <p className="text-small font-medium text-default-600">{prompt.creator?.name || "Anonymous"}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Chip size="sm" variant="flat" color={prompt.category === "Development" || prompt.category === "Code" ? "primary" : "secondary"}>
                    {prompt.category}
                  </Chip>
                  {/* Copy Count Stat indicator */}
                  <div className="flex items-center gap-1 text-default-400 text-xs">
                    <Copy size={12} />
                    <span>{prompt.copyCount || 0} copies</span>
                  </div>
                </div>
              </CardHeader>

              <div className="py-3 px-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold line-clamp-1 mb-2">{prompt.title}</h3>
                  <p className="text-sm text-default-500 line-clamp-3 h-[60px]">{prompt.description}</p>
                </div>
                <p className="text-xl font-bold mt-4 text-foreground">${prompt.price || 0}</p>
              </div>

              <CardFooter className="justify-between border-t border-default-100/50 mt-auto px-4 py-3 bg-content1/20">
                <Button isIconOnly variant="light" radius="full" size="sm">
                  <Bookmark size={16} className="text-default-400" />
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  variant="flat"
                  className="gap-1.5 inline-flex items-center"
                 
                >
                  <Link href={`/allprompts/${prompt?._id}`}> View Details</Link>
                  <ShoppingCart size={14} />
                </Button>
              </CardFooter> 
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}