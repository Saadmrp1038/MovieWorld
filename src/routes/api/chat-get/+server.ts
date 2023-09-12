import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const groupId = data['groupId']
    //console.log(groupId)

    let { data: chatData} = await supabase
    .from('GroupChat')
    .select('*')
    .eq('groupId',groupId)


    return new Response(
        JSON.stringify({ success: true , chatData: chatData}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}