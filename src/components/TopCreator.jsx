// components/TopCreators.jsx
"use client";
import { Avatar, Button, Card, CardBody } from "@heroui/react";
import { Award, UserPlus } from "lucide-react";
const creators = [
    {
        id: "c1",
        rank: 1,
        name: "Alex Rivera",
        handle: "@alex_prompt_master",
        earnings: "$45,200",
        avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
        id: "c2",
        rank: 2,
        name: "Sarah Chen",
        handle: "@schen_ai",
        earnings: "$38,900",
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
        id: "c3",
        rank: 3,
        name: "Marcus Vance",
        handle: "@mvance_llm",
        earnings: "$31,500",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: "c4",
        rank: 4,
        name: "Elena Rostova",
        handle: "@elena_prompts",
        earnings: "$28,400",
        avatar: "https://i.pravatar.cc/150?img=26"
    }
];
// Replaced static CREATORS array with a dynamic `creators` prop pass-through.
export default function TopCreators() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold">Top Woo-AI Earners</h2>
                    <p className="text-default-400 mt-2">Meet the elite engineers crafting next-generation prompt systems.</p>
                </div>
                {/* FIX: Handled Award icon inside children instead of using startContent */}
                <Button variant="flat" size="sm" className="gap-1.5 inline-flex items-center">
                    <Award size={16} />
                    View Leaderboard
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {creators.map((creator, idx) => (
                    <Card key={creator.id || creator.rank || idx} className="border border-default-100 p-2" isPressable>
                        <div className="flex flex-col items-center p-6 text-center">
                            <div className="relative mb-4">
                                <Avatar src={creator.avatar || "https://i.pravatar.cc/150"} className="w-20 h-20 text-large border-2 border-primary/40" />
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground font-bold text-xs rounded-full flex items-center justify-center border-2 border-background">
                                    #{creator.rank || idx + 1}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">{creator.name}</h3>
                            <p className="text-xs text-default-400 mb-2">{creator.handle}</p>
                            <p className="text-sm font-semibold text-success-500 mb-4">{creator.earnings} Generated</p>

                            {/* FIX: Handled UserPlus icon inside children instead of using startContent */}
                            <Button size="sm" color="primary" variant="bordered" className="w-full gap-1.5 inline-flex items-center">
                                <UserPlus size={14} />
                                Follow Creator
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}