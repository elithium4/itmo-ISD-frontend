import { useEffect, useRef } from "react";
import css from "./Feature.module.scss"; 
import { useTranslation } from "react-i18next";

export const Features = () => {
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const {t} = useTranslation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(css.visible); 
          } else {
            entry.target.classList.remove(css.visible);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setFeatureRef = (el: HTMLDivElement | null, index: number) => {
    if (el) featureRefs.current[index] = el;
  };

  return (
    <section className={css.features}> 
      <h2>{t("Landing.Features.advantages")}</h2>
      <div className={css.featureList}>
        {[
          {
            title: t("Landing.Features.accuracy"),
            text: t("Landing.Features.accuracyDetail"),
            side: "left",
          },
          {
            title: t("Landing.Features.instantCheck"),
            text: t("Landing.Features.instantCheckDetail"),
            side: "right",
          },
          {
            title: t("Landing.Features.intellegentAnalysis"),
            text: t("Landing.Features.intellegentAnalysisDetail"),
            side: "left",
          },
          {
            title: t("Landing.Features.crossPlatform"),
            text: t("Landing.Features.crossPlatformDetail"),
            side: "right",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className={`${css.featureItem} ${css[feature.side]}`} 
            ref={(el) => setFeatureRef(el, index)}
          >
            <div className={css.text}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
