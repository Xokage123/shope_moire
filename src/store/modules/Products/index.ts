import { Module } from "vuex";
// Types
import type { IProductsStore } from "./types";
import { IRootStore } from "@/store/types";
// Actions
import actionsProducts from "./actions";

const state: IProductsStore = {
  listProducts: [],
  totalNumberPage: 0,
  totalProducts: 0,
  actualNumberPage: 0,
};

const products: Module<IProductsStore, IRootStore> = {
  state,
  actions: actionsProducts,
};

export default products;
