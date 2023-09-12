<script lang='ts'>
	import { page } from '$app/stores';  
	import { goto } from '$app/navigation';
	import { userProfile, userAvatar } from '../../stores';
	import { onMount } from 'svelte';

	let userProfileValue: any;
	userProfile.subscribe(value => {
		userProfileValue = value;
	});

	let userAvatarValue: any;
	userAvatar.subscribe(value => {
		userAvatarValue = value;
	});

	onMount(()=>{
		if(!userProfileValue.isLoggedIn){
			goto('/');
		}
	})
	$: routeId = $page.route.id

	function logout(){
		$userProfile = {isLoggedIn: false, username: ''}
		$userAvatar = {url: ''}
		goto('/')
	}

</script>

<header
	class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#0E183D] text-sm py-4 dark:bg-white"
>
	<nav class="flex items-center justify-between max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
		<div class="flex text-lg font-bold items-center justify-between bg-[#F8D340] p-2 rounded">
			MovieWorld
		</div>
		<div class="transition-all duration-300 sm:block">
			<div
				class="text-base text-white font-normal flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5"
			>
				{#if routeId == '/main/home'}
				<a class="text-cyan-600 px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/home">Home</a>
				{:else}
				<a class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/home">Home</a>
				{/if}

				{#if routeId == '/main/search-movies'}
				<a class="text-cyan-600 px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/search-movies">Search Movies</a>
				{:else}
				<a class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/search-movies">Search Movies</a>
				{/if}

				{#if routeId == '/main/search-groups'}
				<a class="text-cyan-600 px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/search-groups">Search Groups</a>
				{:else}
				<a class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/search-groups">Search Groups</a>
				{/if}

				{#if routeId == '/main/my-groups'}
				<a class="text-cyan-600 px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/my-groups">My Groups</a>
				{:else}
				<a class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" href="/main/my-groups">My Groups</a>
				{/if}

			</div>
		</div>
        <div>
           <input class="p-2 rounded-md bg-[#0D0F17] text-[#888CA0] border-2 border-[#888CA0]" type="text" name="searchtext" value="Search Movie">
        </div>
		<div class='flex flex-col items-center'>
			<a class="px-3 hover:text-gray-500 text-white dark:hover:text-gray-400" href="/main/user-profile-mine">
				<img src={userAvatarValue.url} width=50 height=50 alt="" class="rounded-full"/>
			</a>
			<a class="px-3 hover:text-gray-500 text-white dark:hover:text-gray-400 my-2" href="/main/user-profile-mine">{userProfileValue.username}</a>
		</div>
		<div>
			<button class='text-white' on:click={logout}>Log Out</button>
		</div>
	</nav>
</header>

<slot />
