import { createRouter, createWebHistory } from "vue-router";
import ItemDetails from "./components/ItemDetails.vue";
import Contact from "./components/Contact.vue";
import TagListing from "./components/TagListing.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/listing/:name", component: TagListing, props: true },
    { path: "/contact", component: Contact },
    { path: "/details/:id", component: ItemDetails, props: true },
    { path: "/", component: TagListing, props: { name: "all" } },
  ],
});
