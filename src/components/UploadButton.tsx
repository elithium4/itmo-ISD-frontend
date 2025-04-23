import { useNavigate } from "react-router-dom";
import { validationStore } from "../store/validation";
import css from "./UploadButton.module.scss"

export const UploadButton = ({title}:{title: string}) => {
  const navigate = useNavigate();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validationStore.reset();
    if (file) {
      validationStore.validate(file)
     navigate("/result");
    }
  };

  return (
    <div className={css.uploadWrapper}>
      <label className={css.uploadButton}>
        {title}
        <input type="file" accept="image/*" onChange={handleUpload} hidden />
      </label>
    </div>
  );
};
