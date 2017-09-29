import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/modules/userlogin/login'], resolve)
    },
    {
      path: '/manage',
      component: resolve => require(['@/modules/manage/index'], resolve),
      children: [
        {
          path: 'syssetting',
          component: resolve => require(['@/modules/manage/system/index'], resolve),
          children: [
            {path: 'menu', component: resolve => require(['@/modules/manage/menu/index'], resolve),},
            {
              path: 'sysdict',
              component: resolve => require(['@/modules/manage/sysdict/index'], resolve),
              children: [
                {path: 'type', component: resolve => require(['@/modules/manage/sysdict/type/index'], resolve),},
                {path: 'list', component: resolve => require(['@/modules/manage/sysdict/valuelist/index'], resolve),}
              ]
            },
            {path: 'role', component: resolve => require(['@/modules/manage/sysrole/index'], resolve),}

          ]
        },
        {
          path: 'apiinfo',
          component: resolve => require(['@/modules/manage/apiinfo/index'], resolve),
          children: [
            {path: 'apitype', component: resolve => require(['@/modules/manage/apiinfo/apitype/index'], resolve),},
            {
              path: 'apilist', component: resolve => require(['@/modules/manage/apiinfo/apilist/index'], resolve),
              children: [
                {path: 'addapi', component: resolve => require(['@/modules/manage/apiinfo/apilist/addApi'], resolve),},
                {
                  path: 'editApi',
                  component: resolve => require(['@/modules/manage/apiinfo/apilist/editApi'], resolve),
                },
                {path: 'listApi', component: resolve => require(['@/modules/manage/apiinfo/apilist/listApi'], resolve),}
              ]
            },
            {
              path: 'notice', component: resolve => require(['@/modules/manage/apiinfo/notice/index'], resolve),
              children: [
                {path: 'addnotice', component: resolve => require(['@/modules/manage/apiinfo/notice/addNotice'], resolve),},
                {
                  path: 'editnotice',
                  component: resolve => require(['@/modules/manage/apiinfo/notice/editNotice'], resolve),
                },
                {path: 'listnotice', component: resolve => require(['@/modules/manage/apiinfo/notice/listNotice'], resolve),}
              ]
            },
            {path: 'statistics', component: resolve => require(['@/modules/manage/apiinfo/statistics/index'], resolve),}
          ]
        },
        {
          path: 'user',
          component: resolve => require(['@/modules/manage/usermanage/index'], resolve),
          children: [
            {path: 'sys', component: resolve => require(['@/modules/manage/usermanage/sys/index'], resolve),},
            {path: 'reguser', component: resolve => require(['@/modules/manage/usermanage/reguser/index'], resolve),}
          ]
        },
        {
          path: 'question',
          component: resolve => require(['@/modules/manage/question/index'], resolve)
        },
        {
          path: 'app',
          component: resolve => require(['@/modules/manage/app/index'], resolve),
          children: [
            {
              path: 'webapp',
              component: resolve => require(['@/modules/manage/app/webapp/index'], resolve),
              children: [
                {path: 'list', component: resolve => require(['@/modules/manage/app/webapp/list'], resolve),},
                {path: 'add', component: resolve => require(['@/modules/manage/app/webapp/add'], resolve),},
                {path: 'edit', component: resolve => require(['@/modules/manage/app/webapp/edit'], resolve),},
              ]
            },
            {path: 'mobile', component: resolve => require(['@/modules/manage/app/mobile/index'], resolve),},
            {
              path: 'detail',
              component: resolve => require(['@/modules/manage/app/webapp/detail'], resolve),
            },
            {path: 'appdetail', component: resolve => require(['@/modules/manage/app/mobile/detail'], resolve),},
            {path: 'rank', component: resolve => require(['@/modules/manage/app/rankapp/index'], resolve),},
            {path: 'count', component: resolve => require(['@/modules/manage/app/appcount/index'], resolve),}
          ]
        },
        {path: 'home', component: resolve => require(['@/modules/manage/home/index'], resolve)},
        {
          path: 'channel',
          component: resolve => require(['@/modules/manage/channel/index'], resolve),
          children: [
            {path: 'view', component: resolve => require(['@/modules/manage/channel/view/index'], resolve),},
            {path: 'list', component: resolve => require(['@/modules/manage/channel/list/index'], resolve),},
          ]
        }
      ]
    },
  ]
})
