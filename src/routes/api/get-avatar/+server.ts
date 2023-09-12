import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const username = data['username']
    console.log(username)

    let { data: url} = await supabase
    .storage
    .from('userpic')
    .getPublicUrl(username)

    console.log(url)

    return new Response(
        JSON.stringify({ success: true , url: url}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}