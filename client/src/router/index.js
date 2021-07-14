import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import proClassifyList from '../views/classify/proClassifyList.vue'
import addClassify from '../views/classify/addClassify.vue'
import addPro from '../views/product/addPro.vue'
import menuList from '../views/menu/index.vue'
import powerMan from '../views/user/powerMan.vue'
import roleMenu from '../views/user/roleMenu.vue'
import proList from '../views/product/proList.vue';
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
  },
  {
    path:'/powerMan',
    name:'powerMan',
    component:powerMan,
    meta:{
      name:"用户权限管理"
    }
  },
  {
    path:'/roleMenu',
    name:'roleMenu',
    component:roleMenu,
    meta:{
      name:"角色菜单管理"
    }
  },
  {
    path:'/proList',
    name:'proList',
    component: proList,
    meta:{
      name:"产品列表"
    }
  },
  {
    path:'/recomPro',
    name:'recomPro',
    component: () => import('../views/product/recomPro.vue'),
    meta:{
      name:"修改产品"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
