<script lang="ts">
    import { book, chapter } from '../../stores';
    import { useParams } from "svelte-navigator";

    import TranslationChooser from '../TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';
    import { getChapter } from "../../api/bible";
    import Spinner from "../Spinner.svelte";
    import Verse from "../Verse.svelte";

    export var translation: String;
    export let translations: Array<String>;

    const params = useParams();

    $: if ('book' in $params && 'chapter' in $params) {
        $book = to_number($params['book']);
        $chapter = to_number($params['chapter']);
    }

    let chapterResult: Promise<Object>;

    $: if (translation && $chapter >= 0 && $book >= 0) {
        chapterResult = getChapter(translation, $book, $chapter);
    }
</script>

<TranslationChooser class="mb-5" translations={translations} bind:selected={translation} />
{#await chapterResult}
    <Spinner/>
{:then res}
    {#if !!res && "verses" in res}
        {#each res["verses"] as verse}
            <Verse translation={translation} {verse} />
        {/each}
    {:else}
        <p>This chapter does not exist in this translation ...</p>
    {/if}
{/await}