import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const groupId = data['groupId']

    // console.log(groupId)

    let { data: memberList} = await supabase
    .from('MemberInfo')
    .select('*')
    .eq('groupId',groupId)

    // console.log(memberList)

    return new Response(
        JSON.stringify({ success: true , memberList: memberList}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}