// components/FeaturedPrompts.jsx
"use client";
import { Card, CardHeader,CardFooter, Button, Avatar, Chip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Bookmark, ArrowRight, ShoppingCart } from "lucide-react";
import FadeIn from "./Fadein";


// Replaced static MOCK_PROMPTS array with a dynamic `prompts` prop pass-through.
export default function FeaturedPrompts({ isLoggedIn, prompts = [] }) {
  const router = useRouter();

  const handleViewDetails = (id) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/prompts/${id}`);
    }
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Trending Prompts on Woo-AI</h2>
            <p className="text-default-400 mt-2">Tested, validated, and verified assets making waves right now.</p>
          </div>
          {/* FIX: Handled ArrowRight as a child inline instead of using endContent */}
          <Button variant="ghost" className="gap-2 inline-flex items-center" onClick={() => router.push("/store")}>
            Browse Store
            <ArrowRight size={16} />
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt, index) => (
          <FadeIn key={prompt._id || prompt.id || index} delay={index * 0.1}>
            <Card className="h-full bg-content1/40 backdrop-blur-sm border border-default-100 hover:border-primary/50 transition-colors" isHoverable>
              <CardHeader className="flex justify-between items-start gap-3">
                <div className="flex gap-3 items-center">
                  <Avatar radius="full" size="sm" src={prompt.creator?.avatar || "https://i.pravatar.cc/150"} />
                  <p className="text-small font-medium text-default-600">{prompt.creator?.name || "Anonymous"}</p>
                </div>
                <Chip size="sm" variant="flat" color={prompt.category === "Development" ? "primary" : "secondary"}>
                  {prompt.category}
                </Chip>
              </CardHeader>
              
              <div className="py-3">
                <h3 className="text-lg font-bold line-clamp-1 mb-2">{prompt.title}</h3>
                <p className="text-sm text-default-500 line-clamp-3">{prompt.description}</p>
                <p className="text-xl font-bold mt-4 text-foreground">${prompt.price}</p>
              </div>
              
              <CardFooter className="justify-between border-t border-default-100/50 mt-auto">
                <Button isIconOnly variant="light" radius="full">
                  <Bookmark size={18} className="text-default-400" />
                </Button>
                {/* FIX: Handled ShoppingCart icon inside children instead of using endContent */}
                <Button 
                  color="primary" 
                  size="sm" 
                  variant="flat" 
                  className="gap-1.5 inline-flex items-center" 
                  onPress={() => handleViewDetails(prompt._id || prompt.id)}
                >
                  View Details
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