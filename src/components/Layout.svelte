<script>
	import SearchField from "./SearchField.svelte";
	import { book, chapter, chapterCount } from '../stores';
    import { useParams, useNavigate } from "svelte-navigator";
	import { to_number } from "svelte/internal";

    const params = useParams();
	const navigate = useNavigate();

	function doNavigation(newBook, newChapter) {
		if (newBook > 1 && newChapter < 0) {
			newBook -= 1;
			newChapter = chapterCount[newBook] - 1;
		} else if (newBook <= 1) {
			newChapter = 0;
		}

		if (newBook < 65 && newChapter >= chapterCount[newBook]) {
			newChapter = 0;
			newBook += 1;
		} else if (newBook >= 65) {
			newChapter = chapterCount[newBook] - 1;
		}
		console.log(newChapter);
		navigate(`/${newBook}/${newChapter}`);
	}

	function incrementChapter() {
		let newChapter = $chapter;
		let newBook = $book;
		if('chapter' in $params && 'book' in $params) {
			newChapter = to_number($params['chapter']) + 1;
			newBook = to_number($params['book']);
		} else {
			newChapter += 1;
		}
		doNavigation(newBook, newChapter);
	}
	function decrementChapter() {
		let newChapter = $chapter;
		let newBook = $book;
		if('chapter' in $params && 'book' in $params) {
			newChapter = to_number($params['chapter']) - 1;
			newBook = to_number($params['book']);
		} else {
			newChapter -= 1;
		}
		console.log(newChapter);
		doNavigation(newBook, newChapter);
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
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" on:click="{decrementChapter}">
		Previous
	</button>
	<SearchField/>
	<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" on:click="{incrementChapter}">
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