<script lang="ts">
	import { goto } from '$app/navigation';
	import { userProfile, userAvatar } from '../../../stores';
	import { onMount } from 'svelte';

	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	let userAvatarValue: any;
	userAvatar.subscribe((value) => {
		userAvatarValue = value;
	});

	let map = new Map<number, string>();
	let groupData;
	let url = new Map<number, string>();
	let groupName = new Map<number, string>();
	let groupDesc = new Map<number, string>();
	let groupType = new Map<number, string>();
	let groupOwner = new Map<number, string>();

	async function groupClicked(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const id = data.get('id');
		const type = data.get('type');

		let des = '/main/group/' + type + '/' + id + '/group-home';
		//console.log(des)
		goto(des);
	}

	let groupList: any;

	async function getGroupList() {
		await fetch('/api/get-my-groups', {
			method: 'POST',
			body: JSON.stringify({
				username: userProfileValue.username
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				groupList = data.groupList;
				console.log(groupList);

				for (let i = 0; i < Object.keys(groupList).length; i++) {
					map.set(groupList[i]['groupId'], groupList[i]['groupId']);
				}
				for (let [key, value] of map) {
					getGroupData(key);
				}
			});
	}

	async function getGroupData(id: number) {
		await fetch('/api/get-group-info', {
			method: 'POST',
			body: JSON.stringify({
				groupId: id
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				groupData = data.groupData[0];
				url.set(id, JSON.parse(groupData['imageURL'])['publicUrl']);
				groupName.set(id, groupData['name']);
				groupType.set(id, groupData['type']);
				// groupMembers = groupData['members'];
				// creationDate = groupData['created_at'];
				// date = creationDate.toString().split('T')[0];
				groupDesc.set(id, groupData['description']);
				groupOwner.set(id, groupData['creator']);

				url = url;
				groupName = groupName;
				groupDesc = groupDesc;
				groupType = groupType;
				groupOwner = groupOwner;
			});
	}

	onMount(() => {
		getGroupList();
	});
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex flex-col items-center">
		<a href="/main/group-creation"
			><button class="my-5 btn btn-secondary max-w-lg">Create Group</button></a
		>
		<p class="text-3xl text-[#c5c5c5] my-5">Groups Created By Me</p>
		<div>
			{#each map.entries() as [key, value]}
				{#if groupOwner.get(key) == userProfileValue.username}
					<form
						on:submit|preventDefault={groupClicked}
						class="card shadow-lg bg-[#393D4D] m-8 hover:bg-gray-700"
					>
						<button type="submit" class="text-left">
							<div class="flex felx-row">
								<div>
									<img src={url.get(key)} width="150" height="150" alt="not found" />
								</div>

								<input type="hidden" name="id" value={key} />
								<input type="hidden" name="type" value={groupType.get(key)} />

								<div class="card-body">
									<p class="card-title text-white text-lg w-[800px]">{groupName.get(key)}</p>
									<p class="text-md text-[#C5C5C5]">{groupType.get(key)}</p>
									<p class="text-white">{groupDesc.get(key)}</p>
								</div>
								<div />
							</div></button
						>
					</form>
				{/if}
			{/each}
		</div>
		<p class="text-3xl text-[#c5c5c5] my-5">Other Groups</p>
		<div>
			{#each map.entries() as [key, value]}
				{#if groupOwner.get(key) != userProfileValue.username}
					<form
						on:submit|preventDefault={groupClicked}
						class="card shadow-lg bg-[#393D4D] m-8 hover:bg-gray-700"
					>
						<button type="submit" class="text-left">
							<div class="flex felx-row">
								<div>
									<img src={url.get(key)} width="150" height="150" alt="not found" />
								</div>

								<input type="hidden" name="id" value={key} />
								<input type="hidden" name="type" value={groupType.get(key)} />

								<div class="card-body">
									<p class="card-title text-white text-lg w-[800px]">{groupName.get(key)}</p>
									<p class="text-md text-[#C5C5C5]">{groupType.get(key)}</p>
									<p class="text-white">{groupDesc.get(key)}</p>
								</div>
								<div />
							</div></button
						>
					</form>
				{/if}
			{/each}
		</div>
	</div>
</body>
