import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Pages
import ProductsPage from "@/pages/ProductPage/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ProductsPage",
    component: ProductsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
