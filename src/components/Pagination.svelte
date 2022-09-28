<script lang="ts">
    import { page, totalPages, resultCount, resultsPerPage } from "../stores";

    const handlePage = (value: number) => {
        $page = value;
    }

    let buttons: number[] = [];
    const maxButtons = 4;

    $: $totalPages = Math.floor($resultCount / $resultsPerPage + 1);

    $: console.log("totalPages", $totalPages, "page", $page, "maxButtons", maxButtons);
    $: {
        if ($totalPages <= 0 || $resultCount <= 0) buttons = [];
        else if ($totalPages < maxButtons + 1) buttons = [...Array($totalPages).keys()];
        else if ($totalPages > 0) {
            // var firstPage = Math.max(0, $page - maxButtons/2);
            // var lastPage = Math.min($totalPages - 1, $page + maxButtons/2);
            // if ($page - maxButtons/2 < 0) lastPage += Math.abs($page - maxButtons/2);
            // if ($page + maxButtons/2 >= $totalPages) firstPage -= $page + maxButtons/2 + 1 - $totalPages;

            // console.log($totalPages, $page);
            // buttons = [...Array(lastPage+1).keys()].slice(firstPage, lastPage+1);
        }
    }
</script>

{#if $totalPages > 1}
    <nav class="pagination is-centered navbar is-fixed-bottom" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
            {#if $page > 0}
                <li><a class="pagination-link is-hidden-mobile" on:click={() => handlePage(0)}>
                    <span class="icon"><i class="fas fa-angle-double-left"></i></span>
                </a></li>
                <li><a class="pagination-link" on:click={() => handlePage($page - 1)}>
                    <span class="icon"><i class="fas fa-angle-left"></i></span>
                </a></li>
            {/if}

            {#each buttons as button}
        <!-- <div class={`dropdown ${matches.length > 0 ? "is-active" : ""}`}> -->
                <li><a class={`pagination-link is-primary ${$page == button ? "is-current" : ""}`} on:click={() => handlePage(button)}>
                    {button}
                </a></li>
            {/each}

            {#if $page < $totalPages}
                <li><a class="pagination-link" on:click={() => handlePage($page + 1)}>
                    <span class="icon"><i class="fas fa-angle-right"></i></span>
                </a></li>
                <li><a class="pagination-link is-hidden-mobile" on:click={() => handlePage($totalPages - 1)}>
                    <span class="icon"><i class="fas fa-angle-double-right"></i></span>
                </a></li>
            {/if}
        </ul>
    </nav>
{/if}