import { api } from "./api";

export const AccountService = {
  async search(name) {
    const response = await api.get(`/accounts`, { name });
    if (response.ok) {
      return response.data;
    }
    return null;
  },
  async show(id) {
    const response = await api.get(`/accounts/${id}`);
    if (response.ok) {
      return response.data;
    }
    return null;
  },
  async matches(id, page = 0) {
    const response = await api.get(`/accounts/${id}/matches`, { page });
    if (response.ok) {
      return response.data;
    }
    return [];
  },
};
