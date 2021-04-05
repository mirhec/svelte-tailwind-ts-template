<script lang="ts">
    import { getStrongDetails } from "../api/bible";
    import { book, translation } from "../stores";

    export var strongNumber: Number;
    let response: Promise<Object>;

    $: if(strongNumber > 0) {
        response = getStrongDetails($translation, $book, strongNumber);
    }

    function getVariants(variants: Array<Object>) {
        return variants.sort((o1, o2) => o2['count'] - o1['count']);
    }
</script>

<h4>Details for {$book <= 39 ? "hebrew" : "greek"} strong #{strongNumber}</h4>
{#await response}
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
{:then details}
    <ul>
        {#each getVariants(details['variants']) as variant}
            <li>{variant['variant']}: {variant['count']}</li>
        {/each}
    </ul>
{/await}