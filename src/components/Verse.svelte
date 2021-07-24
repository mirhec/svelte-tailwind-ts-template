<script lang="ts">
    import { Link } from 'svelte-navigator';
    import { to_number } from "svelte/internal";
    import { getVerse } from "../api/bible";
    import { hoveredStrong, translation, lang } from "../stores";
    import StrongDetails from "./StrongDetails.svelte";
    import bookNames from 'bible-book-names';

    export var verse: Object;
    export var ref: String;
    var refBook: Number;
    var refChapter: Number;
    var refVerse: Number;

    let detailStrong: Number;

    $: if (!!ref) {
        let parts = ref.split('_');
        if (parts.length == 3) {
            refBook = to_number(parts[0]);
            refChapter = to_number(parts[1]);
            refVerse = to_number(parts[2]);
            getVerse($translation, refBook, refChapter, refVerse)
                .then(res => verse = res);
        }
    }
</script>

{#if !!verse}
    <p class="mb-2 prose-lg">
        {#if !ref}
            <sup class="text-blue-400">{verse['verse'] + 1}</sup>
        {:else}
            <sup class="text-blue-400"><Link to="/{refBook}/{refChapter}/{refVerse}">{bookNames[$lang][refBook]} {refChapter + 1},{refVerse + 1}</Link></sup>
        {/if}
        {#each verse['chunks'] as chunk }
            {#if chunk['strong']}
                <span>{chunk['text']}
                    <sup class="text-gray-400 cursor-pointer"
                        class:bg-yellow-100={$hoveredStrong == chunk['strong']['number']}
                        on:mouseover={() => $hoveredStrong = chunk['strong']['number']}
                        on:click={() => detailStrong = detailStrong > 0 ? 0 : chunk['strong']['number']}>
                        {chunk['strong']['number']}
                    </sup>
                    {' '}
                </span>
            {:else}
                <span>{chunk['text'] + ' '}</span>
            {/if}
        {/each}
    </p>
    {#if detailStrong > 0}
        <StrongDetails bind:strongNumber={detailStrong} on:close={() => detailStrong = 0} />
    {/if}
{/if}