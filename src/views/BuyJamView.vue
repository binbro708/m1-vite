<template>
  <Loading :active="isLoading"></Loading>
  <AppHeader></AppHeader>
  <div class="container-xxl jam-sale">
    <h2>美味的果醬們</h2>

    <div class="row g-0 g-sm-3">
      <div
        class="col-12 col-sm-6 col-lg-4 col-xxl-3 d-flex justify-content-center"
        v-for="item in products"
        :key="item.id"
      >
        <div class="card" style="width: 18rem">
          <div class="row align-items-center justify-contents-center g-0">
            <div class="col-4 col-sm-12 d-flex mx-auto">
              <img
                :src="
                  item.imageUrl ||
                  'https://storage.googleapis.com/vue-course-api.appspot.com/bin_test/1671894814585.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cXIvKpH2H7jlHaQ3mzxElVzQBdFcPhZOFmSsoT9dNytb5hvqJGLkTaKhuqOPbHKZZTDr8TTZr6dclzcQPH08kZwXA51dN5CKjj41AfDm9m4Ck6zmijjjZ0wl71i36Dc89Or%2FTpkLfCQyXpUlH%2FluUEI29BEacqDc846kHoLnmlegV7OVe6aseAaUgEuW5MccHU8vkPkCvBRuSJGNaWLwdXPkVyAx8jNJ5z9ZW3IcNsxs2pKHy4qjbPqBaNlGL1KMtriW2xFuLycDTjqxAnJqgakNZCHIMCLT6zlykJsj4TsbDK10u0hUR1eeUUjHqx96cvUTVFYj2DABUPO1EIcBvg%3D%3D'
                "
                class="card-img-top"
                alt="..."
              />
            </div>
            <div class="col-8 col-sm-12">
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">{{ item.description }}</p>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="h6" v-if="item.price"
                  >原價 {{ item.origin_price }} 元</del
                >
                <div class="h5" v-if="item.price">
                  現在只要 {{ item.price }} 元
                </div>
                <div class="d-flex justify-contents-between">
                  <button
                    type="button"
                    class="btn btn-primary me-auto btn-group-sm btn-group d-flex align-items-center"
                    @click.prevent="addCart(item.id)"
                    :disabled="this.status.loadingItem === item.id"
                  >
                    <div
                      v-if="this.status.loadingItem === item.id"
                      class="spinner-grow text-light spinner-grow-sm"
                      role="status"
                    >
                      <span class="visually-hidden"></span>
                    </div>
                    加入購物車
                  </button>
                  <a
                    class="btn btn-primary"
                    @click.prevent="getProduct(item.id)"
                    >查看更多</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductsPagination
        :pages="productsPagination"
        @emitPages="getProducts"
      ></ProductsPagination>
    </div>
  </div>
  <CartIcon></CartIcon>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import CartIcon from "@/components/CartIcon.vue";
import ProductsPagination from "../components/ProductsPagination.vue";

export default {
  name: "HomeView",
  components: {
    // ToastMessages,
    AppHeader,
    AppFooter,
    CartIcon,
    ProductsPagination,
  },
  data() {
    return {
      products: [],
      product: {},
      productsPagination: {},
      status: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/products/all`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        const dataTotal = res.data.products.length;
        const perpage = 8;
        const pageTotal = Math.ceil(dataTotal / perpage);
        let currentPage = page;
        if (currentPage > pageTotal) {
          currentPage = pageTotal;
        }
        if (currentPage < 1) {
          currentPage = 1;
        }
        const minData = currentPage * perpage - perpage + 1;
        const maxData = currentPage * perpage;
        this.productsPagination = {
          pageTotal,
          currentPage,
          hasPage: currentPage > 1,
          hasNext: currentPage < dataTotal,
        };
        this.products = [];
        res.data.products.forEach((item, index) => {
          const num = index + 1;
          if (num >= minData && num <= maxData) {
            this.products.push(item);
          }
        });
        // this.news = res.data.articles;
      });
    },
    getProduct(id) {
      this.$router.push(`/buy/product/${id}`);
    },
    addCart(id) {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/cart`;
      //   去比對是點到哪個產品
      this.status.loadingItem = id;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(url, { data: cart }).then(() => {
        this.status.loadingItem = "";
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixin.scss";

.jam-sale {
  margin-top: 200px;
  margin-bottom: 200px;
  .card {
    margin-bottom: 30px;
    img {
      height: 300px;
      @include mb576 {
        height: unset;
      }
      object-fit: contain;
      object-position: bottom;
    }
    h5 {
      color: $mainColor;
      font-family: $titleText;
    }
    p {
      color: $mainColor;
      font-family: $contentText;
    }
    a {
      font-family: $contentText;
    }
  }
}
</style>
