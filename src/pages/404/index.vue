<template>
  <h2>
    Извините, произошла ошибка! Перейдите на
    <router-link
      :to="{
        name: 'ProductsPage',
      }"
    >
      основную страницу товаров
    </router-link>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "404",
});
</script>
