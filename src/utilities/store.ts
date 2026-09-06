import { defineStore } from "pinia";
import { ref } from "vue";

export const hbfeStore = defineStore(
  "hbfeStore",
  () => {
    const sortIndex = ref(0);

    return { sortIndex };
  },
  { persist: true },
);
