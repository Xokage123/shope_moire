import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Pages
import ProductsPage from "@/pages/ProductPage/index.vue";
// import SeparateProductPage from "@/pages/SeparateProductPage/index.vue";

const routes: Array<RouteRecordRaw> = [
  // Основная страница
  {
    path: "/",
    name: "ProductsPage",
    component: ProductsPage,
  },
  // Страница отдельного товара
  {
    path: "/product/:id",
    name: "SeparateProductPage",
    component: () => import("@/pages/SeparateProductPage/index.vue"),
  },
  // Корзина
  {
    path: "/basket",
    name: "BasketPage",
    component: () => import("@/pages/BasketPage/index.vue"),
  },
  // Оформление заказа
  {
    path: "/checkout_order",
    name: "CheckoutOrderPage",
    component: () => import("@/pages/CheckoutOrderPage/index.vue"),
  },
  // Успешное оформление заказа
  {
    path: "/successful_order",
    name: "SuccessfulOrderPage",
    component: () => import("@/pages/SuccessfulOrderPage/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
