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
export const lang = writable('en');

export const chapterCount = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 3, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22];
export const bookNames = {
	'de': {
		'long': ['1.Mose','2.Mose','3.Mose','4.Mose','5.Mose','Josua','Richter','Rut','1.Samuel','2.Samuel','1.Könige','2Kön','1Chr','2Chr','Esra','Neh','Est','Hi','Ps','Spr','Pred','Hld','Jes','Jer','Klgl','Hes','Dan','Hos','Joel','Am','Obd','Jon','Mi','Nah','Hab','Zef','Hag','Sach','Mal','Mt','Mk','Lk','Joh','Apg','Röm','1Kor','2Kor','Gal','Eph','Phil','Kol','1Thess','2Thess','1Tim','2Tim','Tit','Phlm','Heb','Jak','1Pet','2Pet','1Joh','2Joh','3Joh','Jud','Offb'],
		'short': ['1Mos','2Mos','3Mos','4Mos','5Mos','Jos','Ri','Rut','1Sam','2Sam','1Kön','2Kön','1Chr','2Chr','Esra','Neh','Est','Hi','Ps','Spr','Pred','Hld','Jes','Jer','Klgl','Hes','Dan','Hos','Joel','Am','Obd','Jon','Mi','Nah','Hab','Zef','Hag','Sach','Mal','Mt','Mk','Lk','Joh','Apg','Röm','1Kor','2Kor','Gal','Eph','Phil','Kol','1Thess','2Thess','1Tim','2Tim','Tit','Phlm','Heb','Jak','1Pet','2Pet','1Joh','2Joh','3Joh','Jud','Offb'],
	},
	'en': {
		'long': [],
		'short': [],
	}
};