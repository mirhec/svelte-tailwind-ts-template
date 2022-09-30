<script lang="ts">
    import { resultCount } from "../stores";
    import { getChapter } from "../api/bible";
    import Spinner from "./Spinner.svelte";
    import Verse from "./Verse.svelte";
    // import { paginate, LightPaginationNav } from 'svelte-paginate';

    export var translation: String;
    export var book: Number = 0;
    export var chapter: Number = 0;
    export var refs: Array<String> | undefined = undefined;
    export var refsWithContent: Array<Object> | undefined = undefined;

    let chapterResult: Promise<Object>;
    // var items: any[] = [];

    $: if (translation && chapter >= 0 && book >= 0) {
        chapterResult = getChapter(translation, book, chapter);
    }

    $: $resultCount = !!refs ? refs.length : !!refsWithContent ? refsWithContent.length : 0;
    // $: items = refs || refsWithContent;
    // let currentPage = 1
    // let pageSize = 4
    // $: paginatedItems = paginate({ items, pageSize, currentPage })
</script>

{#if !!refs}
    {#each refs as ref}
        <Verse translation={translation} verseRef={ref} />
    {/each}
{:else if !!refsWithContent}
    {#each refsWithContent as verseRef}
        <Verse translation={translation} {verseRef} />
    {/each}
<!-- {#if !!paginatedItems}
    {#each paginatedItems as verseRef}
        <Verse translation={translation} {verseRef} />
    {/each} -->
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

<!-- <LightPaginationNav
  totalItems="{items.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{1}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
/> -->