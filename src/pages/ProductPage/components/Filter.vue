<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <!-- Цена -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="min-price"
            v-model="priceFilter.start"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="number"
            name="max-price"
            v-model="priceFilter.end"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <!-- Категории -->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select v-model="categoryId" class="form__select" name="category">
            <option
              :key="category.id"
              :label="category.title"
              :value="category.id"
              v-for="category in categoryList"
            />
          </select>
        </label>
      </fieldset>
      <!-- Материалы -->
      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul v-if="materialsList.length" class="check-list">
          <li
            :material="material"
            :key="material.id"
            v-for="material in materialsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.title"
              />
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Цвета -->
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul v-if="colorsList.length" class="check-list">
          <li
            :color="color"
            :key="color.id"
            v-for="color in colorsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="color"
                :value="color.title"
              />
              <span
                :style="{
                  background: color.code,
                }"
                class="check-list__desc"
              ></span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Сезоны -->
      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul v-if="seasonsList.length" class="check-list">
          <li
            :season="season"
            :key="season.id"
            v-for="season in seasonsList"
            class="check-list__item"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="season.title"
              />
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>
      <!-- Применить фильтрацию -->
      <button
        @click.prevent="applyFilter"
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <!-- Сбросить фильтрацию -->
      <button
        @click.prevent="clearFilters"
        class="filter__reset button button--second"
        type="button"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script lang="ts">
// Vue
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
// Types
import { IRootStore } from "@/store/types";

interface IPriceProps {
  start: number;
  end: number;
}

export default defineComponent({
  name: "FilterComponent",
  setup() {
    const $store = useStore<IRootStore>();

    // Цена
    const priceFilter = reactive<IPriceProps>({
      start: 0,
      end: 0,
    });

    const actualCategoryId = ref(null);
    const actualSeasonsList = ref([]);
    const actualMaterialsList = ref([]);
    const actualColorsList = ref([]);

    const categoryId = ref(null);
    const categoryList = ref($store.state.filters.categoriesProduct);
    const seasonsList = ref($store.state.filters.seasonsList);
    const materialsList = ref($store.state.filters.materialList);
    const colorsList = ref($store.state.filters.colorsList);

    // Применение фильтров
    const applyFilter = () => {
      console.log(categoryId.value);
      clearFilters();
    };
    // Очистка фильтра
    const clearFilters = () => {
      priceFilter.start = 0;
      priceFilter.end = 0;
    };

    onMounted(() => {
      if (!$store.state.filters.categoriesProduct.length) {
        // Получаем актуальные категории
        $store.dispatch("filters/loadCategory").then((list) => {
          categoryList.value = list;
        });
      }
      if (!$store.state.filters.seasonsList.length) {
        // Получаем актуальные сезоны
        $store.dispatch("filters/loadSeasons").then((seasons) => {
          seasonsList.value = seasons;
        });
      }
      if (!$store.state.filters.materialList.length) {
        // Получаем актуальные материалы
        $store.dispatch("filters/loadMaterial").then((materials) => {
          materialsList.value = materials;
        });
      }
      if (!$store.state.filters.colorsList.length) {
        // Получаем актуальные цвета
        $store.dispatch("filters/loadColors").then((сolors) => {
          colorsList.value = сolors;
        });
      }
    });

    return {
      priceFilter,
      categoryId,
      categoryList,
      seasonsList,
      materialsList,
      colorsList,

      applyFilter,
      clearFilters,
    };
  },
});
</script>
