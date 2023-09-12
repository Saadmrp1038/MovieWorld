<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userProfile, userAvatar } from '../../../../../../../stores';
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
	$: threadId = $page.params.threadId;

	let comment = '';

	let threadData: any;
	let threadTitle: string;
	let threadCreator: string;
	let threadContent: string;
	let avatarUrl: string;
	let creationDate: string;

	async function getThredInfo() {
		await fetch('/api/get-thread-info', {
			method: 'POST',
			body: JSON.stringify({
				threadId: threadId
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				threadData = data.threadData[0];

				threadTitle = threadData['threadTitle'];
				threadContent = threadData['threadContent'];
				threadCreator = threadData['threadCreator'];
				avatarUrl = threadData['avatarUrl'];
				creationDate = threadData['created_at'].toString().split('T')[0];
			});
	}

	let commentData : any;
	let len : number;

	async function getComments() {
		await fetch('/api/get-comments', {
			method: 'POST',
			body: JSON.stringify({
				threadId: threadId
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				commentData = data.commentData;
				console.log(commentData)
				len = Object.keys(commentData).length
				console.log(Object.keys(commentData).length);
			});
	}

	onMount(() => {
		getThredInfo();
		getComments()
	});

	async function send(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		comment = '';

		await fetch('/api/comment-send', {
			method: 'POST',
			body: data
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {});

		getComments()
	}
</script>

<div>
<div class="flex felx-col justify-center">
	<p class="text-3xl text-[#c5c5c5] my-5">Thread</p>
</div>
<article class="flex flex-col shadow my-4">
	<!-- Article Image -->
	<!-- <a href="#" class="hover:opacity-75">
		<img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1">
	</a> -->
	<div class="m-8 card bg-[#393d4d] flex flex-col justify-start p-6">
		<p class="text-3xl font-bold text-white pb-4">{threadTitle}</p>
		<p class="text-sm pb-3 text-white">
			<span class="font-semibold ">{threadCreator}</span><span
				>, Published on {creationDate}
			</span>
		</p>
		<p class="pb-6 text-white">{threadContent}</p>
	</div>
	<div class="flex felx-col justify-center">
		<form on:submit|preventDefault={send}>
			<div class="flex flex-row my-5">
				<input
					type="text"
					name="comment"
					bind:value={comment}
					class="input input-bordered input-primary w-full max-w-xs"
				/>
				<input type="hidden" name="username" value={userProfileValue.username} />
				<input type="hidden" name="groupId" value={groupId} />
				<input type="hidden" name="threadId" value={threadId} />
				<input type="hidden" name="avatarUrl" value={userAvatarValue.url} />
				<button type="submit" class="btn btn-accent mx-5"> Post </button>
			</div>
		</form>
	</div>
</article>
<div class="flex felx-col justify-center">
	<p class="text-3xl text-[#c5c5c5] my-5">Comments</p>
</div>
{#each { length: len } as _, i}
<div class="flex justify-center relative top-1/3">
	<!-- This is an example component -->
	<div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border border-black rounded-lg shadow-lg w-[800px] bg-[#393d4d]">
		<div class="relative flex gap-4">
			<img
				src={commentData[i]['avatarUrl']}
				class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
				alt=""
				loading="lazy"
			/>
			<div class="flex flex-col w-full">
				<div class="flex flex-row justify-between">
					<p class="relative text-xl whitespace-nowrap truncate overflow-hidden text-white">{commentData[i]['username']}</p>
				</div>
				<p class="text-gray-400 text-sm">{commentData[i]['created_at'].toString().split('T')[0]}</p>
			</div>
		</div>
		<p class="-mt-4 text-white">
			{commentData[i]['comment']}
		</p>
	</div>
</div>
{/each}

</div>