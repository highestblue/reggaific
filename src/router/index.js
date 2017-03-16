import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Play from '@/components/Play'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'List', component: List },
    { path: '/play/:id', name: 'Play', component: Play },
    { path: '*', component: List }
  ]
})
