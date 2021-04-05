<script lang="ts">
    // import { createEventDispatcher } from 'svelte';

    export var translations: Array<Object>;
    export var selected: String;
    // const dispatch = createEventDispatcher();

	// $: dispatch('translationChanged', {
	// 	identifier: selected
	// });
</script>

<div class={$$props.class}>
    <select bind:value={selected}>
        {#each translations as translation}
            {#if 'name' in translation && 'identifier' in translation}
                <option value="{translation['identifier']}">{translation['name']}</option>
            {/if}
        {/each}
    </select>
</div>