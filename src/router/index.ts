import { createRouter,createWebHistory } from "vue-router";

import Home from '../views/Home.vue'

const routes = [
    {
      path: "/",
      component: Home,
      meta: { breadcrumb: "" },
      children: [
        {
          path: "overview",
          name: "Overview",
          component: Home,
          meta: { breadcrumb: "Overview" },
        },
        {
            path: "employees",
            name: "employess",
            component: Home,
            meta: { breadcrumb: "employees" },
          },
        {
            path: "calculator",
            name: "Calculator",
            component: Home,
            meta: { breadcrumb: "Calculator" },
          }
      ]
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  
export default router