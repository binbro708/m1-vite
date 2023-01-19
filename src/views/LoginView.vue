<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">信箱</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="信箱"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">密碼</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="密碼"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      const api = `https://${import.meta.env.VITE_API_URL}/admin/signin`;
      this.$http.post(api, this.user).then((res) => {
        // 如果登入的狀態是成功，就去存cookie
        if (res.data.success) {
          // cookie儲存
          const { token, expired } = res.data;
          document.cookie = `myToken=${token};expired=${new Date(expired)}`;
          //到dashBoard取cookie的token，順便轉到dashBoard
          this.$router.push("/dashboard/products");
        }
      });
    },
  },
};
</script>
