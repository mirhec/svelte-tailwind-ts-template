<script lang="ts">
    export var translations: Array<Object>;
    export var selected: String;
</script>

<div class={$$props.class}>
    <div class="select">
        <select bind:value={selected}>
            {#each translations as translation}
                {#if 'name' in translation && 'identifier' in translation}
                    <option value="{translation['identifier']}">{translation['name']}</option>
                {/if}
            {/each}
        </select>
    </div>
</div>