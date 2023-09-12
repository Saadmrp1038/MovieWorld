import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";


//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const username = data['username']

    //console.log(username)

    let { data: reviewData} = await supabase
    .from('ReviewTable')
    .select('*')
    .eq('username',username)

    

    // console.log(reviewList)

    return new Response(
        JSON.stringify({ success: true , reviewData: reviewData}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}