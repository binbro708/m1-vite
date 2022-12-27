<template>
  <AppHeader></AppHeader>
  <div class="container">
    <h2 class="mb-3">飲料菜單</h2>
    <img
      class="img-fluid"
      src="@/assets/img/315628593_515606690581881_5939819905610265048_n.jpg"
      alt="menu"
    />
  </div>

  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "DrinkMenu",
  components: {
    // ToastMessages,
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 150px;
}
</style>
