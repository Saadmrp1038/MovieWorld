import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()

    let groupName = JSON.stringify(data.get('groupName'))
    groupName = groupName.slice(1, -1);

    const groupType = data.get('groupType')
    const groupDesc = data.get('groupDesc')
    const groupOwner = data.get('groupOwner')
    const avatarUrl = data.get('avatarUrl')
    const creator = data.get('creator')

    const members = 1

    //console.log(groupName +' | '+groupType+' | '+groupDesc)

    let { data: res1 } = await supabase
        .storage
        .from('grouppic')
        .copy('default.jpg', groupName)

    let { data: url } = await supabase
        .storage
        .from('grouppic')
        .getPublicUrl(groupName)

    await supabase
        .from('GroupInfo')
        .insert({ type: groupType, name: groupName, members: members, description: groupDesc, creator: groupOwner, imageURL: url})

    let { data: GroupId, error } = await supabase
        .from('GroupInfo')
        .select('id')
        .eq('name', groupName)
    
    let id = GroupId[0].id
    //console.log(id)

    let {data: res2, error: error2} = await supabase
    .from('MemberInfo')
    .insert({ groupId: id, username: groupOwner, avatarUrl: avatarUrl, creator: groupOwner})

    //console.log(res2, error2)

    return new Response(
        JSON.stringify({ success: true }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}