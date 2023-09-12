<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { userProfile } from '../../stores';

	let username = '';
	let password = '';
	let confirmpassword = '';

	async function register(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		if (password != confirmpassword) {
			toast.error("Passwords don't match !!!");
			return;
		}

		username = '';
		password = '';
		confirmpassword = '';

		await fetch('/api/register', {
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
            toast.success("Register Successful")
            goto("/login")
			return;
		});
	}
</script>

<body class="bg-slate-600 min-h-screen">
	<Toaster />

	<p class="text-4xl font-bold text-center py-10 text-orange-300">Welcome to MovieWorld</p>

	<div class="relative flex flex-col justify-center overflow-hidden">
		<div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
			<h1 class="text-3xl font-semibold text-center text-purple-700">Register New Account</h1>
			<form class="space-y-4" on:submit|preventDefault={register}>
				<div>
					<label class="label" for="username">
						<span class="text-base label-text">Username</span>
					</label>
					<input
						type="text"
						name="username"
						bind:value={username}
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div>
					<label class="label" for="password">
						<span class="text-base label-text">Password</span>
					</label>
					<input
						type="password"
						name="password"
						bind:value={password}
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div>
					<label class="label" for="cconfirmpassword">
						<span class="text-base label-text">Confirm Password</span>
					</label>
					<input
						type="confirmpassword"
						name="confirmpassword"
						bind:value={confirmpassword}
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div class="flex flex-row justify-center">
					<button type="submit" class="btn btn-primary">Register</button>
				</div>
				<div/>
			</form>
            <a href="/login">
				<div class="flex flex-row justify-center">
					<button class="btn btn-primary">Cancel</button>
				</div>
			</a>
		</div>
	</div>
</body>
