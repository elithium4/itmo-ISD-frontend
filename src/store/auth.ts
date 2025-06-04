import { makeAutoObservable } from "mobx";
import i18n from "../i18n";

const getSignInErrorMessage = (message?: string) => {
  switch (message) {
    case "User not found":
      return i18n.t("Auth.userNotFound");
    case "Bad credentials":
      return i18n.t("Auth.badCredentials");
    default:
      return i18n.t("Auth.signInError");
  }
};

const getSignUpErrorMessage = (message: string) => {
  switch (message) {
    case "User with this username already exists":
      return i18n.t("Auth.usernameIsTaken");
    case "User with this email already exists":
      return i18n.t("Auth.emailIsTaken");
    default:
      return i18n.t("Auth.signUpError");
  }
};

class AuthStore {
  token: string | null = localStorage.getItem("token");
  authModalMode: "login" | "register" | null = null;

  setAuthModalMode(mode: "login" | "register" | null) {
    this.authModalMode = mode;
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isAuthenticated() {
    return !!this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  async logout() {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_FRONTEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      this.token = null;
      localStorage.removeItem("token");
    });
  }

  async login(username: string, password: string) {
    const res = await fetch(
      `${import.meta.env.VITE_FRONTEND_URL}/auth/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe: true }),
      }
    );
    const data = await res.json();
    if (res.ok && data.jwtToken) {
      this.setToken(data.jwtToken);
      return true;
    }
    let message = getSignInErrorMessage(data.message);
    throw new Error(message);
  }

  async register(username: string, email: string, password: string) {
    const res = await fetch(
      `${import.meta.env.VITE_FRONTEND_URL}/auth/sign-up`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const data = await res.json();
    if (res.ok && data.jwtToken) {
      this.setToken(data.jwtToken);
      return true;
    }
    let message = getSignUpErrorMessage(data.message);
    throw new Error(message);
  }
}

export const authStore = new AuthStore();
