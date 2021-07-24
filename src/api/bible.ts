import Api from "../services/Api";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export const getTranslations = () => {
  return [
    {name: 'Elberfelder 1905', identifier: 'ELB1905STR'},
    {name: 'Luther 1912', identifier: 'LUTH1912'},
    {name: 'Schlachter 1951', identifier: 'SCH1951'},
    {name: 'Interlinear', identifier: 'ILGRDE'},
  ]
}

export const getOriginTranslations = () => {
  return [
    {identifier: 'GNTTR', name: 'Textus Rezeptus'},
  ]
}

export const getChapter = async (translation: String, book: Number, chapter: Number) => {
    try {
      const response = await Api.get(`/bibles/${translation}/${book}/${chapter}.json`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getVerse = async (translation: String, book: Number, chapter: Number, verse: Number) => {
    try {
      const response = await Api.get(`/bibles/${translation}/${book}/${chapter}/${verse}.json`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getStrongDetails = async (translation: String, lang: String, strongNumber: Number) => {
    try {
        const response = await Api.get(`/bibles/${translation}/${lang}_strongs/${strongNumber}.json`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getStrongDetailsByBook = async (translation: String, book: Number, strongNumber: Number) => {
    try {
      const response = await Api.get(`/bibles/${translation}/${book <= 39 ? "hebrew_strongs" : "greek_strongs"}/${strongNumber}.json`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
};
