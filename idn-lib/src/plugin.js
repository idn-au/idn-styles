import "@/sass/main.scss";

import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { navLinks } from "@/utils/links";

const components = {
    HeaderComponent,
    MainComponent,
    FooterComponent
};

export {
    HeaderComponent,
    MainComponent,
    FooterComponent,
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
