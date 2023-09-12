<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { userProfile,userAvatar } from '../../../../stores';
	let userProfileValue: any;
	userProfile.subscribe((value) => {
		userProfileValue = value;
	});

	async function upload(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		const file = data.get('file-upload')
		console.log(file)

		await fetch('/api/upload-avatar', {
			method: 'POST',
			body: data
		})
		.then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then((data) => {
            let url : string
            url = data.url['publicUrl']
			url=url+"?v="+Date.now()
			console.log(url)
            $userAvatar = {url: url}
        });
	}
</script>

<div class="flex flex-col items-center">
	<form on:submit|preventDefault={upload}>
		<input type="file" name="file-upload" class="file-input file-input-bordered w-full max-w-xs" />
		<input type='hidden' name="username" value={userProfileValue.username}>
		<button type="submit" class="btn btn-primary">Upload</button>
	</form>
	<!-- <img src={link} alt="not found" /> -->
</div>
