import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import plugin from "@/plugin";

import "@/assets/sass/main.scss";

const app = createApp(App);

app.use(router);
app.use(plugin);
app.mount("#app");
