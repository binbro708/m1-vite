<template>
  <footer class="container-fluid">
    <div
      class="footer-group d-flex justify-content-between flex-column align-items-center flex-md-row"
    >
      <img src="@/assets/img/logo.png" alt="logo" />
      <div class="footer-text-group my-5 my-md-0">
        <p class="m-0">電話:0965656865</p>
        <p class="m-0">營業時間:10:00~22:00</p>
        <p class="m-0">地址:台中市北屯區遼寧路一段148號</p>
        <p class="m-0">
          牧一春 2022 © Copyright All Rights Reserved. 網頁設計‧JaZz SEA
        </p>
      </div>
      <div class="footer-icon d-flex align-items-center">
        <a href="">
          <i class="fa-solid fa-phone"></i>
        </a>
        <a href="">
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a href="">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style lang="scss">
@import "@/assets/scss/_mixin.scss";

footer {
  width: 100%;
  img {
    @include mb576 {
      width: 204px;
      height: 80px;
    }
  }
  background-color: $mainColor;
  .footer-group {
    padding: 23px 0;
    margin: 0 auto;
    max-width: 1000px;
    .footer-text-group {
      color: white;
    }
    .footer-icon {
      font-size: 20px;
      color: white;
      a {
        color: white;
        margin-right: 10px;
      }
    }
  }
}
</style>
