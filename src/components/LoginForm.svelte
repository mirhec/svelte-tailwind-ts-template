<script lang="ts">
  import { accessToken, refreshToken } from "../stores";
  import { login } from "../api/user";

  let username = '';
  let password = '';

  async function handleLogin() {
    let { access_token, refresh_token } = await login(username, password);
    accessToken.set(access_token);
    refreshToken.set(refresh_token);
  }
</script>

<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div class="max-w-md mx-auto">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            Benutzername
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Benutzername" bind:value="{username}">
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            Passwort
          </label>
          <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" bind:value="{password}">
          <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-light-blue-500 hover:bg-light-blue-400 text-white font-bold py-2 px-4 mr-4 rounded" type="button" on:click="{handleLogin}">
            Anmelden
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
            Passwort vergessen?
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
