<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand text-white" to="/"
        ><img src="@/assets/img/logo.png" alt="logo"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              class="nav-link active text-white"
              aria-current="page"
              to="/drinkmenu"
              >飲料菜單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/news/newlist"
              >最新消息</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/about"
              >關於我們</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/contact"
              >聯絡我們</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/buy/buyjam"
              >購買果醬</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/buy/cart"
              >購物車</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixin.scss";

nav {
  font-size: 20px;
  background-color: $mainColor;
  .container-fluid {
    padding: 0;
    padding: 0 12.1%;
  }
  a:hover {
    color: goldenrod !important;
  }
}
</style>
