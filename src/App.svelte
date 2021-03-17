<script lang="ts">
	import LoginForm from "./components/LoginForm.svelte"
	import LogoutButton from "./components/LogoutButton.svelte";
	import { accessToken, refreshToken } from "./stores";
</script>

{#if $accessToken && $refreshToken}
	<LogoutButton/>
{:else}
	<LoginForm/>
{/if}

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>