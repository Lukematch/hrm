import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/Login/index.vue'
import Body from '@/views/Body/index.vue'
import { message } from "ant-design-vue";

export const routes = [
  {
    path:'/',
    redirect: '/login'
  },
  {
    path:'/login',
    component : Login,
  },
  {
    path:'/',
    component :  Body,
    children: [
      { path:'/home',component : () => import('@/views/Home/index.vue')},
      { path:'/user',component : () => import('@/views/User/index.vue')},
      { path:'/attendance',component : () => import('@/views/Attendance/index.vue')},
      { path:'/train', children:[
        { path:'/culture',component : () => import('@/views/Train/culture/index.vue')},
        { path:'/training',component : () => import('@/views/Train/training/index.vue')},
      ]},
      { path:'/workbench', children:[
        { path:'/jobs',component : () => import('@/views/Workbench/jobs/index.vue')},
        { path:'/transfer',component : () => import('@/views/Workbench/transfer/index.vue')},
      ]},
      { path:'/wechat',component : () => import('@/views/Wechat/index.vue')},
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior(){
    return {
      left:0,
      top:0
    }
  }
})

router.beforeEach((to, _from, next)=>{
  const token = localStorage.getItem('token')
  if(to.path !== '/login' && !token){
    next('/login')
    message.warning('您还未登录，请先登录再访问！')
  }else{
    next()
  }
})

export default router