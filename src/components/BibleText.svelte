<script lang="ts">
    import { getTranslations, getStrongDetails, getSearchResults } from '../api/bible';
    import { translation, translation2, book, chapter } from '../stores';
    import { useParams } from "svelte-navigator";

    import VerseList from './VerseList.svelte';
    import TranslationChooser from './TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';

    let searchDetails: Promise<Object | Array<String>>;
    let translations = getTranslations();

    const params = useParams();

    console.log('params: ' + JSON.stringify($params));

    $: if ('book' in $params && 'chapter' in $params) {
        $book = to_number($params['book']);
        $chapter = to_number($params['chapter']);
    }
    $: if ('greek_strong' in $params || 'hebrew_strong' in $params) {
        searchDetails = getStrongDetails($translation, 'greek_strong' in $params ? 'greek' : 'hebrew', to_number($params['greek_strong'] ?? $params['hebrew_strong']));
    }
    $: if ('query' in $params) {
        searchDetails = getSearchResults($translation, $params['query']);
    }
</script>

<section class="section">
    <div class="conatiner">
        <div class="columns is-centered">
            <div class="column is-half">
                {#await translations then translationList}
                    <TranslationChooser class="mb-5" translations={translationList} bind:selected={$translation} />
                {/await}
                {#if searchDetails}
                    {#await searchDetails then details}
                        {#if details && 'refs' in details}
                            <VerseList translation={$translation} refs={details['refs']} />
                        {:else if details && Array.isArray(details)}
                            <VerseList translation={$translation2} refs={details} />
                        {:else}
                            <p>No verses found for {'greek_strong' in $params ? 'greek' : 'hebrew'} strong number {$params['greek_strong'] ?? $params['hebrew_strong']} ...</p>
                        {/if}
                    {/await}
                {:else}
                    <VerseList translation={$translation} book={$book} chapter={$chapter} />
                {/if}
            </div>
            <div class="column is-half is-hidden-mobile">
                {#await translations then translationList}
                    <TranslationChooser class="mb-5" translations={translationList} bind:selected={$translation2} />
                {/await}
                {#if searchDetails}
                    {#await searchDetails then details}
                        {#if details && 'refs' in details}
                            <VerseList translation={$translation2} refs={details['refs']} />
                        {:else if details && Array.isArray(details)}
                            <VerseList translation={$translation2} refs={details} />
                        {:else}
                            <p>No verses found for {'greek_strong' in $params ? 'greek' : 'hebrew'} strong number {$params['greek_strong'] ?? $params['hebrew_strong']} ...</p>
                        {/if}
                    {/await}
                {:else}
                    <VerseList translation={$translation2} book={$book} chapter={$chapter} />
                {/if}
            </div>
        </div>
    </div>
</section>
