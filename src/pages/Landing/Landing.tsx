import css from "./Landing.module.scss";
import { UploadButton } from "../../components/UploadButton/UploadButton";
import { Header } from "../../components/Header/Header";
import { Features } from "../../components/Features/Features";
import { StarsContainer } from "../../components/StarsContainer/StarsContainer";
import {  useRef } from "react";
import { authStore } from "../../store/auth";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import PipelineSection from "../../components/Pipeline/Pipeline";
import { Footer } from "../../components/Footer/Footer";

export const Landing = observer(function Landing() {
  const heroSection = useRef<HTMLDivElement>(null);
  const {t } = useTranslation();
  



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
          <UploadButton title={t("Landing.uploadImage")} />
        </div>
      </section>

      <section className={css.about}>
        <h2>{t("Landing.aboutUsTitle")}</h2>
        <p>
        {t("Landing.aboutUsContent")}
        </p>
      </section>

      <PipelineSection/>
      <Features />
      <Footer withStars/>
    </div>
  );
});
