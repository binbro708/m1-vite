<template>
  <Loading :active="isLoading"></Loading>
  <app-header></app-header>
  <!-- banner區域 -->
  <div class="banner mb-5">
    <div class="container-fluid p-0">
      <div class="banner-img"></div>
    </div>
  </div>
  <div class="container-xxl news-group">
    <div class="row d-flex flex-column justify-content-center">
      <div class="col-12 news-text d-flex flex-column">
        <p class="new-title">最新消息</p>
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
                <img
                  :src="item.imageUrl || '/Vector.png'"
                  alt="logo"
                />
              </div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.create_at }}</p>
            </a>
          </div>
        </div>
      </div>
      <MyPagination :pages="newsPagination" @emitPages="getNews"></MyPagination>
    </div>
  </div>

  <app-footer class="mt-5"></app-footer>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import MyPagination from "../components/MyPagination.vue";
export default {
  name: "NewsView",
  data() {
    return {
      newsPagination: {},
      isLoading: false,
    };
  },
  components: { AppHeader, AppFooter, MyPagination },
  methods: {
    getNews(page = 1) {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/articles`;
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
    this.getNews();
    // this.testNews();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixin.scss";

.news-text {
  width: 100%;
  background-color: $mainColor;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  font-family: $contentText;
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
body {
  position: relative;
}
a {
  text-decoration: none !important;
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
    background-color: $mainColor;
    .new-title {
      padding-top: 50px;
      @include mb768 {
        padding-top: 0;
      }
      font-size: 50px;
      color: white;
      font-family: $titleText;
    }
    .more-btn {
      font-size: 32px;
      color: white;
      font-family: $titleText;
    }
  }
}
</style>
