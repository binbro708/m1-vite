<template>
  <Loading :active="isLoading"></Loading>
  <AppHeader></AppHeader>
  <div class="container-xxl">
    <div class="row justify-content-center">
      <article class="col-12 col-sm-8 mt-4">
        <img
          style="width: 300px; height: 300px; object-fit: contain"
          :src="
            product.imageUrl ||
            'https://storage.googleapis.com/vue-course-api.appspot.com/bin_test/1671894814585.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cXIvKpH2H7jlHaQ3mzxElVzQBdFcPhZOFmSsoT9dNytb5hvqJGLkTaKhuqOPbHKZZTDr8TTZr6dclzcQPH08kZwXA51dN5CKjj41AfDm9m4Ck6zmijjjZ0wl71i36Dc89Or%2FTpkLfCQyXpUlH%2FluUEI29BEacqDc846kHoLnmlegV7OVe6aseAaUgEuW5MccHU8vkPkCvBRuSJGNaWLwdXPkVyAx8jNJ5z9ZW3IcNsxs2pKHy4qjbPqBaNlGL1KMtriW2xFuLycDTjqxAnJqgakNZCHIMCLT6zlykJsj4TsbDK10u0hUR1eeUUjHqx96cvUTVFYj2DABUPO1EIcBvg%3D%3D'
          "
          alt="logo"
          class="img-fluid mb-3 w-100"
        />
      </article>
      <div class="col-12 col-sm-4 d-flex flex-column">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div class="mt-4">{{ product.description }}</div>

        <div>
          <hr />
          <div class="h5" v-if="!product.price">
            {{ product.origin_price }} 元
          </div>
          <del class="h6" v-if="product.price"
            >原價 {{ product.origin_price }} 元</del
          >
          <div class="h5" v-if="product.price">
            優惠價 {{ product.price }} 元
          </div>
          <div class="h5 mt-3">
            數量:<input type="number" min="1" max="10" v-model="qty" />
            {{ product.unit }}
          </div>
          <hr />
          <button
            type="button"
            class="btn btn-outline-danger align-self-auto mt-auto"
            @click="addToCart(product.id)"
          >
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 h5">
        現在購買商品並輸入優惠卷代碼"jam"即可享有9折優惠，可以與優惠價疊加
      </div>
      <div class="col-12 h5 mt-5">
        <p>※購買須知</p>
        <p>保存期限:於陰涼處可存放 18 個月，開封後請冷藏。</p>
        <p>最佳賞味期為開封後 2週內，請儘早食用完畢。</p>
        <p>請使用乾燥清潔的湯匙器具，避免水氣進入，影響果醬保存。</p>
        <p>手工果醬自然無添加，色澤隨時間褪色是正常現象，不影響口感。</p>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  data() {
    return {
      product: {},
      id: "",
      qty: 1,
    };
  },
  components: {
    // ToastMessages,
    AppHeader,
    AppFooter,
  },
  methods: {
    getProduct() {
      const api = `https://vue3-course-api.hexschool.io/api/bin_test/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.product = res.data.product;
        }
      });
    },
    addToCart(id) {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/cart`;
      const qty = this.qty;
      const cart = {
        product_id: id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(url, { data: cart }).then((res) => {
        this.isLoading = false;
        this.$httpMessageState(res, "加入購物車");
        this.$router.push("/buy/buyjam");
      });
    },
  },
  created() {
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.container-xxl {
  margin-top: 150px;
  margin-bottom: 150px;
}
</style>
