<script lang="ts">
    import { getChapter } from '../api/bible';

    export var translation: String;
    export var book: Number;
    export var chapter: Number;

    let chapterResult: Promise<Object>;

    $: if(translation && chapter >= 0 && book >= 0) {
        chapterResult = getChapter(translation, book, chapter);
    }
</script>


{#await chapterResult}
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
{:then chapter}
    {#each chapter['verses'] as verse }
        <p class="mb-2"><sup>{verse['verse'] + 1}</sup>
            {#each verse['chunks'] as chunk }
                {#if chunk['strong']}
                    <span>{chunk['text']}<sup>{chunk['strong']['number']}</sup>{' '}</span>
                {:else}
                    <span>{chunk['text'] + ' '}</span>
                {/if}
            {/each}
        </p>
    {/each}
{/await}