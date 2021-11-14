// Types
import { Module } from "vuex";
import { IFilterStore } from "./types";
import { IRootStore } from "@/store/types";
// Actions
import actionsFilters from "./actions";

const state: IFilterStore = {
  categoriesProduct: [],
  seasonsList: [],
  materialList: [],
  colorsList: [],
};

const namespaced = true;

const filters: Module<IFilterStore, IRootStore> = {
  namespaced,
  state,
  actions: actionsFilters,
};

export default filters;
