import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/works', name: 'works', component: () => import('@/views/Works.vue') },
  // { path: '/misc', name: 'misc', component: () => import('@/views/Misc.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/About.vue') },
  { 
    path: '/work/:id',
    name: 'work.detail', 
    component: () => import('@/views/WorkDetail.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]

/** 
 * 用于延迟滚动，等待过渡 overlay 遮盖后，才滚动页面，返回一个 Promise
 * @param pos 要滚动到的位置，object，如：{ top:0 }
*/
const delayTransition = (pos:object):Promise<false | void | ScrollOptions> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(pos)
    }, 600)
  })
}
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return delayTransition(savedPosition)
    } else {
      return delayTransition({ top:0 })
    }
  }
})

export default router