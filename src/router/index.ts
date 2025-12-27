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
      },
      {
        path: "company-setup",
        name: "CompanySetup",
        // component: () => import("@/views/CompanySetup.vue"),
        children: [
          {
            path: "branch",
            name: "Branch",
            // component: () => import("@/views/Branch.vue"),
          },
          {
            path: "position",
            name: "Position",
            // component: () => import("@/views/Position.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;