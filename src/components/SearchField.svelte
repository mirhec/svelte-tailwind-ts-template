<script>
    import { searchText, bookNames, lang } from "../stores";
    import AutoComplete from "simple-svelte-autocomplete";
	import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();

    let longBibleBooks = bookNames[$lang]["long"];
    let searchStrings = bookNames[$lang]["search"];
    const regex = /([0-9]?.?\s?[a-zA-ZäöüÄÖÜ]+)[^a-zA-Z0-9]?([0-9]+)?[^a-zA-Z0-9]?([0-9]+)?/;

    function getItems(text) {
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

    function search() {
        const result = regex.exec($searchText);
        if (result != null) {
            var book = result[1];
            var chapter = result[2];
            // var vers = result[3];
            var bookIndex = bookNames[$lang]["long"].indexOf(book);
            if (bookIndex > -1) {
                navigate(`/${bookIndex}/${chapter-1}`);
            }
        }
    }

    function onKeyPress(e) {
        if (e.charCode === 13) search();
    };
</script>

<div class="field has-addons">
    <p class="control">
        <!-- <input class="input is-primary" type="text" placeholder="Suche" on:keypress={onKeyPress} bind:value={$searchText}> -->
        <AutoComplete localFiltering={false} searchFunction={getItems} bind:selectedItem={$searchText} />
    </p>
    <p class="control">
        <button class="button is-primary" on:click={search}> Suchen </button>
    </p>
</div>
