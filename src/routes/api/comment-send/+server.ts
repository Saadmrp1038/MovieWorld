import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const groupId = data.get('groupId')
    const threadId = data.get('threadId')
    const username = data.get('username')
    const comment = data.get('comment')
    const avatarUrl = data.get('avatarUrl')

    // let username = JSON.stringify(data.get('username'))
    // username = username.slice(1, -1);

    console.log(username);
    console.log(groupId);
    console.log(comment);
    console.log(threadId);
    console.log(avatarUrl);

    let { data: res2 } = await supabase
        .from('CommentTable')
        .insert([
            { username: username, groupId: groupId, comment: comment, avatarUrl: avatarUrl , threadId: threadId},
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