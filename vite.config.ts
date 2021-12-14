import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_APP_WEB3_STORAGE_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDEwNzQyMTE0QTE3Q0Q1MDgyQjgzZDUxRDg2MjVDOThjZWE2MGQzRTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzk1MTEyNjQ2ODAsIm5hbWUiOiJwaG90b19hcHAifQ.PtxD1ALM-aE56MolSSpsTpKfydOFzzCHnWTDABBAWzI",
    },
  },
});
