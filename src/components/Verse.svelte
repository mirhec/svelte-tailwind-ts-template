<script lang="ts">
    import { hoveredStrong } from "../stores";
import StrongDetails from "./StrongDetails.svelte";

    export var verse: Object;
    let detailStrong: Number;
</script>

<p class="mb-2 prose-lg"><sup class="text-blue-400">{verse['verse'] + 1}</sup>
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
    <!-- <h3>Details zu Strong #{detailStrong}</h3>
    <button on:click={() => detailStrong = 0}>Close</button> -->
{/if}