<script lang="ts">
    import { getStrongDetails } from '../../api/bible';
    import { useParams } from "svelte-navigator";

    import TranslationChooser from '../TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';
    import Verse from '../Verse.svelte';

    export var translation: String;
    export let translations: Array<String>;
    let strongDetails: Promise<Object | Array<String>>;

    const params = useParams();

    $: if ('greek_strong' in $params || 'hebrew_strong' in $params) {
        strongDetails = getStrongDetails(translation, 'greek_strong' in $params ? 'greek' : 'hebrew', to_number($params['greek_strong'] ?? $params['hebrew_strong']));
    }
    // TODO:
    // $: $resultCount = !!refs ? refs.length : 0;
</script>

<TranslationChooser class="mb-5" translations={translations} bind:selected={translation} />

{#await strongDetails then details}
    {#if details && 'refs' in details}
        {#each details['refs'] as ref}
            <Verse translation={translation} verseRef={ref} />
        {/each}
    {:else}
        <p>Keine Verse für {'greek_strong' in $params ? 'gr.' : 'heb.'} Strong Nummer {$params['greek_strong'] ?? $params['hebrew_strong']} ...</p>
    {/if}
{/await}