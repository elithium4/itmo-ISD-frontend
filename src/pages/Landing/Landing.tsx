import css from "./Landing.module.scss";
import { UploadButton } from "../../components/UploadButton/UploadButton";
import { Header } from "../../components/Header/Header";
import { Features } from "../../components/Features/Features";
import { StarsContainer } from "../../components/StarsContainer/StarsContainer";
import { useRef } from "react";
import { authStore } from "../../store/auth";
import { AuthModal } from "../../components/AuthModal/AuthModal";
import { observer } from "mobx-react-lite";

export const Landing = observer(function Landing() {
  const heroSection = useRef<HTMLDivElement>(null);

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
            AI-платформа для валидации изображений и выявления дипфейков с
            высокой точностью
          </p>
        </div>
        <div className={css.uploadWrapper}>
          <UploadButton title="Загрузить изображение" />
        </div>
      </section>

      <section className={css.about}>
        <h2>О нас</h2>
        <p>
          I-Dentity — это система валидации изображений нового поколения. Мы
          используем передовые методы машинного обучения для анализа фотографий
          и определения их подлинности. Наша модель обучена на большом
          количестве дипфейков и реальных изображений, что позволяет достигать
          точности более 98%.
        </p>
      </section>

      <section className={css.pipeline}>
        <h2>Как это работает</h2>
        <div className={css.steps}>
          <div className={`${css.step} ${css.upload}`}>
            <h3>1</h3>
            <p>Загрузка изображения</p>
          </div>
          <div className={`${css.step} ${css.analyze}`}>
            <h3>2</h3>
            <p>Анализ с помощью AI-модели</p>
          </div>
          <div className={`${css.step} ${css.result}`}>
            <h3>3</h3>
            <p>Вывод результата</p>
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
