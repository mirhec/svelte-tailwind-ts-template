<script lang="ts">
    import { getStrongDetails, getSearchResults } from '../api/bible';
    import { book, chapter } from '../stores';
    import { useParams } from "svelte-navigator";

    import VerseList from './VerseList.svelte';
    import TranslationChooser from './TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';

    export var translation: String;
    export let translations: Array<String>;
    let strongDetails: Promise<Object | Array<String>>;
    let searchDetails: Promise<Array<Object>>;

    const params = useParams();

    $: if ('book' in $params && 'chapter' in $params) {
        $book = to_number($params['book']);
        $chapter = to_number($params['chapter']);
    }
    $: if ('greek_strong' in $params || 'hebrew_strong' in $params) {
        strongDetails = getStrongDetails(translation, 'greek_strong' in $params ? 'greek' : 'hebrew', to_number($params['greek_strong'] ?? $params['hebrew_strong']));
    }
    $: if ('query' in $params) {
        searchDetails = getSearchResults(translation, $params['query']);
    }
</script>

<TranslationChooser class="mb-5" translations={translations} bind:selected={translation} />
{#if strongDetails}
    {#await strongDetails then details}
        {#if details && 'refs' in details}
            <VerseList translation={translation} refs={details['refs']} />
        {:else if details && Array.isArray(details)}
            <VerseList translation={translation} refs={details} />
        {:else}
            <p>No verses found for {'greek_strong' in $params ? 'greek' : 'hebrew'} strong number {$params['greek_strong'] ?? $params['hebrew_strong']} ...</p>
        {/if}
    {/await}
{:else if searchDetails}
    {#await searchDetails then details}
        <VerseList translation={translation} refsWithContent={details} />
    {/await}
{:else}
    <VerseList translation={translation} book={$book} chapter={$chapter} />
{/if}