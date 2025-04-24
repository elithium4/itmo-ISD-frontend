import { observer } from "mobx-react-lite";
import { ValidationResult, validationStore } from "../../store/validation";
import { useNavigate } from "react-router-dom";
import css from "./Result.module.scss";
import { Header } from "../../components/Header/Header";
import { useEffect } from "react";
import Loader from "./loader.svg?react";
import { UploadButton } from "../../components/UploadButton/UploadButton";

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
  return (
    <div className={css.loadingIndicator}>
      <div className={css.loaderContainer}>
        <Loader />
      </div>
      Анализируем изображение...
    </div>
  );
};

const ErrorMessage = ({details}:{details?: string}) => {
  return (
    <div className={css.ErrorMessage}>
      <div className={css.warning}>
      <p className={css.title}>Ой!</p>
      <p className={css.info}>Произошла ошибка во время анализа изображения :(</p>
      {details && <p>{details}</p>}
      </div>
      <UploadButton title="Попробовать еще раз" />
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

  const imageURL = URL.createObjectURL(file);
  const isFake = result === "fake";

  return (
    <div className={css.container}>
      <div
        className={`${css.imageContainer} ${
          isFake ? css.glowFake : css.glowReal
        }`}
      >
        <img src={imageURL} alt="Загруженное изображение" />
      </div>

      <div className={css.infoContainer}>
        <h2 className={css.resultTitle}>Результат анализа</h2>
        <div className={`${css.status} ${isFake ? css.fake : css.real}`}>
          {isFake ? "Обнаружен дипфейк" : "Изображение подлинное"}
        </div>
        <p className={css.resultComment}>
          {isFake
            ? "Изображение может являться дипфейком"
            : "Изображение выглядит настоящим"}
        </p>
        <p className={css.details}>
          Вероятность: {(probability * 100).toFixed(1)}%
        </p>
        <UploadButton title="Проверить другое изображение" />
      </div>
      <p className={css.description}>
      *Дипфейк — это реалистичная подделка фото, видео или аудио, созданная искусственным интеллектом. Технология позволяет заменить лицо, голос или движения человека, делая фальшивый контент почти неотличимым от настоящего. 
      </p>
    </div>
  );
};
