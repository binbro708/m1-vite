<template>
  <Loading :active="isLoading"></Loading>
  <app-header />

  <!-- banner區域 -->
  <div class="banner mb-5">
    <div class="container-fluid p-0">
      <div class="banner-img"></div>
    </div>
  </div>
  <main>
    <!-- 關於我們 -->
    <div class="container-xxl about-splice">
      <div class="row">
        <div class="about-group col-12 col-sm-6">
          <div class="about-text-group d-flex flex-column">
            <h2>關於我們</h2>
            <h3>『喜歡，最純粹的那種』</h3>
            <p>牧一春誕生的初衷與使命— <br />以最純粹的喜歡，使您喜歡純粹。</p>
          </div>
          <div>
            <img
              src="@/assets/img/about-img-1.png"
              alt="about-img-1"
              class="img-fluid"
            />
          </div>
        </div>
        <div
          class="splice-group col-12 col-sm-6 d-flex d-sm-block flex-column flex-column-reverse mt-5 mt-sm-0"
        >
          <img src="@/assets/img/about-img-2.png" alt="about-img-2.png" />
          <div class="splice-text-group d-flex flex-column">
            <h2>品牌精神</h2>
            <h3>『為茶飲找到最好的詮釋』</h3>
            <p>
              從茶飲開發至原物料製作，凡事親力親為。
              <br />
              牧一春以最嚴格的把關，獻上品質最好的茶飲。
              <br />
              為茶飲找到最好的詮釋—
              <br />
              是我們的使命，也是我們的自信。
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 販賣果醬區 -->
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
                    'https://storage.googleapis.com/vue-course-api.appspot.com/${import.meta.env.VITE_API_PATH}/1671894814585.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cXIvKpH2H7jlHaQ3mzxElVzQBdFcPhZOFmSsoT9dNytb5hvqJGLkTaKhuqOPbHKZZTDr8TTZr6dclzcQPH08kZwXA51dN5CKjj41AfDm9m4Ck6zmijjjZ0wl71i36Dc89Or%2FTpkLfCQyXpUlH%2FluUEI29BEacqDc846kHoLnmlegV7OVe6aseAaUgEuW5MccHU8vkPkCvBRuSJGNaWLwdXPkVyAx8jNJ5z9ZW3IcNsxs2pKHy4qjbPqBaNlGL1KMtriW2xFuLycDTjqxAnJqgakNZCHIMCLT6zlykJsj4TsbDK10u0hUR1eeUUjHqx96cvUTVFYj2DABUPO1EIcBvg%3D%3D'
                  "
                  class="card-img-top"
                  alt="產品圖片"
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
                      class="btn btn-primary me-auto btn-group-sm btn-group d-flex align-items-center buy-btn"
                      @click="addCart(item.id)"
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
                      class="btn btn-primary more-btn"
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
    <!-- 最新消息 -->
    <div class="container-xxl news-group">
      <div class="row d-flex flex-column justify-content-center">
        <div class="col-12 news-text d-flex flex-column">
          <div class="d-flex justify-content-between align-items-end">
            <p class="new-title mb-0">最新消息</p>
            <router-link to="/news/newlist">
              <p class="more-news-btn mb-0">查看更多 ...</p>
            </router-link>
          </div>

          <hr />
        </div>
        <div class="col-12 new-group gx-5">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-3 new-cardF new-card"
              v-for="item in news"
              :key="item.id"
            >
              <a @click.prevent="getNew(item.id)">
                <div style="overflow: hidden">
                  <img :src="item.imageUrl || '/Vector.png'" alt="最新消息" />
                </div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.create_at }}</p>
              </a>
            </div>
          </div>
        </div>
        <MyPagination
          :pages="newsPagination"
          @emitPages="getNews"
        ></MyPagination>
      </div>
    </div>
  </main>
  <CartIcon />
  <app-footer class="mt-5"></app-footer>
  <!-- <ToastMessages></ToastMessages> -->
</template>
<script>
// import ToastMessages from "@/components/ToastMessages.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import CartIcon from "@/components/CartIcon.vue";
import MyPagination from "@/components/MyPagination.vue";
import ProductsPagination from "@/components/ProductsPagination.vue";
export default {
  name: "HomeView",
  components: {
    // ToastMessages,
    AppHeader,
    AppFooter,
    CartIcon,
    MyPagination,
    ProductsPagination,
  },
  data() {
    return {
      products: [],
      product: {},
      newsPagination: {},
      productsPagination: {},
      news: [],
      status: {
        loadingItem: "",
      },
      isLoading: false,
    };
  },
  methods: {
    // getProducts() {
    //   const url = `https://${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/products/all`;
    //   this.isLoading = true;
    //   this.$http.get(url).then((res) => {
    //     this.products = res.data.products;
    //     this.isLoading = false;
    //   });
    // },
    getProducts(page = 1) {
      const url = `https://${import.meta.env.VITE_API_URL}/api/${
        import.meta.env.VITE_API_PATH
      }/products/all`;
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
      const url = `https://${import.meta.env.VITE_API_URL}/api/${
        import.meta.env.VITE_API_PATH
      }/cart`;
      //   去比對是點到哪個產品
      this.status.loadingItem = id;
      const cart = { product_id: id, qty: 1 };
      this.$http.post(url, { data: cart }).then(() => {
        this.status.loadingItem = "";
      });
    },
    // getNews(page = 1) {
    //   const url = `https://${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/articles?page=${page}`;
    //   this.isLoading = true;
    //   this.$http.get(url).then((res) => {
    //     this.news = res.data.articles;
    //     this.news.forEach((item) => {
    //       const createAtTimestamp = item.create_at;
    //       const createAtDate = new Date(createAtTimestamp);
    //       const createAtDateString = createAtDate
    //         .toISOString()
    //         .substring(0, 10);
    //       item.create_at = createAtDateString;
    //     });
    //     this.isLoading = false;
    //   });
    // },
    getNews(page = 1) {
      const url = `https://${import.meta.env.VITE_API_URL}/api/${
        import.meta.env.VITE_API_PATH
      }/articles`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        const dataTotal = res.data.articles.length;
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
        this.newsPagination = {
          pageTotal,
          currentPage,
          hasPage: currentPage > 1,
          hasNext: currentPage < dataTotal,
        };
        this.news = [];
        res.data.articles.forEach((item, index) => {
          const num = index + 1;
          if (num >= minData && num <= maxData) {
            this.news.push(item);
          }
          const createAtTimestamp = item.create_at;
          const createAtDate = new Date(createAtTimestamp);
          const createAtDateString = createAtDate
            .toISOString()
            .substring(0, 10);
          item.create_at = createAtDateString;
        });
        // this.news = res.data.articles;
      });
    },
    getNew(id) {
      this.$router.push(`/news/new/${id}`);
    },
  },
  created() {
    this.getProducts();
    this.getNews();
    // this.testNews();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixin.scss";

body {
  position: relative;
}
a {
  text-decoration: none !important;
}
nav {
  font-size: 20px;
  background-color: $mainColor;
  .container-fluid {
    padding: 0 12.1%;
  }
  a:hover {
    color: goldenrod !important;
  }
}

.banner {
  .banner-img {
    background-image: url("@/assets/img/banner.png");
    height: 1041px;
    background-size: cover;
    position: relative;
    background-position: 75%;
  }
}

main {
  margin-top: 165px;
  .container-fluid {
    padding: 0;
  }
  .about-splice {
    margin-bottom: 200px;
  }
  .about-group {
    .about-text-group {
      h2 {
        color: $mainColor;
        font-family: $titleText;
        margin-bottom: 30px;
      }
      h3 {
        color: $mainColor;
        font-family: $titleText;
        margin-bottom: 30px;
      }
      p {
        color: $mainColor;
        font-family: $contentText;
        margin-bottom: 30px;
      }
    }
  }
  .splice-group {
    .splice-text-group {
      h2 {
        color: $mainColor;
        font-family: $titleText;
        margin-bottom: 30px;
      }
      h3 {
        color: $mainColor;
        font-family: $titleText;
        margin-bottom: 30px;
      }
      p {
        color: $mainColor;
        font-family: $contentText;
        margin-bottom: 30px;
      }
    }
  }
}

.jam-sale {
  margin-bottom: 100px;
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
.buy-btn,
.more-btn {
  background-color: rgb(21, 63, 86);
  &:hover {
    background-color: rgb(21, 63, 86, 0.7);
  }
}
.news-group {
  margin-bottom: 200px;
  .new-group {
    padding-top: 25px;
    padding-bottom: 25px;
    img {
      width: 342px;
      height: 288px;
      @include mb768 {
        width: 100%;
        height: auto;
      }
    }
    .new-card {
      cursor: pointer;
      margin-bottom: 24px;
    }
    .new-card {
      position: relative;
      overflow: hidden;
      transform: scale(1);
      img:hover {
        transform: scale(1.3);
        transition: all 1s ease-out;
      }
      h4,
      p {
        color: black;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .new-card-text {
      width: 60px;
      height: 177px;
      background-color: $mainColor;
      color: white;
      padding-top: 16px;
      font-size: 20px;
      position: absolute;
      top: 25px;
      left: 42px;
      h4 {
        font-family: $titleText;
        writing-mode: vertical-lr;
      }
      .new-card-date {
        position: absolute;
        width: 50px;
        height: 65px;
        font-size: 20px;
        right: -27px;
        bottom: -25px;
        background-color: white;
        color: $mainColor;
        h4 {
          writing-mode: unset;
        }
      }
    }
  }
  .news-text {
    .new-title {
      padding-top: 50px;
      @include mb768 {
        padding-top: 0;
      }
      font-size: 50px;
      color: $mainColor;

      font-family: $titleText;
    }
    .more-news-btn {
      font-size: 32px;
      color: $mainColor;
      font-family: $titleText;
    }
  }
}
</style>
