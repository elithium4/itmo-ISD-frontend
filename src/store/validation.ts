import { makeAutoObservable } from "mobx";

class ValidationStore {
  file: File | null = null;
  result: "real" | "fake" | null = null;
  probability: number | null = null;
  fileName: string = "";
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async validate(file: File) {
    this.loading = true;
    this.file = file;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjoyLCJlbWFpbCI6InplbGkuYm9ia2FAcG9jaHRhLnJ1Iiwic3ViIjoiWmVsaWJvYmthIiwiaWF0IjoxNzQ1MjYzNzIyLCJleHAiOjE3NDc4NTU3MjJ9.ozdlNq7d4IWhMSONWlV1pN_5zIfU7cf2MZR65vpH1CE"
      const response = await fetch(`${process.env.FRONTEND_URL}/images/upload`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
      }
      });

      const data = await response.json();
      this.result = data.result;
      this.probability = data.probability;
      this.fileName = data.fileName;
    } catch (e) {
      console.error("Validation failed", e);
    } finally {
      this.loading = false;
    }
  }

  reset() {
    this.file = null;
    this.result = null;
    this.probability = null;
    this.fileName = "";
  }
}

export const validationStore = new ValidationStore();
