import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    // component: () => import("../components/Home.vue"),
    children: [
      {
        path: "overview",
        name: "Overview",
        component: () => import("../components/Home.vue"),
        meta: { breadcrumb: "overview" },
      },
    // router/index.js
  {
  path: "/company-setup",
  component: import("../views/setup/CompanySetup.vue"),
  meta: { breadcrumb: "Company Setup" },
  children: [
    {
      path: "branch",
      component: import("../views/setup/Branches.vue"),
      meta: { breadcrumb: "Branch" },
    },
    {
      path: "position",
      component: import("../views/setup/CompanySetup.vue"),
      meta: { breadcrumb: "Position" },
    },
    {
      path: "payout-template",
      component: import("../views/setup/CompanySetup.vue"),
      meta: { breadcrumb: "payout-template" },
    },
  ],
}

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
