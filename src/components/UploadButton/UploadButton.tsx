import { useNavigate } from "react-router-dom";
import { validationStore } from "../../store/validation";
import css from "./UploadButton.module.scss"
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { authStore } from "../../store/auth";

type Props = {
  title: string;
};

export const UploadButton = observer(({ title }: Props) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!authStore.isAuthenticated) {
      authStore.setAuthModalMode("login");
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    validationStore.reset();
    if (file) {
      validationStore.validate(file);
      navigate("/result");
    }
  };

  return (
    <div className={css.uploadWrapper}>
      <button className={css.uploadButton} onClick={handleClick}>
        {title}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        hidden
      />
    </div>
  );
});