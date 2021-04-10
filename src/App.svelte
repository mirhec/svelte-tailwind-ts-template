<script lang="ts">
	import { Router } from "svelte-navigator";

	import Layout from './components/Layout.svelte';
	import AllRoutes from "./routes/AllRoutes.svelte";

	export let url = "";
</script>

<Router url="{url}">
	<AllRoutes />
</Router>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
