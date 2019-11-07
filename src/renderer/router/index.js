import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const ListDetail = () => (import('@/components/pages/listDetail'))
const MusicDetail = () => (import('@/components/pages/musicDetail'))
const List = () => (import('@/components/pages/lists'))

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      meta: { title: '主页' },
      component: require('@/components/index').default,
      redirect: '/list',
      children:[{
        path: 'list',
        name: 'list-page',
        component: List,
        meta: { title: '主页' }
      },{
        path: 'listDetail',
        name: 'listDetail-page',
        component: ListDetail,
        meta: {
          title: '榜单详情'
        }
      },{
        path: 'musicDetail',
        name: 'musicDetail-page',
        component: MusicDetail,
        meta: {
          title: '歌曲详情'
        }
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
