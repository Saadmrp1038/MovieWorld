<script lang='ts'>
	import { onMount } from 'svelte';
    import { userProfile } from '../../../../stores';
    let userProfileValue: any;
	userProfile.subscribe(value => {
		userProfileValue = value;
	});

	let reviewData : any;
	let reviewCount = 0;

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
			});
	}

	onMount(()=>{
		getIndividualReview(userProfileValue.username)
	})

</script>

<body class="bg-[#2A2F42] min-h-screen">
	<div class="flex lfex-col justify-center">
		<p class="text-3xl text-[#c5c5c5] my-5">My Reviews</p>
	</div>
	{#each { length: reviewCount } as _, i}

	<div class="flex justify-center relative top-1/3">
		<!-- This is an example component -->
		<div
			class="relative grid grid-cols-1 gap-4 p-4 mb-8 border border-black rounded-lg shadow-lg w-[800px] bg-[#393d4d]"
		>
			<div class="relative flex gap-4">
				<img
					src={reviewData[i]['avatarUrl']}
					class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20"
					alt=""
					loading="lazy"
				/>
				<div class="flex flex-row place-space-between">
					<div class="flex flex-col w-full">
						<div class="flex flex-row justify-between">
							<p class="relative text-xl whitespace-nowrap truncate overflow-hidden text-white">
								{reviewData[i]['username']}
							</p>
						</div>
						<p class="text-gray-400 text-sm">
							{reviewData[i]['created_at'].toString().split('T')[0]}
						</p>
					</div>
					<div>
						<p class="relative text-xl whitespace-nowrap truncate overflow-hidden text-white">
							★{reviewData[i]['rating']}
						</p>
					</div>
				</div>
			</div>
			<p class="-mt-4 text-white">
				{reviewData[i]['review']}
			</p>
		</div>
	</div>
{/each}
</body>