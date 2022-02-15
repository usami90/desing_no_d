import Vue from 'vue'
import Users from './Users.vue'
import Presentor from './Presentor.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Users),
}).$mount('#users')

new Vue({
  render: h => h(Presentor),
}).$mount('#presentor')