<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userProfile, userAvatar } from '../../../../../../stores';
	import { goto } from '$app/navigation';
	import { tmdbOptions } from '$lib/tmdbClient';
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

	let memberList: any;
	let memberCount: any;
	let reviewData: any;
	let reviewCount: any;
	let arr: any = [];

	$: mapSize = map.size;

	let map = new Map<number, number>();
	let movieData: any;
	let len1 = 0;

	async function getRecc(reviewData: any) {
		await fetch(
			'https://api.themoviedb.org/3/movie/' +
				reviewData[Object.keys(reviewData).length-1]['movieId'] +
				'/recommendations?language=en-US&page=1',
			tmdbOptions
		)
			.then((response) => response.json())
			.then((response) => (movieData = response.results));

		len1 = Object.keys(movieData).length;
		console.log(len1);
	}

	async function getIndividualReview(username: string) {
		await fetch('/api/get-ind-reviews', {
			method: 'POST',
			body: JSON.stringify({
				username: username
			})
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the JSON response
			})
			.then((data) => {
				reviewData = data.reviewData;
				reviewCount = Object.keys(reviewData).length;
				// console.log(username)
				//console.log(reviewData);

                getRecc(reviewData)
			});
	}

	// async function getMembers() {
	// 	await fetch('/api/get-group-members', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			groupId: groupId
	// 		})
	// 	})
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			return response.json(); // Parse the JSON response
	// 		})
	// 		.then((data) => {
	// 			memberList = data.memberList;
	// 			memberCount = Object.keys(memberList).length;
	// 			//console.log(memberList)

	// 			for (let i = 0; i < memberCount; i++) {
	// 				getIndividualReview(memberList[i]['username']);
	// 			}
	// 			return true;
	// 		})
	// 		.then((res) => {
	//             console.log("here")
	// 			for (let [key, value] of map) {
	// 				console.log(key + ' ' + value);
	// 			}
	// 		});
	// }
	//[['cat', 10],['dog',20],['fish',30]]
	onMount(() => {
		getIndividualReview(userProfileValue.username);
	});

	function movieClicked(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const movieId = data.get('movieId');

		goto('/main/movie/' + movieId);
	}
</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">Group Trends</p>
	</div>
    <div class="flex flex-col items-center">
	{#each { length: Math.min(len1, 10) } as _, i}
        <form on:submit|preventDefault={movieClicked} class="card card-compact w-96 bg-base-100 shadow-xl m-8">
            <button type='submit'>
			<div>
				<figure class="hover:scale-110">
					<img
						src="https://image.tmdb.org/t/p/w500/{movieData[i]['poster_path']}"
						alt=""
					/>
				</figure>
				<!-- <div class="card-body">
					<h2 class="card-title">{movieData[i]['original_title']}</h2>
					<p>{movieData[i]['overview']}</p>
				</div> -->
			</div>
            <input type="hidden" name="movieId" value={movieData[i]['id']}>
        </button>
        </form>
		{/each}
    </div>
</body>
