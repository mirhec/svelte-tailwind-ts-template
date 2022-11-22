<script>
	import SearchField from "./SearchField.svelte";
	import StrongDetails from "./StrongDetails.svelte";
	import { book, bookNames, chapter, chapterCount, lang, searchText, detailStrong } from "../stores";
	import { useParams, useNavigate } from "svelte-navigator";
	import { to_number } from "svelte/internal";
	import Pagination from "./Pagination.svelte";

	const params = useParams();
	const navigate = useNavigate();

	const doNavigation = (newBook, newChapter) => {
		if (newBook > 1 && newChapter < 0) {
			newBook -= 1;
			newChapter = chapterCount[newBook] - 1;
		} else if (newBook <= 0) {
			newChapter = 0;
		}

		if (newBook < 65 && newChapter >= chapterCount[newBook]) {
			newChapter = 0;
			newBook += 1;
		} else if (newBook >= 65) {
			newChapter = chapterCount[newBook] - 1;
		}
		$searchText = bookNames[$lang]['long'][newBook] + " " + (newChapter + 1);
		navigate(`/${newBook}/${newChapter}`);
	}

	const incrementChapter = () => {
		let newChapter = $chapter;
		let newBook = $book;
		if ("chapter" in $params && "book" in $params) {
			newChapter = to_number($params["chapter"]) + 1;
			newBook = to_number($params["book"]);
		} else {
			newChapter += 1;
		}
		doNavigation(newBook, newChapter);
	}
	const decrementChapter = () => {
		let newChapter = $chapter;
		let newBook = $book;
		if ("chapter" in $params && "book" in $params) {
			newChapter = to_number($params["chapter"]) - 1;
			newBook = to_number($params["book"]);
		} else {
			newChapter -= 1;
		}
		doNavigation(newBook, newChapter);
	}
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img
				src="https://strongs.de/static/images/logo.png"
			/>
		</a>

		<a
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbarBasicExample"
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div class="navbar-menu">
		<div class="navbar-start navbar-start--centered">
			<div class="navbar-item">
				<button class="button" on:click={decrementChapter}>
					<span class="icon"><i class="fas fa-angle-left"></i></span>
				</button>
			</div>
			<div class="navbar-item">
				<SearchField/>
			</div>
			<div class="navbar-item">
				<button class="button" on:click={incrementChapter}>
					<span class="icon"><i class="fas fa-angle-right"></i></span>
				</button>
			</div>
		</div>

		<div class="navbar-end">
		</div>
	</div>
</nav>

<section class="section">
    <div class="conatiner">
        <div class="columns is-centered">
			<slot></slot>
			{#if $detailStrong.strongNr > 0}
				<StrongDetails on:close={() => $detailStrong.strongNr = -1} />
			{/if}
        </div>
    </div>
</section>

<Pagination/>

<style lang="css">
	.navbar-start--centered {
		flex-grow: 1;
		justify-content: center;
	}
</style>