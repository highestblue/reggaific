// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

export const bus = new Vue()

Vue.filter('ms2min', (ms) => {
  let s = ms / 1000
  let m = Math.floor(s / 60)
  let rs = s - m * 60
  if (rs < 10) rs = '0' + rs
  if (m < 10) m = '0' + m
  return m + ':' + rs
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
