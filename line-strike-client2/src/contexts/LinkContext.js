import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LinkService } from "../services/LinkService";

const DEFAULT_STATE = {
  status: "loading",
  isLoading: true,
  isLoaded: false,
  isError: false,
  isLinked: false,
  account: null,
  token: null,
};

export const LinkContext = createContext(DEFAULT_STATE);

export function useLink() {
  return useContext(LinkContext);
}

export function useLinkState() {
  const [status, setStatus] = useState("loading");
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  useEffect(() => {
    if (ready) return;

    setReady(true);
    LinkService.check().then(
      (data) => {
        if (data) {
          const { account, token } = data;
          setAccount(account);
          setToken(token);
        }
        setStatus("loaded");
      },
      (error) => {
        console.error(error);
        setStatus("error");
      }
    );
  }, [ready]);
  const updateName = useCallback(
    async (name) => {
      if (!account) return;
      if (!name) return;

      await LinkService.updateName(name);
    },
    [account]
  );
  return {
    status,
    token,
    account,
    isBusy,
    isLoading: status === "loading",
    isError: status === "error",
    isLoaded: status === "loaded",
    isLinked: Boolean(account && token),
    async signUp(email, password, name) {
      try {
        setStatus("loading");
        const { token, account } = await LinkService.signUp(
          email,
          password,
          name
        );
        setToken(token);
        setAccount(account);
        setStatus("loaded");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    },
    async signIn(email, password, name) {
      try {
        setStatus("loading");
        const { token, account } = await LinkService.signIn(
          email,
          password,
          name
        );
        setToken(token);
        setAccount(account);
        setStatus("loaded");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    },
    async signOut() {
      setStatus("loading");
      await LinkService.signOut();
      setToken(null);
      setAccount(null);
      setStatus("loaded");
    },
    async verify(token) {
      setIsBusy(true);
      try {
        await LinkService.verify(token);
        setAccount((account) => ({ ...account, emailVerified: true }));
      } catch (error) {
        console.error(error);
      }
      setIsBusy(false);
    },
    async sendVerification() {
      if (!account) return;

      setIsBusy(true);
      try {
        await LinkService.sendVerification(account.email);
      } catch (error) {
        console.error(error);
      }
      setIsBusy(false);
    },
    updateName,
  };
}
