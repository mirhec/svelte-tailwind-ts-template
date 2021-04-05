import Api from "../services/Api";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export const getChapter = async (translation: String, book: Number, chapter: Number) => {
    try {
      await delay(300);
      const response = await Api.get(`/bibles/${translation}/${book}/${chapter}.json`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
};
