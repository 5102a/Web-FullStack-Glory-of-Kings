import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import( /* webpackChunkName: "group-1" */ 'views/Login.vue')
const Main = () => import( /* webpackChunkName: "group-1" */ 'views/Main.vue')

const CategoryEdit = () => import( /* webpackChunkName: "group-1" */ 'views/cate/CategoryEdit.vue')
const CategoryList = () => import( /* webpackChunkName: "group-1" */ 'views/cate/CategoryList.vue')

const ItemEdit = () => import( /* webpackChunkName: "group-2" */ 'views/item/ItemEdit.vue')
const ItemList = () => import( /* webpackChunkName: "group-2" */ 'views/item/ItemList.vue')

const HeroEdit = () => import( /* webpackChunkName: "group-2" */ 'views/hero/HeroEdit.vue')
const HeroList = () => import( /* webpackChunkName: "group-2" */ 'views/hero/HeroList.vue')

const ArticleEdit = () => import( /* webpackChunkName: "group-3" */ 'views/article/ArticleEdit.vue')
const ArticleList = () => import( /* webpackChunkName: "group-3" */ 'views/article/ArticleList.vue')

const AdEdit = () => import( /* webpackChunkName: "group-3" */ 'views/ad/AdEdit.vue')
const AdList = () => import( /* webpackChunkName: "group-3" */ 'views/ad/AdList.vue')

const AdminUserEdit = () => import( /* webpackChunkName: "group-4" */ 'views/adminUser/AdminUserEdit.vue')
const AdminUserList = () => import( /* webpackChunkName: "group-4" */ 'views/adminUser/AdminUserList.vue')

const VideoEdit = () => import( /* webpackChunkName: "group-4" */ 'views/video/VideoEdit.vue')
const VideoList = () => import( /* webpackChunkName: "group-4" */ 'views/video/VideoList.vue')

const RoleEdit = () => import( /* webpackChunkName: "group-5" */ 'views/role/RoleEdit.vue')
const RoleList = () => import( /* webpackChunkName: "group-5" */ 'views/role/RoleList.vue')

const MenuEdit = () => import( /* webpackChunkName: "group-5" */ 'views/menu/MenuEdit.vue')
const MenuList = () => import( /* webpackChunkName: "group-5" */ 'views/menu/MenuList.vue')

const PowerEdit = () => import( /* webpackChunkName: "group-6" */ 'views/power/PowerEdit.vue')
const PowerList = () => import( /* webpackChunkName: "group-6" */ 'views/power/PowerList.vue')

const HomePage = () => import( /* webpackChunkName: "group-10" */ 'views/HomePage.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/homepage',
    children: [{
        path: '/homepage',
        name: 'homepage',
        component: HomePage,
      }, {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/categories/list',
        component: CategoryList
      },

      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/items/list',
        component: ItemList
      },

      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/edit/:id',
        component: HeroEdit,
        props: true
      },
      {
        path: '/heroes/list',
        component: HeroList
      },

      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/videos/create',
        component: VideoEdit
      },
      {
        path: '/videos/edit/:id',
        component: VideoEdit,
        props: true
      },
      {
        path: '/videos/list',
        component: VideoList,
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },
      {
        path: '/ads/list',
        component: AdList
      },

      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props: true
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
      {
        path: '/roles/create',
        component: RoleEdit
      },
      {
        path: '/roles/edit/:id',
        component: RoleEdit,
        props: true
      },
      {
        path: '/roles/list',
        component: RoleList
      },
      {
        path: '/menus/create',
        component: MenuEdit
      },
      {
        path: '/menus/edit/:id',
        component: MenuEdit,
        props: true
      },
      {
        path: '/menus/list',
        component: MenuList
      },
      {
        path: '/powers/create',
        component: PowerEdit
      },
      {
        path: '/powers/edit/:id',
        component: PowerEdit,
        props: true
      },
      {
        path: '/powers/list',
        component: PowerList
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})


router.beforeEach((to, from, next) => {
  // console.log(to, from);

  if (!to.meta.isPublic && !window.sessionStorage.getItem('token')) {
    return next('/login')
  } 
  next()
})



export default router