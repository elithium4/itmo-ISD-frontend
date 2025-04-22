import { observer } from "mobx-react-lite";
import { validationStore } from "../../store/validation";
import { useNavigate } from "react-router-dom";
import css from "./Result.module.scss";
import { Header } from "../../components/Header/Header";

export const ResultPage = observer(() => {
  const navigate = useNavigate();
  const { file, result, probability } = validationStore;

  // if (!file || result === null || probability === null) {
  //   navigate("/");
  //   return null;
  // }

  const imageURL = URL.createObjectURL(file);
  const isFake = result === "fake";

  return (
    <div className={css.page}>
      <Header alwaysVisible/>
      <div className={css.container}>
        <h1>Результат анализа</h1>
        <div className={`${css.resultCard} ${isFake ? css.glowFake : css.glowReal}`}>
          <div className={css.imageWrapper}>
            <img src={imageURL} alt="Загруженное изображение" />
          </div>
          <div className={css.info}>
            <div className={`${css.status} ${!isFake ? css.fake : css.real}`}>
            {isFake ? "Обнаружен дипфейк" : "Изображение подлинное"}
            </div>
            <p className={css.probability}>
              Вероятность: {(probability * 100).toFixed(1)}%
            </p>
            <button
              className={css.backButton}
              onClick={() => {
                validationStore.reset();
                navigate("/");
              }}
            >
              Проверить другое изображение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
