import { useState } from "react";
import css from "./AuthModal.module.scss";
import { authStore } from "../../store/auth";

type AuthModalProps = {
  mode: "login" | "register";
  onClose: () => void;
};

export const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await authStore.login(username, password);
      } else {
        await authStore.register(username, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(`Ошибка: ${err.message}`);
    }
  };

  const toggleMode = () => {
    authStore.setAuthModalMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.modalTitle}>{isLogin ? "Вход" : "Регистрация"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && <input
            type="email"
            className={css.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />}
          <input
            type="text"
            minLength={5}
            maxLength={50}
            className={css.input}
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            minLength={8}
            maxLength={255}
            className={css.input}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={css.button}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
          <p className={css.error}>{error}</p>
          <p className={css.modalBottom}>
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <span className={css.actionCall} onClick={toggleMode}>
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </span>
          </p>
        </form>
        <button className={css.close} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};
