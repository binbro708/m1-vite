<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link"
              >訂單</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons" class="nav-link"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/news" class="nav-link"
              >文章</router-link
            >
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      // 登出 並且重新轉址
      const api = `https://${import.meta.env.VITE_API_URL}/logout`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>
