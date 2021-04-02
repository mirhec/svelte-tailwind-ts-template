<script>
    import {searchText} from '../stores';
</script>

<form class="mb-4 w-full md:mb-0 md:w-1/4">
    <label class="hidden" for="search-form">Search</label>
    <input
        class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full"
        placeholder="Suche"
        type="text"
        bind:value="{$searchText}"
    />
    <button class="hidden">Submit</button>
</form>