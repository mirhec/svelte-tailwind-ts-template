<script lang="ts">
    import { getSearchResults } from '../../api/bible';
    import { resultCount } from "../../stores";
    import { useParams } from "svelte-navigator";

    import TranslationChooser from '../TranslationChooser.svelte';
    import Verse from '../Verse.svelte';

    export var translation: String;
    export let translations: Array<String>;

    let searchDetails: Promise<Array<Object>>;

    const params = useParams();

    $: if ('query' in $params) {
        searchDetails = getSearchResults(translation, $params['query']);
    }
    // TODO:
    // $: $resultCount = !!refsWithContent ? refsWithContent.length : 0;
</script>

<TranslationChooser class="mb-5" translations={translations} bind:selected={translation} />

{#await searchDetails then details}
    {#each details as verseRef}
        <Verse translation={translation} {verseRef} />
    {/each}
{/await}