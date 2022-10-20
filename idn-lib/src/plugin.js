import "@/sass/main.scss";

import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const components = {
    HeaderComponent,
    FooterComponent
};

export {
    HeaderComponent,
    FooterComponent
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
