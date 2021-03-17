import { writable } from 'svelte/store';

const storedAccessToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');

export const accessToken = writable(storedAccessToken);
export const refreshToken = writable(storedRefreshToken);

accessToken.subscribe(value => localStorage.setItem('accessToken', value || undefined))
refreshToken.subscribe(value => localStorage.setItem('refreshToken', value || undefined))