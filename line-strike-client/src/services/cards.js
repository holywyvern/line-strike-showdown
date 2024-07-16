import { client } from "./colyseus";

export default {
  async load() {
    const response = await client.http.get("/cards");
    return response.data;
  },
};
