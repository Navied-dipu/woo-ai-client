import SavedPromptsTable from '@/components/Dashboard/user/SavePromptsTable';
import { getPromptsByIds, getSavedPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const user = await getUserSession();
  const userId = user?.id;

  const savedprompts = await getSavedPrompts(userId) || [];
  const promptIds = savedprompts.map(item => item.promptId);

  const apiResponse = await getPromptsByIds(promptIds);

  // 💡 Debug here: see exactly what your database/API responds with
  // console.log('Raw API Response:', apiResponse);

  // Ensure it's passed down as a clean array
  // const promptsArray = Array.isArray(apiResponse)
  //   ? apiResponse
  //   : (apiResponse?.prompts || apiResponse?.data || []);

  return (
    <div className="p-6">
      <h2></h2>
      <SavedPromptsTable userId={userId} prompts={apiResponse} />
    </div>
  );
};

export default Page;