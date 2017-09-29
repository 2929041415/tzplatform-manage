<template>
  <div class="platform-style">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <MenuTree></MenuTree>
        </div>
      </el-col>
      <el-col :span="19" :offset="1">
        <div class="grid-content bg-purple-light">
      <MenuList></MenuList>
    </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MenuTree from './tree'
  import MenuList from './menulist'
  import { MENU_SELECT_CHANGE } from '../../../store/mutation-types'
  import { MENU_ROOT_TREE } from '../../../store/action-types'

  export default {
    created() {
      this.$store.commit(MENU_SELECT_CHANGE,'1')

      /* 加载菜单树数据 */
      this.$store.dispatch(MENU_ROOT_TREE)
    },
    components: { MenuTree, MenuList },
  }

</script>

<style scoped>

  .platform-style{
    padding-top: 20px;
  }
</style>
