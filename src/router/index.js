import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '../views/some/index.vue'
import Content from '../views/content/index.vue'
import Image from '../views/image/index.vue'
import pushlist from '@/views/publish'
import Fans from '@/views/fans'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Found from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { path: '/article', component: Content },
        { path: '/image', component: Image },
        { path: '/publish', component: pushlist },
        { path: '/fans', component: Comment },
        { path: '/comment', component: Fans },
        { path: '/setting', component: Setting }
      ]
    },
    { path: '*', component: Found }

  ]

})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // console.log(store.getUser())
  if (!store.getUser().token) return next('/login')
  next()
})
export default router
