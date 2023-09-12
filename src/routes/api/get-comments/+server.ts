import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const threadId = data['threadId']

    // console.log(threadId)

    let { data: commentData} = await supabase
    .from('CommentTable')
    .select('*')
    .eq('threadId',threadId)


    return new Response(
        JSON.stringify({ success: true , commentData: commentData}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}