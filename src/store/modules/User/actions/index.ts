import { ActionTree } from "vuex";
// API
import { getUserToken } from "@/api/index";
// Types
import type { IUserStore } from "../types";
import type { IRootStore } from "@/store/types";

const actionsUser: ActionTree<IUserStore, IRootStore> = {
  async getUserToken({ state }) {
    const token = await getUserToken();
    state.token = token;
    return token.accessKey;
  },
};

export default actionsUser;
