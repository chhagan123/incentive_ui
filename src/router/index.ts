import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/Home.vue"),
    children: [
      {
        path: "overview",
        name: "Overview",
        component: () => import("../components/Home.vue"),
        meta: { breadcrumb: "Overview" },
      },
      {
        path: "employees",
        name: "Employees",
        component: () => import("../components/Home.vue"),
        meta: { breadcrumb: "Employees" },
      },
      {
        path:"calculator",
        name: "Calculator",
        component: () => import("../components/Home.vue"),
        meta: { breadcrumb: "Calculator" },
      }
    ],
  },

  {
    path: "/company-setup",
    component: () => import("../views/setup/CompanySetup.vue"),
    meta: { breadcrumb: "Company Setup" },
    children: [
      {
        path: "branch",
        component: () => import("../views/setup/Branches.vue"),
        meta: { breadcrumb: "Branch" },
      },
      {
        path: "position",
        component: () => import("../views/setup/Positions.vue"),
        meta: { breadcrumb: "Position" },
      },
      {
        path: "payout-template",
        component: () => import("../views/setup/PayoutTemp.vue"),
        meta: { breadcrumb: "Payout Template" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
