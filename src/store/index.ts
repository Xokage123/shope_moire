// Vue
import { createStore } from "vuex";
// Modules
import filters from "./modules/Filters";
import products from "./modules/Products";
import user from "./modules/User";
import basket from "./modules/Basket";
// Types
import type { IRootStore } from "./types";

const appStore = createStore<IRootStore>({
  modules: {
    filters,
    products,
    user,
    basket,
  },
});

export default appStore;
