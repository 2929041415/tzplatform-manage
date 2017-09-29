<template>
  <div class="doc-left-menu">

    <dl class="sidebar-class active" v-for="(item, index) in channellist">
      <dt>
        <a href="javascript:void(0);" v-text="item.label" @click="chooseitem(index)"></a>
      </dt>
      <dd v-for="childitem in  item.children" v-if="item.children.length>0&&index===itemselect">
        <a href="javascript:void(0)" :title="childitem.label"
           v-bind:class="{ selected_tab: itemselectlabel===childitem.label }"
           v-text="childitem.label" @click="choosechilditem(childitem.label)"></a>
      </dd>
    </dl>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        channellist: [
          {
            label: '概述',
            children: [
              {label: '开放平台概述'},
              {label: '数据交换概述'},
            ]
          }, {
            label: '接入指南',
            children: [
              {label: '开发者注册'},
              {label: '应用接入规范'},
              {label: '应用运营管理'},
              {label: '数据服务交换流程'},
            ]
          }, {
            label: '标准规范',
            children: [
              {label: '开发者协议'},
              {label: '违规处理规范'},
              {label: '登录服务协议'},
              {label: '数据交换规范'},
              {label: '公共返回码说明'},
            ]
          }, {
            label: 'API索引',
            children: [
              {label: '用户会话API'},
              {label: '用户基本信息API'},
              {label: '机构基本信息API'},
              {label: '班级基本信息API'},
              {label: '用户关系API'},
              {label: 'oauth认证API'},
              {label: 'sso认证API'},
              {label: '统一消息API'},
              {label: '课程中心API'},
              {label: '通知类API'},
              {label: '模板市场API'},
            ]
          }, {
            label: '数据服务',
            children: [
              {label: '用户数据服务报文'},
              {label: '班级数据服务报文'},
              {label: '机构数据服务报文'},
            ]
          }, {
            label: '调试工具',
            children: [
              {label: 'API调用说明'},
              {label: 'API调试工具'},
              {label: '数据服务调用说明'},
              {label: '数据服务调试工具'},
            ]
          }, {
            label: '资源下载',
            children: [
              {label: '接口SDK下载'},
              {label: '数据服务接口'},
            ]
          }
        ],
        itemselect: 0,
        itemselectlabel: '开放平台概述'
      }
    },
    methods: {
      chooseitem(index) {
        this.itemselect = index
      },
      choosechilditem(label) {
        this.itemselectlabel = label
      }
    }
  }
</script>

<style scoped>
  .doc-left-menu .sidebar-class a {
    color: #555;
    text-decoration: none;
  }

  .doc-left-menu .sidebar-class > dd > a {
    display: block;
  }

  .doc-left-menu .sidebar-class > dt > a {
    display: block;
    color: #222;
    font-size: 15px;
  }

  .doc-left-menu .sidebar-class > dd {
    padding-left: 20px;
    font-size: 14px;
  }

  .doc-left-menu .sidebar-class > dd > a:hover {
    color: #20A0FF;
    border-right: 2px solid #20A0FF;
  }

  .selected_tab {
    color: #20A0FF !important;
    border-right: 2px solid #20A0FF;
  }

  .doc-left-menu {
    padding: 0px 0px 0px 20px;
    position: relative;
    z-index: 1;
  }

  .doc-left-menu .sidebar-class {
    line-height: 30px;
  }
</style>

