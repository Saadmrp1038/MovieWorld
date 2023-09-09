<script>
	import '../../app.css';
</script>

<header
	class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-4 dark:bg-white"
>
	<nav class="flex items-center justify-between max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
		<div class="flex items-center justify-between bg-[#F8D340] p-2 rounded">
			<a class="flex-none text-xl font-semibold text-white dark:text-gray-800 text-black" href="#"
				>MovieWorld</a
			>
		</div>
		<div class="transition-all duration-300 sm:block">
			<div
				class="text-base text-white font-normal flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5"
			>
				<a class="px-3 text-blue-500" href="#">Home</a>
				<a
					class="hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
					href="#" >Search Movies</a
				>
				<a
					class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
					href="#">Search Groups</a
				>
				<a
					class="px-3 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
					href="#">My Groups</a
				>
			</div>
		</div>
        <div>
           <input class="p-2 rounded-md bg-[#0D0F17] text-[#888CA0] border-2 border-[#888CA0]" type="text" name="searchtext" value="Search Movie">
        </div>
	</nav>
</header>

<slot />
