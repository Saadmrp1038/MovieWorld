import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()

    const groupId = data['groupId']
    const username = data['username']
    const avatarUrl = data['avatarUrl']


    console.log(groupId);
    console.log(username);
    console.log(avatarUrl)
    
    let { data: res } = await supabase
        .from('MemberInfo')
        .insert([
            { groupId: groupId, username: username,avatarUrl: avatarUrl },
        ])
        .select()


    return new Response(
        JSON.stringify({ success: true }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
} 