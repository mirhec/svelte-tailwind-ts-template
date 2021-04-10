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

export const chapterCount = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 3, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22];