<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
    import { userProfile, userAvatar } from '../../../stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	

	const dispatch = createEventDispatcher();

	$: routeId = $page.url.pathname;

	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	let userAvatarValue: any;
	userAvatar.subscribe((value) => {
		userAvatarValue = value;
	});

	let groupName = '';
	let groupType = '';
	let groupDesc = '';

	async function create(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		// const file = data.get('file-upload')
		
        groupName = '';
        groupType = '';
        groupDesc = '';

		// console.log(
		// 	data.get('groupName') +" "+
        //     data.get('groupType') +" "+
        //     data.get('groupDesc') +" "
		// );

		await fetch('/api/group-creation', {
			method: 'POST',
			body: data
		})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
			toast.success('Group Created Successfully');
			goto('/main/my-groups');
            return response.json(); // Parse the JSON response
        })
	
	}

	function selectType() {
		dispatch('message', {
			value: groupType
		});
		//console.log(groupType);
	}
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<Toaster/>
	<div class="flex flex-col items-center my-10">
		<p class="text-3xl text-[#c5c5c5] my-5">Group Creation</p>
		<form on:submit|preventDefault={create} class="space-y-10">
			<label class="input-group">
				<span>Group Name</span>
				<input type="text" name="groupName" bind:value={groupName} class="input input-bordered" />
			</label>

			<div class="input-group">
				<span>Group Type</span>
				<select bind:value={groupType} on:change={selectType} name="groupType" class="select select-bordered">
					<option disabled selected>Pick category</option>
					<option>Public</option>
					<option>Private</option>
				</select>
			</div>

			<div class="input-group">
				<span>Group Description</span>
				<textarea
					class="textarea textarea-bordered textarea-lg w-full max-w-xs"
                    name="groupDesc"
					bind:value={groupDesc}
				/>
			</div>
			<!-- <div>
				<input type="file" name="file-upload" value={null} class="file-input file-input-bordered w-full max-w-xs" />
			</div> -->
			<input type="hidden" name="avatarUrl" value={userAvatarValue.url} class="input input-bordered" />
            <input type="hidden" name="groupOwner" value={userProfileValue.username} class="input input-bordered" />
			<div class="flex felx-col justify-center">
				<button type="submit" class="btn btn-accent">Create</button>
			</div>
		</form>
	</div>
</body>
