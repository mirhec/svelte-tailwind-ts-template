<script>
    import { searchText, bookNames, lang } from "../stores";
    import Autocomplete from "./Autocomplete.svelte";
	import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();

    let longBibleBooks = bookNames[$lang]["long"];
    let searchStrings = bookNames[$lang]["search"];
    let selectedItem = "";
    const regex = /([0-9]?.?\s?[a-zA-ZäöüÄÖÜ]+)[^a-zA-Z0-9]?([0-9]+)?[^a-zA-Z0-9]?([0-9]+)?/;

    $: if (selectedItem) {
        $searchText = selectedItem;
        search();
    }

    const getItems = (text) => {
        const result = regex.exec(text);
        let results = [];
        if(result != null) {
            var book = result[1].replaceAll(" ", "");
            var chapter = result[2];
            var vers = result[3];
            for(var i = 0; i < longBibleBooks.length; ++i) {
                if(searchStrings[i].toLowerCase().indexOf("," + book.toLowerCase()) > -1) {
                    results.push(longBibleBooks[i] + (chapter != null ? " " + chapter + (vers != null ? "," + vers : ''): ''));
                }
            }
        }
        return results;
    };

    const search = () => {
        const result = regex.exec($searchText);
        if (result != null) {
            var book = result[1];
            var chapter = result[2];
            var bookIndex = bookNames[$lang]["long"].indexOf(book);
            if (bookIndex > -1) {
                navigate(`/${bookIndex}/${chapter-1}`);
            } else {
                navigate(`/${$searchText}`);
            }
        } else {
            navigate(`/${$searchText}`);
        }
    }
</script>

<div class="field has-addons">
    <p class="control">
        <Autocomplete placeholder="Type passage ..." searchFunction={getItems} bind:query={$searchText} bind:selectedItem={selectedItem} />
    </p>
    <p class="control">
        <button class="button is-primary" on:click={search}> Suchen </button>
    </p>
</div>
