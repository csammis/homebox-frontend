import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
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
