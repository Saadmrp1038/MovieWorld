<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
	import { userProfile, userAvatar } from '../../../../../../../stores';
	import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	let userAvatarValue: any;
	userAvatar.subscribe((value) => {
		userAvatarValue = value;
	});

    $: routeId = $page.url.pathname;
	$: groupId = $page.params.id;
	$: groupType = $page.params.type;

    let threadTitle = ''
    let threadContent = ''

    async function create(event: Event){
        const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		
        threadTitle = ''
        threadContent = ''

        // console.log(data.get('threadTitle'))
        // console.log(data.get('threadContent'))

        await fetch('/api/thread-creation', {
			method: 'POST',
			body: data
		})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
			toast.success('Thread Created Successfully');
            goto('/main/group/'+groupType+'/'+groupId+'/group-threads');
            return response.json(); // Parse the JSON response
        })

    }


</script>

<Toaster/>
<div class="flex flex-col items-center my-10">
    <p class="text-3xl text-[#c5c5c5] my-5">Thread Creation</p>
    <form on:submit|preventDefault={create} class="space-y-10">
        <label class="input-group">
            <span>Thread Title</span>
            <input type="text" name="threadTitle" bind:value={threadTitle} class="input input-bordered" />
        </label>

        <div class="input-group">
            <span>Thread Content</span>
            <textarea
                class="textarea textarea-bordered textarea-lg w-full max-w-xs"
                name="threadContent"
                bind:value={threadContent}
            />
        </div>

        <input type="hidden" name="groupId" value={groupId}>
        <input type="hidden" name="avatarUrl" value={userAvatarValue.url} class="input input-bordered" />
        <input type="hidden" name="threadCreator" value={userProfileValue.username} class="input input-bordered" />
        <div class="flex felx-col justify-center">
            <button type="submit" class="btn btn-accent">Create</button>
        </div>
    </form>
</div>