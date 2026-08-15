import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "./components/HomeScreen.vue";
import ItemDetails from "./components/ItemDetails.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeScreen },
    { path: "/details/:id", component: ItemDetails, props: true },
  ],
});
