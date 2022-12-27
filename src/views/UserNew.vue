<template>
  <Loading :active="isLoading"></Loading>
  <AppHeader></AppHeader>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <img :src="article.imageUrl || '/Vector.png'" alt="logo" />
      </div>
      <div class="col-6">
        <h3>{{ article.title }}</h3>
        <p class="h5">{{ article.create_at }}</p>
        <p class="h5">作者:{{ article.author }}</p>
        <p class="h5 mt-5">{{ article.content }}</p>
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
</style>
