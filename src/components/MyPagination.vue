<template>
  <nav aria-label="Page navigation example  ">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="previousPage"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="page in pages.pageTotal"
        :key="page"
        :class="{ active: page === pages.currentPage }"
      >
        <!-- 會把當前頁面當參數傳進去emit裡面 -->
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{
          page
        }}</a>
      </li>
      <li>
        <a href="">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="nextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    updatePage(page) {
      this.$emit("emitPages", page);
    },
    nextPage() {
      const pages = { ...this.pages }; // 複製 pages
      pages.currentPage += 1;
      this.$emit("emitPages", pages.currentPage);
      //   this.$emit("emitPages", this.page.currentPage);
    },
    previousPage() {
      const pages = { ...this.pages }; // 複製 pages
      pages.currentPage -= 1;
      this.$emit("emitPages", pages.currentPage);
      //   this.$emit("emitPages", this.page.currentPage);
    },
  },
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: center;
  ul {
    margin: 0;
  }
}
</style>
