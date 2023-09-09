<script lang="ts">
	import { page } from '$app/stores';
	$: routeId = $page.route.id;
</script>

<body class="bg-[#2A2F42] h-screen">
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col items-center justify-center">
			<!-- Page content here -->
			<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<ul class="bg-[#555B74] menu w-80 min-h-full text-white">
				<!-- Sidebar content here -->

				
				{#if routeId == '/main/user-profile-mine'}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/user-profile-mine">Profile</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/user-profile-mine">Profile</a>
				</li>
				{/if}

				{#if routeId == '/main/user-profile-mine/review'}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/user-profile-mine/review">Review</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/user-profile-mine/review">Review</a>
				</li>
				{/if}

				{#if routeId == '/main/user-profile-mine/settings'}
				<li class="p-2  bg-gray-700 rounded-xl">
					<a class="text-cyan-500" href="/main/user-profile-mine/settings">Settings</a>
				</li>
				{:else}
				<li class="p-2">
					<a class="" href="/main/user-profile-mine/settings">Settings</a>
				</li>
				{/if}
			</ul>
		</div>
	</div>

	<slot />
</body>
