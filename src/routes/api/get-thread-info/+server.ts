import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const threadId = data['threadId']

    let { data: threadData} = await supabase
    .from('ThreadInfo')
    .select('*')
    .eq('id',threadId)


    return new Response(
        JSON.stringify({ success: true , threadData: threadData}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}