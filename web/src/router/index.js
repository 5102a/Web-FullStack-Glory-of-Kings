import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import( /* webpackChunkName: "group-1" */ 'views/Main.vue')
const Home = () => import( /* webpackChunkName: "group-1" */ 'views/Home.vue')
const Article = () => import( /* webpackChunkName: "group-2" */ 'views/Article.vue')
const Hero = () => import( /* webpackChunkName: "group-2" */ 'views/Hero.vue')
const Video = () => import( /* webpackChunkName: "group-3" */ 'views/Video.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Main,
    children: [{
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/articles/:id',
        name: 'article',
        component: Article,
        props: true
      },
      {
        path: '/videos/:id',
        name: 'video',
        component: Video,
        props: true
      }

    ]
  },
  {
    path: '/heroes/:id',
    name: 'hero',
    component: Hero,
    props: true
  },

]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})


export default router