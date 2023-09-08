

import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const username = data.get('username')
    const password = data.get('password')

    console.log(username);
    console.log(password);

    let { data: LoginTable, error }  = await supabase.from("LoginTable").select('*')
        .eq('username', username)
        .eq('password', password);

    console.log(LoginTable)

    if(LoginTable?.length==1){
        return new Response(
            JSON.stringify({ success: true }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
    else{
        return new Response(
            JSON.stringify({ success: false }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
    
} 