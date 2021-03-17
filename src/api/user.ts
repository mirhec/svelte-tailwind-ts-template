import Api from "../services/Api";

export const login = async (username: string, password: string) => {
    try {
      const response = await Api.post('/users/login', {username, password});
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
};
