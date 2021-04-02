<script lang="ts">
    import { searchText, translation, chapter, book } from '../stores';
    import { getChapter } from '../api/bible';

    let chapterResult: Object = undefined;

    $: if($chapter >= 0 && $book >= 0) {
        getChapter($translation, $book, $chapter).then(result => chapterResult = result);
    }
</script>

{#if chapterResult}
    {#each chapterResult['verses'] as verse }
        {#each verse['chunks'] as chunk }
            {chunk['text']}&nbsp;
        {/each}
    {/each}
{/if}