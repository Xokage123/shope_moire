import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";

import App from "./App.vue";

import router from "./router";
import store from "./store";

import "./styles/scss/index.scss";
import "./styles/css/style.min.css";

createApp(App).use(store).use(router).use(Toaster).mount("#app");
