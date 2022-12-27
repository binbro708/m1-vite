<template>
  <Loading :active="isLoading"></Loading>
  <AppHeader></AppHeader>

  <div class="container wrap">
    <div class="row mt-4 d-flex justify-content-center">
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <!-- cart.carts有東西就用陣列呈現出來 -->
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="status.loadingItem === item.id"
                      @click="removeCartItem(item.id)"
                    >
                      刪除
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <!-- 當數量有更動就觸發updateCart 要傳入id所以把item給傳進去-->
                      <input
                        min="1"
                        type="number"
                        class="form-control"
                        :disabled="item.id === status.loadingItem"
                        v-model.number="item.qty"
                        @change="updateCart(item)"
                      />
                      <div class="input-group-text">
                        / {{ item.product.unit }}
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small
                      v-if="cart.final_total !== cart.total"
                      class="text-success"
                      >折扣價(打折後)：</small
                    >
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(cart.final_total) }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCouponCode"
              >
                套用優惠碼
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <btn type="button" class="btn btn-primary">
              <router-link class="navbar-brand" to="/buy/buyjam"
                >繼續購買</router-link
              ></btn
            >
            <btn type="button" class="btn btn-warning" @click="goPayBtn"
              >結帳去</btn
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 結帳表單 -->
    <div class="my-5 row justify-content-center" v-if="goPay">
      <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger" @click="goPayOrder">送出訂單</button>
        </div>
      </Form>
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
      products: [],
      product: {},
      //   單一按鈕狀態
      status: {
        loadingItem: "",
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      cart: {},
      coupon_code: "",
      goPay: false,
    };
  },
  components: {
    AppHeader,
    AppFooter,
  },
  methods: {
    getProducts() {
      // 取得商品列表
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/products/all`;
      //loading改變
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        this.isLoading = false;
      });
    },

    getCart() {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/cart`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        // 包含陣列列表
        this.cart = res.data.data;
        this.isLoading = false;
      });
    },
    updateCart(item) {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = { product_id: item.product_id, qty: item.qty };
      this.$http.put(url, { data: cart }).then(() => {
        this.status.loadingItem = "";
        this.getCart();
      });
    },
    addCouponCode() {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/coupon`;
      const coupon = { code: this.coupon_code };
      this.$http.post(url, { data: coupon }).then(() => {
        this.getCart();
      });
    },
    createOrder() {
      const url = `https://vue3-course-api.hexschool.io/api/bin_test/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then((res) => {
        if (res.data.success) {
          this.$router.push(`/buy/checkout/${res.data.orderId}`);
        }
      });
    },
    removeCartItem(id) {
      const api = `https://vue3-course-api.hexschool.io/api/bin_test/cart/${id}`;

      this.$http.delete(api).then(() => {
        this.getCart();
      });
    },
    goPayBtn() {
      this.goPay = true;
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
<style lang="scss">
.container {
  margin-top: 150px;
}
</style>
