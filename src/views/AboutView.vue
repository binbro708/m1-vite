<template>
  <app-header></app-header>

  <!-- banner區域 -->
  <div class="banner mb-5">
    <div class="container-fluid p-0">
      <div class="banner-img"></div>
    </div>
  </div>
  <div class="container-xxl">
    <div class="row">
      <div class="col-12 mb-5">
        <div
          class="row d-flex align-items-center flex-column flex-lg-row justify-content-between"
        >
          <div
            class="col-12 col-sm-6 d-flex flex-column-reverse flex-lg-column align-items-center"
          >
            <h3 class="mb-3">品牌緣起</h3>
            <h4 class="mb-3">『喜歡，最純粹的那種。』</h4>
            <p class="mb-3">
              這是牧一春誕生的初衷。
              <br />
              喜歡喝飲料的創始人從大學時代便喝遍不同的飲料，也因為喜歡而在飲料店打工。過程中他發現，大部分的飲料店基於成本考量，免不了會使用化學或濃縮的原物料。
              <br />
              體察到這件事的他萌生了一個念頭：他要開一家飲料店，堅決使用原型食材，嚴格把關新鮮及品質，讓飲料回到最純粹的樣貌，使消費者喝得健康無虞。
            </p>

            <p class="mb-3">這是牧一春，以純粹的喜歡，使您喜歡純粹。</p>
          </div>
          <div class="col-12 col-sm-6 d-flex flex-row-reverse">
            <img
              src="@/assets/img/about-1.png"
              alt="about-1"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row d-flex align-items-center flex-column flex-lg-row">
          <div class="col-12 col-sm-6">
            <img
              src="@/assets/img/about-1.png"
              alt="about-1"
              class="img-fluid"
            />
          </div>
          <div class="col-12 col-sm-6 d-flex flex-column align-items-center">
            <h3 class="mb-3">品牌理念</h3>
            <p class="mb-3">
              泡茶必須養壺，茶方能溫潤順口，越陳越香。
              <br />
              每一件小事做到極致就是最美的事。
              <br />
              我們深知這點，因此我們不願僅是泡茶，而是養茶—
              <br />
              一心一意培養茶飲，培養我們製茶的技術，
              <br />
              使本店茶飲達到最好的境界，獻給每一位支持牧一春的您。
              <br />
              誠摯邀請您，與我們一同成長，不只喝茶，我們一起養茶。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer class="mt-5"></app-footer>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
export default {
  name: "AboutView",

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
