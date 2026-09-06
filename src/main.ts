import "vuetify/styles";
import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import "unfonts.css";

import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import { router } from "./router.ts";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vtfy = createVuetify({ components, directives });

const app = createApp(App);
app.use(router);
app.use(vtfy);
app.use(pinia);
app.use(
  createHead({
    init: [
      {
        title: "Default title",
        titleTemplate: "%s | Pretty Good On Paper",
      },
    ],
  }),
);
app.mount("#app");
