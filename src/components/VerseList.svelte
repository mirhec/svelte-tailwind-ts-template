<script lang="ts">
    import { getChapter } from '../api/bible';
    import Verse from './Verse.svelte';

    export var translation: String;
    export var book: Number;
    export var chapter: Number;
    export var refs: Array<String>;

    let chapterResult: Promise<Object>;

    $: if(translation && chapter >= 0 && book >= 0) {
        chapterResult = getChapter(translation, book, chapter);
    }
</script>

<!-- {translation} -->

{#if !!refs}
    {#each refs as ref}
        <Verse ref={ref} />
    {/each}
{:else}
    {#await chapterResult}
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    {:then chapter}
        {#if !!chapter && 'verses' in chapter}
            {#each chapter['verses'] as verse}
                <Verse verse={verse} />
            {/each}
        {:else}
            <p>This chapter does not exist in this translation ...</p>
        {/if}
    {/await}
{/if}