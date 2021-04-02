<script lang="ts">
	// import LoginForm from "./components/LoginForm.svelte"
	// import LogoutButton from "./components/LogoutButton.svelte";
	import Chapter from './components/Chapter.svelte';
import Layout from './components/Layout.svelte';
	import { accessToken, refreshToken } from "./stores";
</script>

<!-- {#if $accessToken && $refreshToken}
	<LogoutButton/>
{:else}
	<LoginForm/>
{/if} -->
<Layout>
	<Chapter/>
</Layout>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
