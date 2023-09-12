<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../../../../stores';
	import { goto } from '$app/navigation';
	import { tmdbOptions } from '$lib/tmdbClient';
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

	let memberList: any;
	let memberCount = 0;

	async function getMembers() {
		await fetch('/api/get-group-members', {
			method: 'POST',
			body: JSON.stringify({
				groupId: groupId
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				memberList = data.memberList;
				memberCount = Object.keys(memberList).length;
			});
	}

	onMount(() => {
        getMembers()
    });
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Members List</p>
	</div>
	<div class="flex flex-col items-center">
		{#each { length: memberCount } as _, i}
			<div class="card shadow-lg bg-[#393D4D] m-8">
				<div class="flex felx-row">
					<div>
						<img src={memberList[i]['avatarUrl']} width="90" height="90" alt="not found" />
					</div>

					<!-- <input type="hidden" name="id" {value} />
        <input type="hidden" name="type" value={groupType.get(key)} /> -->

					<div class="card-body">
						<p class="card-title text-white text-lg w-[800px]">{memberList[i]['username']}</p>
						<!-- <p class="text-md text-[#C5C5C5]">{memberList[i]['avatarUrl']}</p>
						<p class="text-white">{memberList[i]['avatarUrl']}</p> -->
					</div>
					<div />
					<!-- <div class="flex flex-row items-center m-2">
						<form on:submit|preventDefault={joinGroup}>
							<input type="hidden" name="id" value={key} />
							<input type="hidden" name="creator" value={groupOwner.get(key)} />
							<button type="submit" class="btn btn-accent my-2">Join</button>
						</form>
					</div> -->
				</div>
			</div>
		{/each}
	</div>
</body>
