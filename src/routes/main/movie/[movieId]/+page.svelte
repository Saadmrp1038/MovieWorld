<script lang="ts">
	import { tmdbOptions } from '$lib/tmdbClient';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../../stores';
	import { goto } from '$app/navigation';
	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});
	let userAvatarValue: any;
	userAvatar.subscribe((value) => {
		userAvatarValue = value;
	});

	$: routeId = $page.url.pathname;
	$: movieId = $page.params.movieId;
	let review = '';

	let movieData: any;

	async function getMovieData() {
		await fetch('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US', tmdbOptions)
			.then((response) => response.json())
			.then((response) => (movieData = response));

		//console.log(movieData['poster_path']);
	}

	let reviewList : any
	let len1 = 0

	async function getReviews() {
		await fetch('/api/get-reviews', {
			method: 'POST',
			body: JSON.stringify({
				movieId: movieId
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				reviewList = data.reviewList
				len1 = Object.keys(reviewList).length 
				console.log(reviewList)
				console.log(len1)
			});
	}
	
	onMount(() => {
		getMovieData();
		getReviews()
	});
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Movie Details</p>
	</div>
	{#if movieData != null}
		<div class="flex flex-col items-center">
			<div class="card card-compact w-96 bg-base-100 shadow-xl">
				<figure>
					<img src="https://image.tmdb.org/t/p/w780/{movieData['poster_path']}" alt="" />
				</figure>
				<div class="card-body">
					<h2 class="card-title">{movieData['original_title']}</h2>
					<p>{movieData['overview']}</p>
					<p><span class="font-bold">Budget</span>: {movieData['budget']}$</p>
					<p><span class="font-bold">Reveneu</span>: {movieData['revenue']}$</p>
					<p><span class="font-bold">Runtime</span>: {movieData['runtime']}minutes</p>
					<p><span class="font-bold">Release Date</span>: {movieData['release_date']}</p>
				</div>
			</div>
		</div>
	{/if}
	<div class="flex lfex-col justify-center">
		<a href="{routeId}/write-review"
			><button class="my-5 btn btn-secondary max-w-lg">Write Review</button></a
		>
	</div>
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Reviews</p>
	</div>
</body>
