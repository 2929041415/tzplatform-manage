<template>
  <div class="platform-style" v-if="secondmenushow">
    <div class="wrp_tab">
      <div class="tab">
        <ul class="tab_navs">
          <li apptype="biz" class="tab_nav" v-for="item in childmenulist" :key="item.id"
              @click="choosmenu(item.id,item.menuurl)" v-bind:class="{ selected_tab: itemselect==item.menuurl }">
            <a href="javascript:void(0);" v-text="item.menuname"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {RESOURCE_SELECT_URL} from '../store/mutation-types'
  import * as cookie from '../service/cookieservice'
  import qs from 'qs'

  export default {
    data() {
      return {}
    },
    computed: {
      itemselect: {
        get() {
          return this.$store.state.userresource.menuselecturl
        },
        set(value) {
        }
      },
      childmenulist: {
        get() {
          let childlist = this.$store.state.userresource.childmenuList
          if (childlist.length <= 0) {
            const str = cookie.getKey(cookie.USER_MENU)
            childlist = qs.parse(str)
          }
          return childlist
        },
        set(value) {
        }
      },
      secondmenushow:{
        get() {
          return this.$store.state.menuselect.secondmenushow
        },
        set(value) {
        }
      }
    },
    methods: {
      choosmenu(item, menuurl) {
        this.$router.push({path: menuurl})
      }
    }
  }
</script>

<style scoped>
  .platform-style {
    padding-top: 0px;
  }

  .wrp_tab {
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #e6e7ec;
  }

  .tab {
    line-height: 40px;
  }

  .tab_nav a {
    margin-right: 45px;
    display: block;
    color: #818484;
    font-size: 14px;
  }

  .tab_nav a:hover {
    color: #20A0FF;
    border-bottom: #20A0FF solid 1px;
  }

  .selected_tab a {
    color: #20A0FF;
    border-bottom: #20A0FF solid 1px;
  }

  li {
    display: inline;
    float: left;
  }

  ul, ol {
    list-style-type: none;
  }

  .tab_navs {
    height: 46px;
    line-height: 45px;
  }

</style>
