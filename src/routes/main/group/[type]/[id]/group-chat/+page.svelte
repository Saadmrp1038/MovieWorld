<script lang="ts">
	import { onMount } from 'svelte';
	let message = '';
	import { userProfile, userAvatar } from '../../../../../../stores';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
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

	async function send(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		message = '';

		await fetch('/api/chat-send', {
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

        getChat()
	}

	let chatData: any;
	let sender: string;
	let msg: string;
    let len = 0

	async function getChat() {
		await fetch('/api/chat-get', {
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
				chatData = data.chatData;
				// console.log(Object.keys(chatData).length);
                len = Object.keys(chatData).length
                console.log(chatData)
                console.log(len)
			});
	}

	onMount(() => {
		getChat();
	});
</script>

<div class="flex flex-col items-center justify-center m-5">
{#each {length: len} as _, i}
    {#if chatData[i]['username'] == userProfileValue.username}
    <div class="chat chat-end w-full">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img src={chatData[i]['avatarUrl']} alt="" />
            </div>
        </div>
        <div class="chat-header text-white">{chatData[i]['username']}</div>
        <div class="chat-bubble">{chatData[i]['message']}</div>
    </div>
    {:else}
    <div class="chat chat-start w-full ">
        <div class="chat-image avatar">
            <div class="w-10 rounded-full">
                <img src={chatData[i]['avatarUrl']} alt="" />
            </div>
        </div>
        <div class="chat-header text-white">{chatData[i]['username']}</div>
        <div class="chat-bubble">{chatData[i]['message']}</div>
    </div>
    {/if}
{/each}





<form on:submit|preventDefault={send}>
	<div class="flex flex-row my-5">
		<input
			type="text"
			name="message"
			bind:value={message}
			class="input input-bordered input-primary w-full max-w-xs"
		/>
		<input type="hidden" name="username" value={userProfileValue.username} />
		<input type="hidden" name="groupId" value={groupId} />
        <input type="hidden" name="avatarUrl" value={userAvatarValue.url} />
		<button type="submit" class="btn btn-accent mx-5"> Sent </button>
	</div>
</form>
</div>