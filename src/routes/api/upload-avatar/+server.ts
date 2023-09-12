import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/upload-avatar/POST
export const POST: RequestHandler = async (event) => {
    console.log("Trying to parse")

    const data = await event.request.formData()
    const file = data.get('file-upload')
    let username = JSON.stringify(data.get('username'))
    username = username.slice(1, -1);

    console.log(file)
    console.log(username)

    if (!file) return new Response(
        JSON.stringify({ success: false }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    console.log("Trying to update")

    let { data: up, error} = await supabase.storage.from("userpic").update(username, file,
        {
            cacheControl: '0',
            upsert: true
        });

    console.log(up)
    console.log(error)
    
    console.log("Trying to get url")

    let { data: url} = await supabase
    .storage
    .from('userpic')
    .getPublicUrl(username)
    console.log(url)

    return new Response(
        JSON.stringify({ success: true, url: url}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
