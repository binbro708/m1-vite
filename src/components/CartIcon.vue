<template>
  <router-link to="/buy/cart">
    <div
      class="cart_icon d-flex justify-content-center align-items-center text-white rounded-circle border border-light"
    >
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "cartIcon",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixin.scss";
.cart_icon {
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 70px;
  height: 70px;
  background-color: $mainColor;
}
</style>
