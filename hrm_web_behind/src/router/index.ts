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
    path:'/body',
    component :  Body,
    meta: { authRequired: true },
    children: [
      { path:'/notices',component : () => import('@/views/Notices/index.vue')},
      { path:'/attendance',component : () => import('@/views/Attendance/index.vue')},
      { path:'/train', children:[
        { path:'/culture',component : () => import('@/views/Train/culture/index.vue')},
        { path:'/training',component : () => import('@/views/Train/training/index.vue')},
      ]},
      { path:'/section',component : () => import('@/views/Section/index.vue')},
      { path:'/employees',
        children:[
          { path:'/employee',component : () => import('@/views/Employee/employee/index.vue')},
          { path:'/relieve',component : () => import('@/views/Employee/relieve/index.vue')},
          { path:'/dimission',component : () => import('@/views/Employee/dimission/index.vue')}
        ]
      },
      { path:'/performance',component : () => import('@/views/Performance/index.vue')},
      { path:'/feedback',component : () => import('@/views/Feedback/index.vue')},
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