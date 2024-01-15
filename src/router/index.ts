import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./routes";

const route = createRouter({
    history: createWebHistory("/"),
    routes,
})

export default route;