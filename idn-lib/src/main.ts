import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import fontAwesomeIcons from "./icons/fontAwesome";
import App from "./App.vue";
import "../../static-assets/sass/main.scss"; // IDN stylesheet
import "./assets/sass/main.scss"; // idn-lib stylesheet
import router from "./router";

library.add(...fontAwesomeIcons);

const app = createApp(App);

app.use(router);

app.mount("#app");
