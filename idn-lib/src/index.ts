import { library } from "@fortawesome/fontawesome-svg-core";
import fontAwesomeIcons from "./icons/fontAwesome";
import "./assets/sass/main.scss";
import BaseModal from "./components/BaseModal.vue";
import BannerComponent from "./components/BannerComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import NavBar from "./components/NavBar.vue";
import ToolTip from "./components/ToolTip.vue";
import FormInput from "./components/form/FormInput.vue";
import FormField from "./components/form/FormField.vue";

library.add(...fontAwesomeIcons);

export {
    BaseModal,
    BannerComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    NavBar,
    ToolTip,
    FormInput,
    FormField
};
