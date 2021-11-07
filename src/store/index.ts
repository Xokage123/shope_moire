// Vue
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
// API
import { getProductCategories, getProductsList } from "@/api/index";

export interface State {
  categoriesProduct: Array<unknown>;
  productsInformation: {
    listProducts: Array<unknown>;
    totalProducts: number;
    totalNumberPage: number;
    actualNumberPage: number;
  };
}

export const key: InjectionKey<Store<State>> = Symbol();

const appStore = createStore<State>({
  state: {
    categoriesProduct: [],
    productsInformation: {
      listProducts: [],
      totalNumberPage: 0,
      totalProducts: 0,
      actualNumberPage: 0,
    },
  },
  mutations: {
    addCategoriesProduct(state, list) {
      state.categoriesProduct = list;
    },
  },
  actions: {
    async loadCategory(context) {
      const categoriesList = await getProductCategories();
      context.commit("addCategoriesProduct", categoriesList);
      return categoriesList;
    },
    async loadListProduct({ state }, { numberPage, filtersObject = {} }) {
      const informationProducts = await getProductsList(
        numberPage,
        filtersObject
      );
      state.productsInformation = {
        listProducts: informationProducts.items,
        totalProducts: informationProducts.pagination.total,
        actualNumberPage: informationProducts.pagination.page,
        totalNumberPage: informationProducts.pagination.pages,
      };
      return informationProducts;
    },
  },
  modules: {},
});

export default appStore;
