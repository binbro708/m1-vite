<template>
  <app-header></app-header>

  <!-- banner區域 -->
  <div class="banner mb-5">
    <div class="container-fluid p-0">
      <div class="banner-img"></div>
    </div>
  </div>
  <div class="container-xxl">
    <div class="row d-flex align-items-center">
      <div class="col-6">
        <img
          src="@/assets/img/123115521_812060966220252_8526451552181162261_n1.png"
          alt="storeimg"
        />
      </div>
      <div class="col-6">
        <h3>聯絡資訊</h3>
        <h4>電話：0965 656 865</h4>
        <h4>地址：台中市北屯區遼寧路一段148號</h4>
      </div>
    </div>
  </div>
  <app-footer class="mt-5"></app-footer>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  name: "ContactView",
  components: { AppHeader, AppFooter },
};
</script>
<style lang="scss">
.banner {
  .banner-img {
    background-image: url("@/assets/img/banner.png");
    height: 1041px;
    background-size: cover;
    position: relative;
    background-position: 75%;
  }
}
</style>
