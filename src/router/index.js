import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from "@/components/AuthLayout";
import RewardPointsRules from "@/modules/RewardRules/RewardPointsRules";

const routes = [
  {
    path:'/',
    name:'Admin',
    redirect:'/admin/reward-point-rules',
    component:AuthLayout,
    children:[
      {
        path:'/admin/reward-point-rules',
        name:'RewardPointRules',
        meta:{title: "Reward Points Rules"},
        component:RewardPointsRules
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "apbd-active",
  linkExactActiveClass: "apbd-exact-active",
})

export default router
