import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from '../store'
import {
  getNav
} from '../api/router'
import Layout from 'components/layout'
import Child from 'components/layout/child'


Vue.use(VueRouter)
//主layout
// const routes = {
//   path: '/',
//   name: 'home',
//   component: Layout,
//   children: []
// }
// //childout
// const childout = {
//   path: '/',
//   name: 'home',
//   component: Layout,
//   children: []
// }

// const gg=[
//   {
//   path: '/',
//   component: Layout,
//   name: 'index',
//   children: [{
//     path: '/monitoring',
//     name: 'monitoring',
//     component: Child,
//     meta: {
//       name: '监控中心'
//     },
//     children: [
//       {
//       path: '/monitoring-warehouse',
//       name: 'warehouse',
//       component: ()=>import('@/views/monitoring/warehouse'),
//       meta: {
//         name: '仓库监控'
//       }
//       },
//       {
//         path: '/monitoring-exception',
//         name: 'exception',
//         component: ()=>import('@/views/monitoring/exception'),
//         meta: {
//           name: '异常监控'
//         }
//       }
//   ]
//   }]
//   },
//   {
//     path: '/sex',
//     component: Child,
//     name: 'sex',
//     children: [{
//       path: '/monitoring',
//       name: 'monitoring',
//       component: Child,
//       meta: {
//         name: '监控中心'
//       },
//       children: [
//         {
//         path: '/monitoring-warehouse',
//         name: 'warehouse',
//         component: ()=>import('@/views/monitoring/warehouse'),
//         meta: {
//           name: '仓库监控'
//         }
//         },
//         {
//           path: '/monitoring-exception',
//           name: 'exception',
//           component: ()=>import('@/views/monitoring/exception'),
//           meta: {
//             name: '异常监控'
//           }
//         }
//     ]
//     }]
//     },
// ]

// const _import = require('./import-' + process.env.NODE_ENV)//获取组件的方法
const _import = (path)=>require('@/views/'+path+'.vue').default//获取组件的方法
const router = new VueRouter({
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: []
})
// router.addRoutes(gg)
router.beforeEach((to, from, next) => {
  if (!store.getters.nav.length) {
    getNav().then(res => {
      if (res.data.routerList.msg === 'success' && res.status === 200) {
        let routerdata = filterAsyncRouter(res.data.routerList.menuList) //后台拿到路由进行过滤
        // console.log(routerdata)
        store.dispatch('navlist', routerdata) //后台拿到路由
        saveObjArr('router', res.data.routerList.menuList) //存储路由到localStorage
        routerGo(to, next, routerdata) //执行路由跳转方法
      }
    })
  }else{
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (store.getters.userinfo.account) {
//       next()
//       if(!router.options.isAddDynamicMenuRoutes){ //是否已经添加了动态路由 （必须）
//         router.options.isAddDynamicMenuRoutes=true //必须
//         let routerdata = filterAsyncRouter(data.menuList) //后台拿到路由进行过滤
//         store.dispatch('navlist', routerdata) //后台拿到路由
//         saveObjArr('router', data.menuList) //存储路由到localStorage
//         routerGo(to, next, routerdata) //执行路由跳转方法
//       }
//   }else{
//     if (to.path === '/') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })


// //递归路由实现
function filterAsyncRouter(data, routerArr = []) {
  // console.log(data)
  for (var i = 0; i < data.length; i++) {
    if (data[i].type === 0) {
      for (var j = 0; j < data[i].list.length; j++) {
        let childarr = []
        //判断有三级路由没
        if (data[i].list[j].list && data[i].list[j].list.length >= 1) {
          childarr = filterAsyncRouter(data[i].list[j].list)
        }
        //判断有三级路由没
        let temRouter = {}
      
        // console.log(data[i].list[j].url)
        temRouter.path = '/'+data[i].list[j].url.replace(/\//g, '-')
        temRouter.name = data[i].list[j].url.split('/')[1]
        temRouter.meta = {
          name: data[i].list[j].name,
          iframeUrl: "",
          isDynamic: true,
          isTab: true,
          menuId: data[i].list[j].menuId,
          layout:'layout'
        }
        if (childarr.length >= 1) {
          temRouter.children = childarr
          temRouter.path = '/'+data[i].list[j].url.replace(/\//g, '-')
          temRouter['component'] =Layout
        } else {
          temRouter['component'] =_import(data[i].list[j].url)
        }
        routerArr.push(temRouter)
      }

    }
  }
  // console.log(routerArr)
  return routerArr;

}
function routerGo(to, next,routerdata) {
  // let yy=JSON.stringify(routerdata)
  // let loal=JSON.parse(yy)
  // console.log(loal)
  console.log(store.getters.nav)
    router.addRoutes(store.getters.nav) //动态添加路由
    router.options.isAddDynamicMenuRoutes=true
  // console.log(router)
  // next()
  // global.antRouter = routerdata //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({
    ...to,
    replace: true
  })
}

// //保存路由到本地
function saveObjArr(item, data) {
  localStorage.setItem(item, JSON.stringify(data))
}
export default router