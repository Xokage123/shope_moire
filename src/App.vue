<template>
  <Header />
  <main class="content container">
    <router-view />
    <div id="modal"></div>
  </main>
  <Fotter />
</template>

<script lang="ts">
// Vue
import { defineComponent } from "vue";
// Vuex
import { useStore } from "vuex";
// Components
import Header from "@/components/Header.vue";
import Fotter from "@/components/Fotter.vue";
// Types
import { IRootStore } from "@/store/types";

export default defineComponent({
  components: {
    Header,
    Fotter,
  },
  setup: () => {
    const $store = useStore<IRootStore>();

    if (localStorage.getItem("user_token")) {
      $store.dispatch(
        "basket/fetchGetBasket",
        localStorage.getItem("user_token")
      );
    } else {
      $store.dispatch("basket/fetchGetBasket").then((basketInfo) => {
        localStorage.setItem("user_token", basketInfo.user.accessKey);
      });
    }
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
