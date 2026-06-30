
import PromptsTable from '@/components/Dashboard/PromptsTable';
import { getPrompts } from '@/lib/api/prompts';
import React from 'react';

const page = async () => {
    const prompts = await getPrompts();
    // console.log(prompts)
    return (
        <div className="min-h-screen bg-[#0d0d0f] p-8 text-neutral-100">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                   <h2 className="text-xl font-semibold tracking-tight text-neutral-200">
                        Prompts for review
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                        Total items submitted: {prompts.length}
                    </p>
                </div>
                <PromptsTable prompts={prompts} />
            </div>
         </div>
    );
};

export default page;