<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';

	let username = '';
	let password = '';

	async function login(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		// console.log(data.get('username'));
		// console.log(data.get('password'));
		username = '';
		password = '';

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
				} else {
					toast.error('Invalid Credentials !!!');
				}
			});
	}

	// export let data;
</script>

<body class="bg-slate-600 h-screen">

<Toaster />

<p class="text-4xl font-bold text-center py-10 text-orange-300">Welcome to MovieWorld</p>

<div class="relative flex flex-col justify-center overflow-hidden">
    <div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center text-purple-700">DaisyUI</h1>
        <form class="space-y-4" on:submit|preventDefault={login}>
            <div>
                <label class="label">
                    <span class="text-base label-text">Username</span>
                </label>
                <input type="text" name="username" bind:value={username} class="w-full input input-bordered input-primary" />
            </div>
            <div>
                <label class="label">
                    <span class="text-base label-text">Password</span>
                </label>
                <input type="password" name="password" bind:value={password}
                    class="w-full input input-bordered input-primary" />
            </div>
            <div>
                <button type='submit' class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
</div>

</body>