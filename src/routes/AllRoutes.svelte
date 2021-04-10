<script lang="ts">
	import { Router, Link, Route } from "svelte-navigator";
    import BibleText from "../components/BibleText.svelte";
    import Layout from "../components/Layout.svelte";
</script>

<Route path="/:book/:chapter" let:params>
    <Layout>
        <BibleText />
    </Layout>
</Route>
<Route path="/">
    <Layout>
        <BibleText />
    </Layout>
</Route>