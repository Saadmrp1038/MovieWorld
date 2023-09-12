import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const groupId = data.get('groupId')
    const username = data.get('username')
    const message = data.get('message')
    const avatarUrl = data.get('avatarUrl')

    // let username = JSON.stringify(data.get('username'))
    // username = username.slice(1, -1);

    // console.log(username);
    // console.log(groupId);
    // console.log(message);

    let { data: res2 } = await supabase
        .from('GroupChat')
        .insert([
            { username: username, groupId: groupId, message: message, avatarUrl: avatarUrl },
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