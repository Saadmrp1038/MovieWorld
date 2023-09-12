<script lang="ts">
	import { tmdbOptions } from '$lib/tmdbClient';
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../stores';
	import { goto } from '$app/navigation';
	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	//console.log(userProfileValue.username)

	async function getAvatar() {
		await fetch('/api/get-avatar', {
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
				let url: string;
				url = data.url['publicUrl'];
				url = url + '?v=' + Date.now();
				//console.log(url)
				$userAvatar = { url: url };
			});
	}

	let topRatedList: any;
	let popularList: any;
	let latestList: any;

	let len1 = 0;
	let len2 = 0;
	let len3 = 0;

	async function getMovieData() {
		await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', tmdbOptions)
			.then((response) => response.json())
			.then((response) => (topRatedList = response.results));

		await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', tmdbOptions)
		.then(response => response.json())
		.then(response => popularList = response.results)

		await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', tmdbOptions)
		.then(response => response.json())
		.then(response => latestList = response.results)

		console.log(topRatedList);

		len1 = Object.keys(topRatedList).length;
		len2 = Object.keys(popularList).length
		len3 = Object.keys(latestList).length

		// console.log(len1 + ' ' + len2 + ' ' + len3);
		// console.log(topRatedList[0]['original_title']);

		topRatedList = topRatedList;
	}

	onMount(() => {
		getAvatar();
		getMovieData();
	});

    function movieClicked(event: Event){
        const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const movieId = data.get('movieId');

        goto("/main/movie/"+movieId)
    }

</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Top Rated</p>
	</div>
	<div class="flex flex-row">
		{#each { length: Math.min(len1, 5) } as _, i}
        <form on:submit|preventDefault={movieClicked} class="card card-compact w-96 bg-base-100 shadow-xl m-8">
            <button type='submit'>
			<div>
				<figure class="hover:scale-110">
					<img
						src="https://image.tmdb.org/t/p/w500/{topRatedList[i]['poster_path']}"
						alt=""
					/>
				</figure>
				<!-- <div class="card-body">
					<h2 class="card-title">{topRatedList[i]['original_title']}</h2>
					<p>{topRatedList[i]['overview']}</p>
				</div> -->
			</div>
            <input type="hidden" name="movieId" value={topRatedList[i]['id']}>
        </button>
        </form>
		{/each}
	</div>
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Popular</p>
	</div>
    <div class="flex flex-row">
		{#each { length: Math.min(len2, 5) } as _, i}
        <form on:submit|preventDefault={movieClicked} class="card card-compact w-96 bg-base-100 shadow-xl m-8">
            <button type='submit'>
			<div>
				<figure class="hover:scale-110">
					<img
						src="https://image.tmdb.org/t/p/w500/{popularList[i]['poster_path']}"
						alt=""
					/>
				</figure>
				<!-- <div class="card-body">
					<h2 class="card-title">{popularList[i]['original_title']}</h2>
					<p>{popularList[i]['overview']}</p>
				</div> -->
			</div>
            <input type="hidden" name="movieId" value={popularList[i]['id']}>
        </button>
    </form>
		{/each}
	</div>
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Lastest</p>
	</div>
    <div class="flex flex-row">
		{#each { length: Math.min(len3, 5) } as _, i}
        <form on:submit|preventDefault={movieClicked} class="card card-compact w-96 bg-base-100 shadow-xl m-8">
            <button type='submit'>
			<div>
				<figure class="hover:scale-110">
					<img
						src="https://image.tmdb.org/t/p/w500/{latestList[i]['poster_path']}"
						alt=""
					/>
				</figure>
				<!-- <div class="card-body">
					<h2 class="card-title">{latestList[i]['original_title']}</h2>
					<p>{latestList[i]['overview']}</p>
				</div> -->
			</div>
            <input type="hidden" name="movieId" value={latestList[i]['id']}>
        </button>
    </form>
		{/each}
	</div>
</body>
