import { api } from "./api";

const JWT_KEY = `line-strike.jwt.link`;

export const LinkService = {
  async signUp(email, password, name) {
    const response = await api.post("accounts", {
      email,
      password,
      name,
    });
    if (!response.ok) {
      throw response.data;
    }
    const token = response.headers.authorization;
    localStorage.setItem(JWT_KEY, token);
    api.setHeader("Authorization", token);
    return { token, account: response.data };
  },
  async signIn(email, password, name) {
    const response = await api.post("accounts/sign-in", {
      email,
      password,
      name,
    });
    if (!response.ok) {
      throw response.data;
    }
    const token = response.headers.authorization;
    localStorage.setItem(JWT_KEY, token);
    api.setHeader("Authorization", token);
    return { token, account: response.data };
  },
  async signOut() {
    api.deleteHeader("Authorization");
  },
  async check() {
    let token = localStorage.getItem(JWT_KEY);
    if (!token) return null;

    api.setHeader("Authorization", token);
    const response = await api.post("/accounts/refresh");
    if (!response.ok) {
      api.deleteHeader("Authorization");
      return null;
    }
    token = response.headers.authorization;
    localStorage.setItem(JWT_KEY, token);
    api.setHeader("Authorization", token);
    return { token, account: response.data };
  },
  async verify(token) {
    const response = await api.get(`/email/verifications/${token}`);
    if (!response.ok) {
      throw response.data;
    }
  },
  async sendVerification(email) {
    const response = await api.post("/email/verifications", { email });
    if (!response.ok) {
      throw response.data;
    }
  },

  async updateName(name) {
    const response = await api.post("/accounts/new-name", { name });
    if (!response.ok) {
      throw response.data;
    }
  }
};
