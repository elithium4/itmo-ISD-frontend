import { makeAutoObservable } from "mobx";

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

  logout() {
    this.token = null;
    localStorage.removeItem("token");
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
    let message = "Ошибка входа";
    switch (data.message) {
      case "User not found":
        message = "Пользователь с таким именем не зарегистрирован";
        break;
      case "Bad credentials":
        message = "Неверный логин или пароль";
        break;
      default:
        break;
    }
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
    let message = "Не удалось выполнить регистрацию";
    switch (data.message) {
      case "User with this username already exists":
        message = "Имя пользователя уже занято";
        break;
      case "User with this email already exists":
        message = "Email уже был использован для регистрации"
        break;
      default:
        break;
    }
    throw new Error(message);
  }
}

export const authStore = new AuthStore();
