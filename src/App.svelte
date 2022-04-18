<script lang="ts">
	import { Router } from "svelte-navigator";

	import AllRoutes from "./routes/AllRoutes.svelte";

	export let url = "";
</script>

<Router url="{url}">
	<AllRoutes />
</Router>
