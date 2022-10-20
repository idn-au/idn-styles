import { createApp } from "vue";
import App from "@/App.vue";
import plugin from "@/plugin";

import "@/sass/main.scss";

const app = createApp(App);

app.use(plugin);
app.mount("#app");
