import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import { router } from "./router.ts";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vtfy = createVuetify({ components, directives });

const app = createApp(App);
app.use(router);
app.use(vtfy);
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
