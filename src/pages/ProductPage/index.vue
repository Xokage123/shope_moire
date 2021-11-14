<template>
  <div class="content__top">
    <div class="content__row">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ totalProducts }} товара </span>
    </div>
  </div>

  <div class="content__catalog">
    <!-- Секция с фильтрами -->
    <FilterComponent />
    <!-- Секция с товарами -->
    <section class="catalog">
      <!-- Лист с товарами -->
      <ProductsList :products="listProduct" />
      <!-- Пагинация -->
      <PaginationList />
    </section>
  </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
// Components
import FilterComponent from "./components/Filter.vue";
import ProductsList from "./components/ProductsList.vue";
import PaginationList from "./components/PaginationList.vue";
// Types
import { IProductsStore } from "@/store/modules/Products/types";

export default defineComponent({
  name: "ProductsPage",
  components: {
    FilterComponent,
    ProductsList,
    PaginationList,
  },
  setup() {
    const $storeProduct = useStore<IProductsStore>();
    // Изначально у нас открыта первая страница
    let numberPage = ref<number>(1);

    let listProduct = ref([]);

    $storeProduct
      .dispatch("loadListProduct", numberPage.value)
      .then((products) => {
        listProduct.value = products.items;
      });

    watch(
      () => numberPage.value,
      (newNumberPage, oldNumberPage) => {
        console.log(newNumberPage);
        console.log(oldNumberPage);
        $storeProduct
          .dispatch("loadListProduct", {
            numberPage: newNumberPage,
          })
          .then((products) => {
            listProduct.value = products.items;
          });
      }
    );

    return {
      totalProducts: $storeProduct.state.totalProducts,
      listProduct,
    };
  },
});
</script>
