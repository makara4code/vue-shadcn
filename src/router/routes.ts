import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/todo",
  },
  {
    path: "/",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    children: [
      {
        path: "/todo",
        component: () => import("@/views/www/todo/index.vue"),
      },
      {
        path: "/",
        component: () => import("@/views/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/auth-layout/AuthLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/app/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/auth-layout/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/app/authentication/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404NotFound.vue"),
    meta: {
      pageTitle: "Error 404",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
