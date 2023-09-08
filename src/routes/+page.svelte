<script lang="ts">
    import toast, {Toaster} from 'svelte-french-toast'

	let username = '';
	let password = '';

	async function login(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		// console.log(data.get('username'));
		// console.log(data.get('password'));

		await fetch('/api/login', {
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
				const loginStatus = data.success;
				console.log('Login Status: ' + loginStatus);

				if (loginStatus) {
					window.location.href = '/homepage';
				}
                else{
                    toast.error('Invalid Credentials !!!')
                }
			});
	}

	// export let data;
</script>

<Toaster/>

<h1>Welcome to MovieWorld</h1>

<form on:submit|preventDefault={login}>
	<div>
		<label for="username">Username</label>
		<input type="text" name="username" bind:value={username} />
	</div>
	<div>
		<label for="password">Password</label>
		<input type="password" name="password" bind:value={password} />
	</div>
	<button type="submit">Submit</button>
</form>
