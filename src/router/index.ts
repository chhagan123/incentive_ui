import { createRouter,createWebHistory } from "vue-router";

import Home from '../views/Home.vue'
import CompnaySetup from "../views/CompanySetup/CompanySetup.vue";
import Branches from "../views/CompanySetup/Branches.vue";
import Postions from "../views/CompanySetup/Postions.vue";
import PayoutTemp from "../views/CompanySetup/PayoutTemp.vue";
import CreateTemp from "../views/PayoutSetup/CreateTemp.vue";
import Details from "../views/PayoutSetup/Details.vue";
import Login from "../views/Authentication/Login.vue";

const routes = [

    {
    path:"/auth/login",
    component:Login,

    },
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
              component: Branches,
              meta: { breadcrumb: "branches" },
            },
            {
             path: "positions",
             name: "positions",
             component: Postions,
             meta: { breadcrumb: "positions" },
            },
            {
             path: "payout-templates",
             name: "payout-templates",
             component: PayoutTemp,
             meta: { breadcrumb: "payout-templates" },
              },              
        ]  
    },
    {
      path: "/company-setup",
      meta: { breadcrumb: "Company Setup" },
      children: [
        {
          path: "payout-templates",
          meta: { breadcrumb: "Payout Templates" },
          children: [
            {
              path: "create",
              component: CreateTemp,
              meta: { breadcrumb: "Create" },
            },
            {
              path: `details/:id`,
              component: Details,
              meta: { breadcrumb: "Details" },
            },
          ],
        },
      ],
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  
export default router