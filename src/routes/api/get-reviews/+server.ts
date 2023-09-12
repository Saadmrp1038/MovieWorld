import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const movieId = data['movieId']

    // console.log(movieId)

    let { data: reviewList} = await supabase
    .from('ReviewTable')
    .select('*')
    .eq('movieId',movieId)

    // console.log(reviewList)

    return new Response(
        JSON.stringify({ success: true , reviewList: reviewList}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}