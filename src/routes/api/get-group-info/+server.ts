import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const groupId = data['groupId']

    let { data: groupData} = await supabase
    .from('GroupInfo')
    .select('*')
    .eq('id',groupId)

    // console.log(groupId)
    // console.log(groupData)

    return new Response(
        JSON.stringify({ success: true , groupData: groupData}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}