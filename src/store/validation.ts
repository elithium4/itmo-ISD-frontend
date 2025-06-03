import { makeAutoObservable, runInAction } from "mobx";

export type ValidationResult = {
  fileName: string;
  result: "Fake" | "Real";
  probability: number;
};

export enum ErrorType {
  NoFaceDetected = "NoFaceDetected",
  CommonError = "CommonError",
}

class ValidationStore {
  file: File | null = null;
  result: ValidationResult | null = null;
  errorStatus: null | ErrorType = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async validate(file: File) {
    runInAction(() => {
      this.loading = true;
      this.file = file;
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_FRONTEND_URL}/images/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data, statusCode, message } = await response.json();
      if (statusCode !== 200) {
        this.result = null;
        this.errorStatus = ErrorType.CommonError;
        if (message.includes("No face detected in the image")) {
          this.errorStatus = ErrorType.NoFaceDetected;
        }
      } else {
        this.result = {
          probability:
            data.class_description === "Fake"
              ? data.fake_probability
              : 1 - data.fake_probability,
          result: data.class_description,
          fileName: "",
        };
        this.errorStatus = null;
      }
      this.loading = false;
    } catch (e) {
      console.error("Validation failed", e);
    } finally {
      this.loading = false;
    }
  }

  reset() {
    this.file = null;
    this.result = null;
    this.loading = false;
  }
}

export const validationStore = new ValidationStore();
