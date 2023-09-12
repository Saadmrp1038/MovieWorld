<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	$: routeId = $page.url.pathname;
	$: groupId = $page.params.id
	$: groupType = $page.params.type
	
	// console.log($page.url.pathname)
	// console.log($page.params.id)
	// console.log($page.params.type)

</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<!-- Page content here -->
			<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="bg-[#555B74] menu w-80 min-h-full text-white">
				<!-- Sidebar content here -->

				
				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-home"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-home">Group Home</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-home">Group Home</a>
				</li>
				{/if}

				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-chat"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-chat">Group Chat</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-chat">Group Chat</a>
				</li>
				{/if}

				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-threads"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-threads">Group Threads</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-threads">Group Threads</a>
				</li>
				{/if}

				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-trends"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-trends">Group Trends</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-trends">Group Trends</a>
				</li>
				{/if}

				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-members"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-members">Group Members</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-members">Group Members</a>
				</li>
				{/if}

				{#if routeId == "/main/group/"+groupType+"/"+groupId+"/group-settings"}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/group/{groupType}/{groupId}/group-settings">Group Settings</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/group/{groupType}/{groupId}/group-settings">Group Settings</a>
				</li>
				{/if}
			</ul>
		</div>
	</div>
</body>
