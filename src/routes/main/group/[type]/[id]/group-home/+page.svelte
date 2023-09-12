<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../../../../stores';
	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	$: routeId = $page.url.pathname;
	$: groupId = $page.params.id;
	$: groupType = $page.params.type;

	let groupData: any;
	let url: string;
	let groupName: string;
    let groupDesc: string
	let groupMembers: number;
	let creationDate: Date;
    let date : string
	let groupOwner : string

	async function getGroupData() {
		await fetch('/api/get-group-info', {
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
				groupData = data.groupData[0];
				url = JSON.parse(groupData['imageURL'])['publicUrl'];
				groupName = groupData['name'];
				groupMembers = groupData['members'];
				creationDate = groupData['created_at'];
				date = creationDate.toString().split('T')[0]
                groupDesc = groupData['description']
				groupOwner = groupData['creator']
			});
	}

	onMount(() => {
		getGroupData();
	});
</script>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-cente">
		<img width="400" height="400" src={url} alt="not found" />
		<p class="text-white p-3 text-xl font-normal">Group Name: {groupName}</p>
		<p class="text-white p-3 text-xl font-normal">Group Owner: {groupOwner}</p>
        <p class="text-white p-3 text-xl font-normal">Group Description: {groupDesc}</p>
		<p class="text-white p-3 text-xl font-normal">Group Type: {groupType}</p>
		<!-- <p class="text-white p-3 text-xl font-normal">Members: {groupMembers}</p> -->
		<p class="text-white p-3 text-xl font-normal">Creation Date: {date}</p>
		<!-- <p class="text-white p-3 text-2xl font-light">Account Created: </p> -->
	</div>
</div>
