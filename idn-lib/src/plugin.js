import "@/assets/sass/main.scss";

import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import BaseModal from "@/components/BaseModal.vue";
import FormInput from "@/components/FormInput.vue";
import FormField from "@/components/FormField.vue";
import ToolTip from "@/components/ToolTip.vue";
import { navLinks } from "@/utils/links";

const components = {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BannerComponent,
    BaseModal,
    FormInput,
    FormField,
    ToolTip
};

export {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    BannerComponent,
    BaseModal,
    FormInput,
    FormField,
    ToolTip,
    navLinks
};

export default {
    install: (Vue) => {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                Vue.component(component.name, component);
            }
        }
    }
};
