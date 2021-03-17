<script lang="ts">
  import { accessToken, refreshToken } from "../stores";

  function handleLogout() {
    accessToken.set(undefined);
    refreshToken.set(undefined);
  }
</script>

<button class="bg-light-blue-500 hover:bg-light-blue-400 text-white font-bold py-2 px-4 mr-4 rounded" type="button" on:click="{handleLogout}">
  Logout
</button>