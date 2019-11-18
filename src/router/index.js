import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import login from '../views/login'

// 引入二级路由模块

import indexs from '@/views/home/indesss.vue'
import publish from '@/views/publish'
import article from '@/views/article'
// 加载 nprogress
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    //  进入登录页面
    path: '/home',
    component: home

  },
  {
    //
    path: '/login',
    component: login,
    children: [
      {
        // 我是首页的内容
        path: '',
        component: indexs
      },
      {
      //  我是发布内容的路由组件是
        path: '/publish',
        component: publish
      },
      {
      //  我是发布内容的路由组件是
        path: '/article',
        component: article
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由卫士, 当路由开始的时候通过路由守卫的时候要激活 顶部加载条的开始阶段
router.beforeEach((to, from, next) => {
  // 路由开始的时候加载请求加载条
  console.log(to, from)
  if (to === from) {
    return next()
  }
  NProgress.start()
  if (to.path === '/home') {
    return next()
  }

  //  非登录页面 进行验证登录的状态
  const token = window.localStorage.getItem('token')
  // 有token 就通过验证
  if (token) {
    next()
  } else {
    next('/home')
    // r如果是登录页的情况下,如果是没有 token状态就 不停止 登录加载状态
    NProgress.done()
  }
})

/**
 * 路由导航结束后将所有的加载状态条结束掉
*/
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
