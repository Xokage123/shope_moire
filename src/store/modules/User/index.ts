import { Module } from "vuex";
// Types
import type { IUserStore } from "./types";
import { IRootStore } from "@/store/types";
// Actions
import actionsUser from "./actions";

const state: IUserStore = {
  token: null,
};

const namespaced = true;

const user: Module<IUserStore, IRootStore> = {
  namespaced,
  state,
  actions: actionsUser,
};

export default user;
