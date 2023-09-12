<script lang="ts">
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../stores';
	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});
	let userAvatarValue: any;
	userAvatar.subscribe((value) => {
		userAvatarValue = value;
	});

	let groupList: any;
	let groupList2: any;
	let map = new Map<number, string>();

	let groupData;
	let url = new Map<number, string>();
	let groupName = new Map<number, string>();
	let groupDesc = new Map<number, string>();
	// let groupMembers = new Map();
	// let creationDate = new Map();
	// let date = new Map();
	let groupType = new Map<number, string>();
	let groupOwner = new Map<number, string>();

	async function getGroupList() {
		await fetch('/api/get-other-groups', {
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
				groupList2 = data.groupList2;
				console.log(groupList);
				// console.log(Object.keys(chatData).length);
				// len = Object.keys(chatData).length
				// console.log(chatData)
				// console.log(len)

				for (let i = 0; i < Object.keys(groupList).length; i++) {
					map.set(groupList[i]['groupId'], groupList[i]['groupId']);
				}
				for (let i = 0; i < Object.keys(groupList2).length; i++) {
					map.delete(groupList2[i]['groupId']);
				}
				for (let [key, value] of map) {
					getGroupData(key);
					//console.log(map);
				}
				map = map;
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

	async function joinGroup(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		const groupId = data.get('id');
		const creator = data.get('creator');

		console.log(creator)
		await fetch('/api/join', {
			method: 'POST',
			body: JSON.stringify({
				groupId: groupId,
				username: userProfileValue.username,
				avatarUrl: userAvatarValue.url,
				creator: creator
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {});

		getGroupList()
	}
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex flex-col items-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Groups</p>

		{#each map.entries() as [key, value]}
			<div class="card shadow-lg bg-[#393D4D] m-8">
				<div class="flex felx-row">
					<div>
						<img src={url.get(key)} width="150" height="150" alt="not found" />
					</div>

					<!-- <input type="hidden" name="id" {value} />
					<input type="hidden" name="type" value={groupType.get(key)} /> -->

					<div class="card-body">
						<p class="card-title text-white text-lg w-[800px]">{groupName.get(key)}</p>
						<p class="text-md text-[#C5C5C5]">{groupType.get(key)}</p>
						<p class="text-white">{groupDesc.get(key)}</p>
					</div>
					<div />
					<div class="flex flex-row items-center m-2">
						<form on:submit|preventDefault={joinGroup}>
							<input type="hidden" name="id" value={key} />
							<input type="hidden" name="creator" value={groupOwner.get(key)} />
							<button type="submit" class="btn btn-accent my-2">Join</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
	</div>
</body>
