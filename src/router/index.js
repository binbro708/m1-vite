/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/buy",
      name: "buy",
      component: () => import("../views/BuyView.vue"),
      children: [
        {
          path: "cart",
          name: "cart",
          component: () => import("../views/UserCart.vue"),
        },
        {
          path: "product/:productId",
          name: "product/:productId",
          component: () => import("../views/UserProduct.vue"),
        },
        {
          path: "buyjam",
          name: "buyjam",
          component: () => import("../views/BuyJamView.vue"),
        },
        {
          path: "checkout/:orderId",
          component: () => import("../views/UserCheckout.vue"),
        },
      ],
    },
    {
      path: "/drinkmenu",
      name: "drinkmenu",
      component: () => import("../views/DrinkMenu.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
      children: [
        {
          path: "new/:newId",
          name: "new/:newId",
          component: () => import("../views/UserNew.vue"),
        },
        {
          path: "newlist",
          name: "newlist",
          component: () => import("../views/NewsList.vue"),
        },
      ],
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/loginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("../views/ProductsView.vue"),
        },

        {
          path: "orders",
          component: () => import("../views/OrdersPage.vue"),
        },
        {
          path: "coupons",
          component: () => import("../views/CouponsPage.vue"),
        },
        {
          path: "news",
          component: () => import("../views/NewsBoard.vue"),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
