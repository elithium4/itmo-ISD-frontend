import { makeAutoObservable } from "mobx";

class AuthStore {
  token: string | null = localStorage.getItem("token");
  authModalMode: "login" | "register" | null = null;

  setAuthModalMode(mode: "login" | "register" | null) {
    this.authModalMode = mode;
  }
  

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  get isAuthenticated() {
    return !!this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
  }

  async login(username: string, password: string) {
    const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, rememberMe: true }),
    });
    const data = await res.json();
    if (res.ok && data.jwtToken) {
      this.setToken(data.jwtToken);
      return true;
    }
    throw new Error(data.message || "Ошибка входа");
  }

  async register(username: string, email: string, password: string) {
    const res =  await fetch(`${import.meta.env.VITE_FRONTEND_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok && data.jwtToken) {
      this.setToken(data.jwtToken);
      return true;
    }
    throw new Error(data.message || "Ошибка регистрации");
  }
}

export const authStore = new AuthStore();
