import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import fontAwesomeIcons from "./icons/fontAwesome";
import App from "./App.vue";
import "../../static-assets/sass/main.scss"; // IDN stylesheet
import "./assets/sass/main.scss"; // idn-lib stylesheet

library.add(...fontAwesomeIcons);

createApp(App).mount("#app");
