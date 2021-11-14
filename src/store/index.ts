// Vue
import { createStore } from "vuex";
// Modules
import filters from "./modules/Filters";
import products from "./modules/Products";
import type { IRootStore } from "./types";

const appStore = createStore<IRootStore>({
  modules: {
    filters,
    products,
  },
});

export default appStore;
