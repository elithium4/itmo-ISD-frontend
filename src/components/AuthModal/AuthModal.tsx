import { useState } from "react";
import css from "./AuthModal.module.scss";
import { authStore } from "../../store/auth";
import { useTranslation } from "react-i18next";

type AuthModalProps = {
  mode: "login" | "register";
  onClose: () => void;
};

export const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const {t} = useTranslation();
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
    } catch (err: unknown) {
      setError(t("Auth.error", {errorText: (err as Error).message}));
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
            placeholder={t("Auth.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />}
          <input
            type="text"
            minLength={5}
            maxLength={50}
            className={css.input}
            placeholder={t("Auth.login")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            minLength={8}
            maxLength={255}
            className={css.input}
            placeholder={t("Auth.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={css.button}>
            {isLogin ? t("Auth.signIn") : t("Auth.signUp")}
          </button>
          <p className={css.error}>{error}</p>
          <p className={css.modalBottom}>
            {mode === "login" ? t("Auth.notRegistered") :  t("Auth.haveAccount")}
            <span className={css.actionCall} onClick={toggleMode}>
              {mode === "login" ? t("Auth.signUp") :  t("Auth.signIn")}
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
