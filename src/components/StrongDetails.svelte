<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Link } from "svelte-navigator";
    import { getStrongDetails, getVerse } from "../api/bible";
    import { book, chapter, originTranslation, translation1 } from "../stores";
    import Spinner from "./Spinner.svelte";

    const dispatch = createEventDispatcher();

    export var strongNumber: Number;
    export var verseNumber: Number;
    let response: Promise<Object>;
    let wordGrammar: string;
    let wordGrammarUnsure = false;

    $: if (strongNumber > 0) {
        response = getStrongDetails(
            $translation1,
            $book < 39 ? "hebrew" : "greek",
            strongNumber
        );
        getVerse($originTranslation, $book, $chapter, verseNumber).then(verse => {
            verse['chunks'].forEach(chunk => {
                if (chunk['strong'] && chunk['strong']['number'] === strongNumber) {
                    let grammar = chunk['strong']['grammar'];
                    if (wordGrammar && grammar !== wordGrammar) {
                        wordGrammarUnsure = true;
                    }
                    if (!wordGrammar) wordGrammar = grammar;
                }
            });
        });
    }

    function getVariants(variants: Array<Object>) {
        return variants.sort((o1, o2) => o2["count"] - o1["count"]);
    }

    function closeButtonClicked() {
        dispatch("close", {});
    }
</script>

{#await response}
    <Spinner/>
{:then details}
    <article class="panel is-primary">
        <p class="panel-heading">
            Details for {$book <= 39 ? "hebrew" : "greek"} strong #{strongNumber}
        </p>
        <div class="panel-block">
            <div class="ml-2">
                <h4>Translation variants:</h4>
                <div class="ml-2">
                    <ul>
                        {#each getVariants(details["variants"]) as variant}
                            <li>{variant["variant"]}: {variant["count"]}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>

        <div class="panel-block">
            {#if wordGrammar && wordGrammarUnsure}
                <span><b>Grammar: </b> {wordGrammar} (unsure)</span>
            {:else if wordGrammar}
                <span><b>Grammar: </b> {wordGrammar}</span>
            {/if}
        </div>

            {#if $book < 39}
                <Link class="panel-block" to="/strongs/hebrew/{strongNumber}"
                    >Show all occurences >></Link
                >
            {:else}
                <Link class="panel-block" to="/strongs/greek/{strongNumber}"
                    >Show all occurences >></Link
                >
            {/if}

        <div class="panel-block">
            <button class="button card-footer-item" on:click={closeButtonClicked}>Close</button>
        </div>
    </article>
{/await}