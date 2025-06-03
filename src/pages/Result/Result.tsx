import { observer } from "mobx-react-lite";
import { ValidationResult, validationStore } from "../../store/validation";
import { useNavigate } from "react-router-dom";
import css from "./Result.module.scss";
import { Header } from "../../components/Header/Header";
import { useEffect } from "react";
import Loader from "./loader.svg?react";
import { UploadButton } from "../../components/UploadButton/UploadButton";
import { useTranslation } from "react-i18next";

export const ResultPage = observer(() => {
  const navigate = useNavigate();
  const { file, result, loading } = validationStore;

  useEffect(() => {
    if (!file) {
      navigate("/");
    }
  }, []);

  const getPageBodyComponent = () => {
    if (loading) {
      return <Loading />;
    }
    if (!loading && result === null) {
      return <ErrorMessage />;
    }
    if (!loading && file && result) {
      return <ValidationView file={file} validationData={result} />;
    }
    return <></>;
  };

  return (
    <div className={css.page}>
      <Header alwaysVisible />
      {getPageBodyComponent()}
    </div>
  );
});

const Loading = () => {
  const {t} = useTranslation();
  return (
    <div className={css.loadingIndicator}>
      <div className={css.loaderContainer}>
        <Loader />
      </div>
      {t("Result.processing")}
    </div>
  );
};

const ErrorMessage = ({details}:{details?: string}) => {
  const {t} = useTranslation();
  return (
    <div className={css.ErrorMessage}>
      <div className={css.warning}>
      <p className={css.title}>{t("Result.oops")}</p>
      <p className={css.info}>{t("Result.errorMessage")}</p>
      {details && <p>{details}</p>}
      </div>
      <UploadButton title={t("Result.retry")} />
    </div>
  );
};

const ValidationView = ({
  validationData,
  file,
}: {
  validationData: ValidationResult;
  file: File;
}) => {
  const { result, probability } = validationData;
  const {t} = useTranslation();

  const imageURL = URL.createObjectURL(file);
  const isFake = result === "fake";

  return (
    <div className={css.container}>
      <div
        className={`${css.imageContainer} ${
          isFake ? css.glowFake : css.glowReal
        }`}
      >
        <img src={imageURL} alt={t("Result.loadedImage")} />
      </div>

      <div className={css.infoContainer}>
        <h2 className={css.resultTitle}>{t("Result.analysisResult")}</h2>
        <div className={`${css.status} ${isFake ? css.fake : css.real}`}>
          {isFake ? t("Result.isDeepfake") : t("Result.isReal")}
        </div>
        <p className={css.resultComment}>
          {isFake
            ? t("Result.couldBeDeepfake")
            : t("Result.looksReal")}
        </p>
        <p className={css.details}>
          {t("Result.probability", {p : (probability * 100).toFixed(1)})}
        </p>
        <UploadButton title={t("Result.checkOther")} />
      </div>
      <p className={css.description}>
      {t("Result.aboutDeepfake")}
      </p>
    </div>
  );
};
