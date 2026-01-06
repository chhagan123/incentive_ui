import { createRouter,createWebHistory } from "vue-router";

import Home from '../views/Home.vue'
import CompnaySetup from "../views/CompanySetup/CompanySetup.vue";

const routes = [
    {
      path: "/",
      component: Home,
      meta: { breadcrumb: "" },
      children: [
        {
          path: "overview",
          name: "overview",
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
    },
    {
        path: "/company-setup",
        component: CompnaySetup,
        meta: { breadcrumb: "company setup" },
        children: [
            {
              path: "branches",
              name: "branch",
              component: Home,
              meta: { breadcrumb: "branches" },
            },
            {
             path: "positions",
             name: "positions",
             component: Home,
             meta: { breadcrumb: "positions" },
            },
            {
             path: "payout-templates",
             name: "payout-templates",
             component: Home,
             meta: { breadcrumb: "pauout-templates" },
              },
            
        ]  
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  
export default router