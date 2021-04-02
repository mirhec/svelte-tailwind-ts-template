<script>
	import SearchField from "./SearchField.svelte";
	import { chapter } from '../stores';

	function incrementChapter() {
		chapter.update(n => n+1);
	}
	function decrementChapter() {
		chapter.update(n => n-1);
	}
</script>

<header class="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
	<!-- Logo text or image -->
	<div class="flex items-center justify-between mb-4 md:mb-0">
		<h1 class="leading-none text-2xl text-grey-darkest">
			<a class="no-underline text-grey-darkest hover:text-black" href="#">strongs.de</a>
		</h1>

		<a class="text-black hover:text-orange md:hidden" href="#">
			<i class="fa fa-2x fa-bars" />
		</a>
	</div>
	<!-- END Logo text or image -->

	<!-- Search field -->
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click="{decrementChapter}">
		Previous
	</button>
	<SearchField/>
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click="{incrementChapter}">
		Next
	</button>
	<!-- END Search field -->

	<!-- Global navigation -->
	<nav>
		<ul class="list-reset md:flex md:items-center">
			<li class="md:ml-4">
				<a
					class="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
					href="#"
				>
					Impressum
				</a>
			</li>
		</ul>
	</nav>
	<!-- END Global navigation -->
</header>

<slot />