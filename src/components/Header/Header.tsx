import { useState, useEffect, RefObject } from "react";
import Logo from './Logo.svg?react';
import css from "./Header.module.scss"

type HeaderProps = {
  alwaysVisible: boolean;
  dependencyBlock?: RefObject<HTMLElement | null>;
}

export const Header = ({ alwaysVisible, dependencyBlock }: HeaderProps) => {
  const [showHeader, setShowHeader] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) return;

    const handleScroll = () => {
      const heroHeight =dependencyBlock?.current?.clientHeight || 300;
      setShowHeader(window.scrollY > heroHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysVisible]);

  return showHeader ? 
        <header className={css.Header}>
          <div className={css.logo}><Logo/></div>
          <div className={css.actions}>
            <button className={css.login}>Войти</button>
            <button className={css.register}>Регистрация</button>
          </div>
        </header> : <></>

  
};
