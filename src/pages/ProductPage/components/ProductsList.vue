<template>
  <ul class="catalog__list">
    <ProductItem
      :key="product.id"
      :product="product"
      v-for="product in actualListProducts"
    />
  </ul>
</template>

<script lang="ts">
// Vue
import { defineComponent, ref, watch } from "vue";
// Elements
import ProductItem from "@/pages/ProductPage/components/ProductItem.vue";
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
    watch(
      () => props.products,
      (newList) => {
        actualListProducts.value = newList;
      }
    );
    return {
      actualListProducts,
    };
  },
});
</script>
