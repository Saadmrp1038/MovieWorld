<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import { userProfile, userAvatar } from '../../../../../stores';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

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


	let rating = 10;
	let review = '';

	function update0(event: Event) {rating = 0;}
    function update1(event: Event) {rating = 1;}
    function update2(event: Event) {rating = 2;}
    function update3(event: Event) {rating = 3;}
    function update4(event: Event) {rating = 4;}
    function update5(event: Event) {rating = 5;}
    function update6(event: Event) {rating = 6;}
    function update7(event: Event) {rating = 7;}
    function update8(event: Event) {rating = 8;}
    function update9(event: Event) {rating = 9;}
    function update10(event: Event) {rating = 10;}

	async function create(event: Event) {
		console.log(rating);
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		rating = 0;
		review = '';

		// console.log(data.get('threadTitle'))
		// console.log(data.get('threadContent'))

		await fetch('/api/post-review', {
			method: 'POST',
			body: data
		}).then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			toast.success('Review Posted Successfully');
			goto('/main/movie/' + movieId);
			return response.json(); // Parse the JSON response
		});
	}
</script>

<Toaster />

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex flex-col items-center my-10">
		<p class="text-3xl text-[#c5c5c5] my-5">Write Review</p>
		<form on:submit|preventDefault={create} class="space-y-10">
			<label class="input-group">
				<span>Rating</span>
				<div class="rating rating-lg rating-half">
					<input on:click={update0} type="radio" name="rating-10" class="rating-hidden" />
					<input on:click={update1} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
					<input on:click={update2} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
					<input on:click={update3} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
					<input on:click={update4} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
					<input on:click={update5} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
					<input on:click={update6} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
					<input on:click={update7} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
					<input on:click={update8} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
					<input on:click={update9} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-1" />
					<input on:click={update10} type="radio" name="rating-10" class="bg-green-500 mask mask-star-2 mask-half-2" />
				</div>
			</label>

			<div class="input-group">
				<span>Review</span>
				<textarea
					class="textarea textarea-bordered textarea-lg w-full max-w-xs"
					name="review"
					bind:value={review}
				/>
			</div>
            <input type="hidden" name="rating" bind:value={rating} />
			<input type="hidden" name="movieId" value={movieId} />
			<input
				type="hidden"
				name="avatarUrl"
				value={userAvatarValue.url}
				class="input input-bordered"
			/>
			<input
				type="hidden"
				name="username"
				value={userProfileValue.username}
				class="input input-bordered"
			/>
			<div class="flex felx-col justify-center">
				<button type="submit" class="btn btn-accent">Create</button>
			</div>
		</form>
	</div>
</body>
