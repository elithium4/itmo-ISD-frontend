import { useEffect, useRef } from "react";
import css from "./Pipeline.module.scss"; 
import { useTranslation } from "react-i18next";

export default function PipelineSection() {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || window.innerWidth > 768) return;
  
    let currentIndex = -1;
    const interval = setInterval(() => {
      const steps = carousel.children;
      if (!steps.length) return;
  
      currentIndex = (currentIndex + 1) % steps.length;
      const scrollTo = steps[currentIndex].offsetLeft;
      carousel.scrollTo({ left: scrollTo, behavior: "smooth" });
    }, 3000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={css.pipeline}>
      <h2>{t("Landing.howItWorks")}</h2>
      <div className={css.steps} ref={carouselRef}>
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
  );
}