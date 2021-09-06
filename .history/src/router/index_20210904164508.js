
import Vue from 'vue'
import VueRouter from 'vue-router'
import Write from '../views/author/authors.vue'
import quesDetail from '../views/questions/QuestionDetail.vue'

const Home = () => import('../views/home/Home')

const Question = () => import('../views/questions/Question')
const Read = () => import('../views/read/Read')
const ReadDetail = () => import('../views/read/ReadDetail')
const Test = () => import('../views/testing/Test')
const Login = () => import('../components/common/login/Login')
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// fksdljfkjdsjflsdjlfja
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/write',
    component: Write
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/quesDetail/:id',
    name: 'quesDetail',
    component: quesDetail
  },
  {
    path:'/qs',
    name:'Qs',
    component:Question
  },
  {
    path:'/read',
    name:'Read',
    component:Read,
  },
  {
    path: '/ReadDetail',
      name: 'ReadDetail',
      component:ReadDetail,
  },
  {
    path:'/test',
    name:'Test',
    component:Test
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
