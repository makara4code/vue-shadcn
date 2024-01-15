import "./index.css";
import "./styles/shiki.css";
import "./styles/themes.css";

import App from './App.vue'
import { createApp } from 'vue'
import router from "@/router";

const app = createApp(App);

app.use(router);

app.mount('#app');

