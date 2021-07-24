<script lang="ts">
    import { getTranslations, getOriginTranslations, getStrongDetails } from '../api/bible';
    import { translation, book, chapter, originTranslation } from '../stores';
    import { useParams } from "svelte-navigator";

    import VerseList from './VerseList.svelte';
    import TranslationChooser from './TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';

    let refs = [];
    let strongDetails: Promise<Object>;

    const params = useParams();

    $: if ('book' in $params && 'chapter' in $params) {
        $book = to_number($params['book']);
        $chapter = to_number($params['chapter']);
    }
    $: if ('greek_strong' in $params || 'hebrew_strong' in $params) {
        strongDetails = getStrongDetails($translation, 'greek_strong' in $params ? 'greek' : 'hebrew', to_number($params['greek_strong'] ?? $params['hebrew_strong']));
    }
</script>

<section class="section">
    <div class="conatiner">
        <div class="columns is-centered">
            <div class="column is-half">
                <TranslationChooser class="mb-5" translations={getTranslations()} bind:selected={$translation} />
                {#if 'greek_strong' in $params || 'hebrew_strong' in $params}
                    {#await strongDetails then details}
                        {#if details && 'refs' in details}
                            <VerseList refs={details['refs']} />
                        {:else}
                            <p>No verses found for {'greek_strong' in $params ? 'greek' : 'hebrew'} strong number {$params['greek_strong'] ?? $params['hebrew_strong']} ...</p>
                        {/if}
                    {/await}
                {:else}
                    <VerseList translation={$translation} book={$book} chapter={$chapter} />
                {/if}
            </div>
        </div>
    </div>
</section>
