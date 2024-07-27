import { api } from "./api";

export const AccountService = {
  async show(id) {
    const response = await api.get(`/accounts/${id}`);
    if (response.ok) {
      return response.data;
    }
    return null;
  },
};
