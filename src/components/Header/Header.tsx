import { useState, useEffect, RefObject } from "react";
import Logo from "./Logo.svg?react";
import css from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { authStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  alwaysVisible: boolean;
  dependencyBlock?: RefObject<HTMLElement | null>;
};

export const Header = observer(function Header({
  alwaysVisible,
  dependencyBlock,
}: HeaderProps) {
  const [showHeader, setShowHeader] = useState(alwaysVisible);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      const heroHeight = dependencyBlock?.current?.clientHeight || 300;
      setShowHeader(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible]);

  const logOut = () => {
    authStore.logout();
    navigate("/");
  }

  return showHeader ? (
    <header className={css.Header}>
      <a className={css.logo} href="/">
        <Logo className={css.logoSvg} />
      </a>
      <div className={css.actions}>
        {authStore.isAuthenticated ? (
          <>
            <span className={css.welcome}>{t("Header.loggedIn")}</span>
            <button className={css.logout} onClick={logOut}>
              {t("Header.signOut")}
            </button>
          </>
        ) : (
          <>
            <button className={css.login} onClick={() => authStore.setAuthModalMode("login")}>
            {t("Header.signIn")}
            </button>
            <button
              className={css.register}
              onClick={() => authStore.setAuthModalMode("register")}
            >
              {t("Header.signUp")}
            </button>
          </>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
});
