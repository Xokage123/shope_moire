// API
import {
  getProductCategories,
  getProductSeasons,
  getProductMaterial,
  getProductColor,
} from "@/api/index";

import { ActionTree } from "vuex";

import { IFilterStore } from "../types";

const actionsFilters: ActionTree<IFilterStore, unknown> = {
  async loadCategory({ state }) {
    const categoriesList = await getProductCategories();
    state.categoriesProduct = categoriesList;
    return categoriesList;
  },
  async loadSeasons({ state }) {
    const seasonsList = await getProductSeasons();
    state.seasonsList = seasonsList;
    return seasonsList;
  },
  async loadMaterial({ state }) {
    const materialList = await getProductMaterial();
    state.materialList = materialList;
    return materialList;
  },
  async loadColors({ state }) {
    const materialList = await getProductColor();
    state.materialList = materialList;
    return materialList;
  },
};

export default actionsFilters;
