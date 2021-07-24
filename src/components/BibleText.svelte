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
    $: if ('greek_strong' in $params) {
        strongDetails = getStrongDetails($translation, 'greek', to_number($params['greek_strong']));
    }
</script>

<div class="grid grid-cols-4 gap-5 mt-10">
    <div/>
    <div class="col-span-2 break-words">
        <TranslationChooser class="mb-5" translations={getTranslations()} bind:selected={$translation} />
        {#if 'greek_strong' in $params}
            {#await strongDetails then details}
                {#if 'refs' in details}
                    <VerseList refs={details['refs']} />
                {:else}
                    <p>No verses found for greek strong number {$params['greek_strong']} ...</p>
                {/if}
            {/await}
        {:else}
            <VerseList translation={$translation} book={$book} chapter={$chapter} />
        {/if}
    </div>
    <div/>
</div>