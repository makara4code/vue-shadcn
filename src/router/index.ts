import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./routes";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH || ""),
    routes,
})

export default router;