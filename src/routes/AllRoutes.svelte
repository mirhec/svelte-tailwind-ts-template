<script lang="ts">
	import { Route } from "svelte-navigator";
    import Layout from "../components/Layout.svelte";
	import { translation1, translation2, translation3 } from "../stores";
    import { getTranslations } from '../api/bible';
  import Chapter from "../components/verselist/Chapter.svelte";
  import SearchResultList from "../components/verselist/SearchResultList.svelte";
  import StrongResultList from "../components/verselist/StrongResultList.svelte";

	const translations = getTranslations();
</script>

<Route path="/:book/:chapter/*" let:params>
    <Layout>
        {#await translations then translationList}
            <div class="column is-third">
                <Chapter bind:translation={$translation1} translations={translationList} />
            </div>
            <div class="column is-third">
                <Chapter bind:translation={$translation2} translations={translationList} />
            </div>
            <div class="column is-third">
                <Chapter bind:translation={$translation3} translations={translationList} />
            </div>
        {/await}
    </Layout>
</Route>
<Route path="/strongs/greek/:greek_strong" let:params>
    <Layout>
        {#await translations then translationList}
            <div class="column is-third">
                <StrongResultList bind:translation={$translation1} translations={translationList} />
            </div>
            <div class="column is-third">
                <StrongResultList bind:translation={$translation2} translations={translationList} />
            </div>
            <div class="column is-third">
                <StrongResultList bind:translation={$translation3} translations={translationList} />
            </div>
        {/await}
    </Layout>
</Route>
<Route path="/strongs/hebrew/:hebrew_strong" let:params>
    <Layout>
        {#await translations then translationList}
            <div class="column is-third">
                <StrongResultList bind:translation={$translation1} translations={translationList} />
            </div>
            <div class="column is-third">
                <StrongResultList bind:translation={$translation2} translations={translationList} />
            </div>
            <div class="column is-third">
                <StrongResultList bind:translation={$translation3} translations={translationList} />
            </div>
        {/await}
    </Layout>
</Route>
<Route path="/:query" let:params>
    <Layout>
        {#await translations then translationList}
            <div class="column is-third">
                <SearchResultList bind:translation={$translation1} translations={translationList} />
            </div>
            <div class="column is-third">
                <SearchResultList bind:translation={$translation2} translations={translationList} />
            </div>
            <div class="column is-third">
                <SearchResultList bind:translation={$translation3} translations={translationList} />
            </div>
        {/await}
    </Layout>
</Route>
<Route path="/">
    <Layout>
        {#await translations then translationList}
            <div class="column is-third">
                <Chapter bind:translation={$translation1} translations={translationList} />
            </div>
            <div class="column is-third">
                <Chapter bind:translation={$translation2} translations={translationList} />
            </div>
            <div class="column is-third">
                <Chapter bind:translation={$translation3} translations={translationList} />
            </div>
        {/await}
    </Layout>
</Route>