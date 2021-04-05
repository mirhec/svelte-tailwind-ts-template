import { writable } from 'svelte/store';

const storedAccessToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');

export const accessToken = writable(storedAccessToken);
export const refreshToken = writable(storedRefreshToken);

accessToken.subscribe(value => localStorage.setItem('accessToken', value || undefined))
refreshToken.subscribe(value => localStorage.setItem('refreshToken', value || undefined))

export const searchText = writable('');
export const translation = writable('ELB1905STR');
export const originTranslation = writable('GNTTR');
export const book = writable(40);
export const chapter = writable(0);
export const hoveredStrong = writable(0);