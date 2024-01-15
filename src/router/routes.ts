import LandingPage from "@/pages/index.vue";

export const routes = [
    {
        path: "/",
        name: "landing-page",
        component: LandingPage
    },
    {
        path: "/about",
        name: 'about-page',
        component: () => import("@/pages/about/index.vue")
    }
]