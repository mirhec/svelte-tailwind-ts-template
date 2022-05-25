<script lang="ts">
    import { getChapter } from "../api/bible";
    import Spinner from "./Spinner.svelte";
    import Verse from "./Verse.svelte";

    export var translation: String;
    export var book: Number = undefined;
    export var chapter: Number = undefined;
    export var refs: Array<String> = undefined;

    let chapterResult: Promise<Object>;

    $: if (translation && chapter >= 0 && book >= 0) {
        chapterResult = getChapter(translation, book, chapter);
    }
</script>

{#if !!refs}
    {#each refs as ref}
        <Verse translation={translation} {ref} />
    {/each}
{:else}
    {#await chapterResult}
        <Spinner/>
    {:then chapter}
        {#if !!chapter && "verses" in chapter}
            {#each chapter["verses"] as verse}
                <Verse translation={translation} {verse} />
            {/each}
        {:else}
            <p>This chapter does not exist in this translation ...</p>
        {/if}
    {/await}
{/if}
