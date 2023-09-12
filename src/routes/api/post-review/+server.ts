import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

// export const GET: RequestHandler = async (event) => {
//     return new Response('Hello')
// }

// api/login/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const movieId = data.get('movieId')
    const rating = data.get('rating')
    const username = data.get('username')
    const review = data.get('review')
    const avatarUrl = data.get('avatarUrl')

    // let username = JSON.stringify(data.get('username'))
    // username = username.slice(1, -1);

    console.log(username);
    console.log(movieId);
    console.log(review);
    console.log(rating);
    console.log(avatarUrl);

    let { data: res2 } = await supabase
        .from('ReviewTable')
        .insert([
            { username: username, movieId: movieId, review: review, avatarUrl: avatarUrl , rating: rating},
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