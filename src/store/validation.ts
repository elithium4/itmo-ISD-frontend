import { makeAutoObservable, runInAction } from "mobx";

export type ValidationResult = {
  fileName: string;
  result: "fake" | "real";
  probability: number;
};

class ValidationStore {
  file: File | null = null;
  result: ValidationResult | null = null;
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
      const token =
        "";
      const response = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/images/upload`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
      }
      });

      // MOCK FOR TESTING
      // setTimeout(() => {
      //   this.result = {
      //     result: "real",
      //     probability: 0.932,
      //     fileName: "java.jpg",
      //   };
      //   this.loading = false;
      // }, 2000);

      const data = await response.json();
      this.result = data;
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
