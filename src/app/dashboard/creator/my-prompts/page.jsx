
import MyPromptsTable from '@/components/Dashboard/creator/MyPromptsTable';
import { getPromptsByUserId } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';

const page = async () => {
    const user = await getUserSession();

    // Guard: if session is null (unauthenticated), don't crash on user.id
    const prompts = user?.id ? await getPromptsByUserId(user.id) : [];
    // console.log(prompts)

    return (
        <div className="p-4">
            <MyPromptsTable prompts={prompts} user={user} />
        </div>
    );
};

export default page;