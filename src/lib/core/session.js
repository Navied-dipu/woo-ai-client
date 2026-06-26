import { headers } from "next/headers";
import { auth } from "../auth"; // Verify this points cleanly to your server betterAuth instance

export const getUserSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers() // Await the headers structure securely
        });
        
        return session?.user || null;
    } catch (error) {
        console.error("Error fetching server session:", error);
        return null;
    }
};