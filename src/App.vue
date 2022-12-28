<template>
  <RouterView />
</template>
<script>
// import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
};
</script>

<style lang="scss">
@import "@/assets/scss/_mixin.scss";

*,
*:before,
*:after {
  box-sizing: border-box;
}
img {
  height: auto;
  max-width: 100%;
}

a {
  text-decoration: none;
}
</style>
