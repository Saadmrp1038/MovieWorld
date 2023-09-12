import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()

    let groupName = JSON.stringify(data.get('groupName'))
    groupName = groupName.slice(1, -1);

    const threadTitle = data.get('threadTitle')
    const threadContent = data.get('threadContent')
    const threadCreator = data.get('threadCreator')
    const avatarUrl = data.get('avatarUrl')
    const groupId = data.get('groupId')

    console.log(threadTitle)
    console.log(threadContent)
    console.log(threadCreator)
    console.log(groupId)
    console.log(avatarUrl)

    let {data: res, error: error} = await supabase
    .from('ThreadInfo')
    .insert({threadTitle: threadTitle, threadCreator: threadCreator, threadContent: threadContent,
    groupId: groupId, avatarUrl: avatarUrl})

    //console.log(res, error)

    return new Response(
        JSON.stringify({ success: true }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}