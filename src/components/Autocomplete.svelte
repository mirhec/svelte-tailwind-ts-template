<script lang="ts">
    export var label: string;
    export var name: string;
    export var query: string = "";
    export var placeholder: string;
    export var searchFunction: (query: string) => string[];
    export var selectedItem: string;

    let matches: string[] = [];
    let activeIndex = -1;

    $: if (selectedItem) {
        query = selectedItem;
        matches = [];
    }

    $: if (query) activeIndex = -1;

    const inputChanged = (e: KeyboardEvent) => {
      if (e.key == 'Enter') {
        if (activeIndex > -1) {
          selectedItem = matches[activeIndex];
        } else {
          selectedItem = query;
        }
      } else if (e.key == 'ArrowUp') {
        activeIndex -= activeIndex > 0 ? 1 : 0;
      } else if (e.key == 'ArrowDown') {
        // down
        activeIndex += activeIndex < matches.length - 1 ? 1 : 0;
      } else {
        matches = searchFunction(query);
      }
    }
</script>

<div class="field">
    {#if label}
        <span class="label">{label}</span>
    {/if}
    <div class="control">
      <div class={`dropdown ${matches.length > 0 ? "is-active" : ""}`}>
        <div class="dropdown-trigger">
          <input
            type="text"
            class="input"
            name={name}
            bind:value={query}
            on:keyup={inputChanged}
            placeholder={placeholder}
          />
        </div>
        <div class="dropdown-menu">
            {#if matches.length > 0}
                <div class="dropdown-content">
                    {#each matches as match, index}
                        <a class={`dropdown-item ${index == activeIndex ? "is-active" : ""}`}
                           on:click={() => selectedItem = match}
                        >
                            {match}
                        </a>
                    {/each}
                </div>
          {/if}
        </div>
      </div>
    </div>
  </div>