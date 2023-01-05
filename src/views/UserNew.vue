<template>
  <Loading :active="isLoading"></Loading>
  <AppHeader></AppHeader>
  <div class="page-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6">
          <img :src="article.imageUrl || '/Vector.png'" alt="logo" />
        </div>
        <div class="col-12 col-sm-6">
          <h3>{{ article.title }}</h3>
          <p class="h5">{{ article.create_at }}</p>
          <p class="h5">作者:{{ article.author }}</p>
          <p class="h5 mt-5 pre-line" v-html="article.content"></p>
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  data() {
    return {
      article: {},
      id: "",
    };
  },
  components: {
    // ToastMessages,
    AppHeader,
    AppFooter,
  },
  methods: {
    getNew() {
      const api = `https://vue3-course-api.hexschool.io/api/bin_test/article/${this.id}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.article = res.data.article;
          const createAtTimestamp = this.article.create_at;
          const createAtDate = new Date(createAtTimestamp);
          const createAtDateString = createAtDate
            .toISOString()
            .substring(0, 10);
          this.article.create_at = createAtDateString;
        }
      });
    },
  },
  created() {
    this.id = this.$route.params.newId;
    this.getNew();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 150px;
}
img {
  width: 343px;
  height: 286px;
  object-fit: contain;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 設置page-wrapper的最小高度為螢幕高度 */
}

/* 將container設置為flex: 1, 讓它占滿剩餘的高度 */
.container {
  flex: 1;
}

.pre-line {
  white-space: pre-line;
}
</style>
