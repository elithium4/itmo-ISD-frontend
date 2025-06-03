import css from "./Landing.module.scss";
import { UploadButton } from "../../components/UploadButton/UploadButton";
import { Header } from "../../components/Header/Header";
import { Features } from "../../components/Features/Features";
import { StarsContainer } from "../../components/StarsContainer/StarsContainer";
import { useRef } from "react";
import { authStore } from "../../store/auth";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

export const Landing = observer(function Landing() {
  const heroSection = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  
  return (
    <div className={css.landing}>
      {authStore.authModalMode && (
        <AuthModal
          mode={authStore.authModalMode}
          onClose={() => authStore.setAuthModalMode(null)}
        />
      )}
      <Header alwaysVisible={false} dependencyBlock={heroSection} />
      <section className={css.hero} ref={heroSection}>
        <StarsContainer />
        <div className={css.title}>
          <h1>I-Dentity</h1>
          <p>
            {t("Landing.tagline")}
          </p>
        </div>
        <div className={css.uploadWrapper}>
          <UploadButton title="Загрузить изображение" />
        </div>
      </section>

      <section className={css.about}>
        <h2>{t("Landing.aboutUsTitle")}</h2>
        <p>
        {t("Landing.aboutUsContent")}
        </p>
      </section>

      <section className={css.pipeline}>
        <h2>{t("Landing.howItWorks")}</h2>
        <div className={css.steps}>
          <div className={`${css.step} ${css.upload}`}>
            <h3>1</h3>
            <p>{t("Landing.loadImage")}</p>
          </div>
          <div className={`${css.step} ${css.analyze}`}>
            <h3>2</h3>
            <p>{t("Landing.aiAnalysis")}</p>
          </div>
          <div className={`${css.step} ${css.result}`}>
            <h3>3</h3>
            <p>{t("Landing.showResults")}</p>
          </div>
        </div>
      </section>
      <Features />
      <footer className={css.footer}>
        <StarsContainer />
        <p>© 2025 I-Dentity</p>
      </footer>
    </div>
  );
});
