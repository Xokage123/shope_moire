<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button
        :disabled="actualPageNumber == 1"
        @click="goToPrevPage"
        class="pagination__link pagination__link--arrow pointer"
        :class="{
          'pagination__link--disabled': actualPageNumber == 1,
        }"
        aria-label="Предыдущая страница"
      >
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.31836 11.0343L1.31836 6.0343L6.31836 1.0343"
            stroke="#222222"
          />
        </svg>
      </button>
    </li>
    <li
      :key="numberPage"
      :numberPage="numberPage"
      v-for="numberPage in paginationItems"
      class="pagination__item pointer"
    >
      <a
        class="pagination__link"
        :class="{
          'pagination__link--current': actualPageNumber == numberPage,
        }"
        @click.prevent="toggleNumberPage(numberPage)"
      >
        {{ numberPage }}
      </a>
    </li>
    <li class="pagination__item">
      <button
        :disabled="totalPage === actualPageNumber"
        @click="goToNextPage"
        class="pagination__link pagination__link--arrow pointer"
        :class="{
          'pagination__link--disabled': totalPage === actualPageNumber,
        }"
        aria-label="Следующая страница"
      >
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.25 11.0343L6.25 6.0343L1.25 1.0343" stroke="#222222" />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
// Vue
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
// Interface
import type { IRootStore } from "@/store/types";

export default defineComponent({
  setup() {
    const $storeProducts = useStore<IRootStore>();

    const actualPageNumber = ref<number>(1);

    const totalPage = ref($storeProducts.state.products.totalNumberPage);

    const goToPrevPage = () => {
      toggleNumberPage(actualPageNumber.value - 1);
    };

    const goToNextPage = () => {
      toggleNumberPage(actualPageNumber.value + 1);
    };

    const toggleNumberPage = (numberPage: number) => {
      $storeProducts
        .dispatch("products/loadListProduct", {
          numberPage,
          filtersObject: {},
        })
        .then((res) => {
          actualPageNumber.value = res.pagination.page;
          totalPage.value = res.pagination.pages;
        });
    };

    const paginationItems = computed(() => {
      const array: Array<number> = [];
      for (
        let numberPage = 1;
        numberPage <= $storeProducts.state.products.totalNumberPage;
        numberPage++
      ) {
        array.push(numberPage);
      }
      return array;
    });

    watch(
      () => $storeProducts.state.products.totalNumberPage,
      (newValue) => {
        totalPage.value = newValue;
      }
    );

    return {
      paginationItems,
      actualPageNumber,
      totalPage,

      toggleNumberPage,
      goToPrevPage,
      goToNextPage,
    };
  },
});
</script>
