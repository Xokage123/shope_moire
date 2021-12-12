import { Module } from "vuex";
// Types
import type { IBasketStore } from "./types";
import { IRootStore } from "@/store/types";
// Actions
import actionsProducts from "./actions";

const state: IBasketStore = {
  id: 0,
  items: [],
  order: null,
  deliveries: [],
  payments: [],
  user: {
    id: 0,
    accessKey: "",
  },
};

const namespaced = true;

const basket: Module<IBasketStore, IRootStore> = {
  namespaced,
  state,
  actions: actionsProducts,
};

export default basket;
