import { useState, useEffect, RefObject } from "react";
import Logo from "./Logo.svg?react";
import css from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/auth";

type HeaderProps = {
  alwaysVisible: boolean;
  dependencyBlock?: RefObject<HTMLElement | null>;
};

export const Header = observer(function Header({
  alwaysVisible,
  dependencyBlock,
}: HeaderProps) {
  const [showHeader, setShowHeader] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      const heroHeight = dependencyBlock?.current?.clientHeight || 300;
      setShowHeader(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible]);

  return showHeader ? (
    <header className={css.Header}>
      <a className={css.logo} href="/">
        <Logo />
      </a>
      <div className={css.actions}>
        {authStore.isAuthenticated ? (
          <>
            <span className={css.welcome}>Вы вошли</span>
            <button className={css.logout} onClick={() => authStore.logout()}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className={css.login} onClick={() => authStore.setAuthModalMode("login")}>
              Войти
            </button>
            <button
              className={css.register}
              onClick={() => authStore.setAuthModalMode("register")}
            >
              Регистрация
            </button>
          </>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
});
