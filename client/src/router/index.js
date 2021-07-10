import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import proClassifyList from '../views/classify/proClassifyList.vue'
import addClassify from '../views/classify/addClassify.vue'
import addPro from '../views/product/addPro.vue'
import menuList from '../views/menu/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ClassifyList',
    name: 'ClassifyList',
    component: proClassifyList,
    meta:{
      name:"产品分类"
    }
  },
  {
    path: '/addClassify',
    name: 'addClassify',
    component: addClassify,
    meta:{
      name:"添加分类"
    }
  },
  {
    path: '/addProduct',
    name: 'addProduct',
    component: addPro,
    meta:{
      name:"添加产品"
    }
  },
  {
    path:'/menuList',
    name:'menuList',
    component:menuList,
    meta:{
      name:"菜单列表"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
