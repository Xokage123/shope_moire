<template>
  <ul v-if="products.length" class="catalog__list">
    <ProductItem
      :key="product.id"
      :product="product"
      v-for="product in actualListProducts"
    />
  </ul>
  <div v-else>{{ textLoad }}</div>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref, watch } from "vue";
// Elements
import ProductItem from "@/pages/ProductPage/components/ProductItem.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    products: {
      type: Array,
    },
  },
  components: {
    ProductItem,
  },
  setup(props) {
    let actualListProducts = ref(props.products);

    const textLoad = ref<string>("Загузка...");

    watch(
      () => props.products,
      (newList) => {
        if (actualListProducts.value?.length) {
          actualListProducts.value = newList;
        } else {
          actualListProducts.value = newList;
          textLoad.value = "Товары по вашему запросу не были найдены";
        }
      }
    );

    return {
      actualListProducts,

      textLoad,
    };
  },
});
</script>
