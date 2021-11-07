<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="
          pagination__link pagination__link--arrow pagination__link--disabled
        "
        aria-label="Предыдущая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--current"> 1 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 2 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 3 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 4 </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> ... </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#"> 10 </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
// Vue
import { defineComponent, watch } from "vue";
import { useStore } from "vuex";
// Interface
import type { State } from "@/store/index";
export default defineComponent({
  setup() {
    const $store = useStore<State>();
    console.log($store.state.productsInformation);

    // const arrayPaginationItems = re

    watch(
      () => $store.state.productsInformation,
      (value) => {
        console.log(value);
      }
    );
  },
});
</script>
