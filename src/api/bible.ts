import Api from "../services/Api";

export const getChapter = async (translation: String, book: Number, chapter: Number) => {
    try {
      const response = await Api.get(`/bibles/${translation}/${book}/${chapter}.json`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};
