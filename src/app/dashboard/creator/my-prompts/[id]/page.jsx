import { getPromptById } from '@/lib/api/prompts';
import UpdatePrompts from "./UpdatePrompt";
// Adjust path as necessary

const page = async ({ params }) => {
  const { id } = await params;
  const prompt = await getPromptById(id);
  

  if (!prompt) {
    return <div className="text-white text-center py-12">Prompt not found</div>;
  }

  return (
    <UpdatePrompts prompt={prompt} />
  );
};

export default page;