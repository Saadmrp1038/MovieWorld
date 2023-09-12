<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userProfile, userAvatar } from '../../../../../../stores';
	import { onMount } from 'svelte';

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

	let threadList: any;
	let len: any;

	async function getThreadList() {
		await fetch('/api/get-threads', {
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
				threadList = data.threadList;
				len = Object.keys(threadList).length;
				console.log(threadList[0]['avatarUrl']);
				console.log(len);
			});
	}

	async function threadClicked(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const threadId = data.get('threadId');

       // console.log(threadId)

		let des = routeId+"/"+threadId;

		console.log(des)
		goto(des);
	}

	onMount(() => {
		getThreadList();
	});
</script>

<div class="flex flex-col items-center justify-center">
	<a href="{routeId}/thread-creation"
		><button class="my-5 btn btn-secondary max-w-lg">Create Thread</button></a
	>
	<p class="text-3xl text-[#c5c5c5] my-5">Group Threads</p>
	<div>
		{#each { length: len } as _, i}
			<form
				on:submit|preventDefault={threadClicked}
				class="card shadow-lg bg-[#393D4D] m-8 hover:bg-gray-700"
			>
				<button type="submit" class="text-left">
					<div class="flex felx-row">
						<div>
							<img src={threadList[i]['avatarUrl']} width="150" height="150" alt="not found" />
						</div>

                        <input type='hidden' name='threadId' value={threadList[i]['id']}>

						<div class="card-body">
							<p class="card-title text-white text-lg w-[600px]">
								Title: {threadList[i]['threadTitle']}
							</p>
							<div class='flex flex-row justify-between'>
								<span class="text-md text-[#C5C5C5]">Creator: {threadList[i]['threadCreator']}</span
								>
								<span class="text-md text-[#C5C5C5]">Date:{threadList[i]['created_at'].toString().split('T')[0]}</span>
							</div>
							<!-- <p class="text-white">{threadList[i]['threadContent']}</p> -->
						</div>
						<div />
					</div>
                    </button
				>
			</form>
		{/each}
	</div>
</div>
