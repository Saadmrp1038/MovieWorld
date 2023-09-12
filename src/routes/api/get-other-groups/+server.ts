import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

//api/get-avatar/POST
export const POST: RequestHandler = async (event) => {
    const data = await event.request.json()
    const username = data['username']
    //console.log(groupId)

    let { data: groupList} = await supabase
    .from('MemberInfo')
    .select('*')
    .neq('username',username)

    let { data: groupList2} = await supabase
    .from('MemberInfo')
    .select('*')
    .eq('username',username)

    return new Response(
        JSON.stringify({ success: true , groupList: groupList, groupList2: groupList2}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}