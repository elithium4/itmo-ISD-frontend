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

  async login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      this.setToken(data.token);
      return true;
    }
    throw new Error(data.message || "Ошибка входа");
  }

  async register(email: string, password: string) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      this.setToken(data.token);
      return true;
    }
    throw new Error(data.message || "Ошибка регистрации");
  }
}

export const authStore = new AuthStore();
