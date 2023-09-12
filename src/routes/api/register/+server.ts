import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    //const username = data.get('username')
    const password = data.get('password')

    let username = JSON.stringify(data.get('username'))
    username = username.slice(1, -1);

    console.log(username);
    console.log(password);

    let { data: res1 } = await supabase
        .storage
        .from('userpic')
        .copy('default.jpg', username)

    let { data: url } = await supabase
        .storage
        .from('userpic')
        .getPublicUrl(username)

    let { data: res2 } = await supabase
        .from('LoginTable')
        .insert([
            { username: username, password: password, imageURL: url },
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