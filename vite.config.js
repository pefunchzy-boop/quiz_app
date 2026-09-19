import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT : remplace "quiz_app" par le nom EXACT de ton dépôt GitHub.
// Si ton dépôt s'appelle "quiz-app", mets base: "/quiz-app/".
// Si tu déploies sur un domaine perso ou un site "username.github.io", mets base: "/".
export default defineConfig({
  plugins: [react()],
  base: "/quiz_app/",
});
