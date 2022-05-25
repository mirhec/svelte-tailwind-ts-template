<script lang="ts">
	import { Route } from "svelte-navigator";
    import Layout from "../components/Layout.svelte";
</script>

<Route path="/:book/:chapter/*" let:params>
    <Layout/>
</Route>
<Route path="/strongs/greek/:greek_strong" let:params>
    <Layout/>
</Route>
<Route path="/strongs/hebrew/:hebrew_strong" let:params>
    <Layout/>
</Route>
<Route path="/:query" let:params>
    <Layout/>
</Route>
<Route path="/">
    <Layout/>
</Route>