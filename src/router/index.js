import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const Admin = () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue')
const DisPlayInfo = () => import(/* webpackChunkName: "Admin" */ '../views/DisplayInfo.vue')

// 页面路由组件
const Index = () => import(/* webpackChunkName: "Index" */ '../components/admin/Index.vue')
const AddArt = () => import(/* webpackChunkName: "AddArt" */ '../components/article/AddArt.vue')
const ArtList = () => import(/* webpackChunkName: "ArtList" */ '../components/article/ArtList.vue')
const CateList = () => import(/* webpackChunkName: "CateList" */ '../components/category/CateList.vue')
const UserList = () => import(/* webpackChunkName: "UserList" */ '../components/user/UserList.vue')
const Profile = () => import(/* webpackChunkName: "UserList" */ '../components/user/Profile.vue')
const CommentList = () => import(/* webpackChunkName: "UserList" */ '../components/comment/commentList.vue')
const DispalyArt = () => import(/* webpackChunkName: "Admin" */ '../components/article/Display.vue')


// 路由重复点击捕获错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '请登录'
    },
    component: Login
  },
  {
    path: '/Display',
    name: 'Display',
    meta: {
      title: '展示订阅'
    },
    component: DisPlayInfo
  },
  {
    path: '/',
    name: 'admin',
    meta: {
      title: 'Gin RSS'
    },
    component: Admin,
    children: [
      {
        path: 'index',
        component: Index,
        meta: {
          title: 'Gin RSS'
        }
      },
      {
        path: 'addart',
        component: AddArt,
        meta: {
          title: '新增订阅'
        }
      },
      {
        path: 'addart/:id',
        component: AddArt,
        meta: {
          title: '编辑文章'
        },
        props: true
      },
      {
        path: 'artlist',
        component: ArtList,
        meta: {
          title: '文章列表'
        }
      },
      {
        path: 'catelist',
        component: CateList,
        meta: {
          title: '分类列表'
        }
      },
      {
        path: 'userlist',
        component: UserList,
        meta: {
          title: '用户列表'
        }
      },
      {
        path: 'profile',
        component: Profile,
        meta: {
          title: '个人设置'
        }
      },
      {
        path: 'commentlist/:id',
        component: CommentList,
        meta: {
          title: '评论管理'
        }
      },
      {
        path: 'display',
        component: DispalyArt,
        meta: {
          title: '展示订阅'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()

  const userToken = window.sessionStorage.getItem('token')
  if (to.path === '/login') return next()
  if (!userToken) {
    next('/login')
  } else {
    next()
  }
})

export default router
