<template>
  <div>
    <el-tree
      :data="menutreedatas"
      :props="defaultProps"
      accordion
      :load="loadNode"
      lazy
      :highlight-current="true"
      node-key="id"
      :default-expanded-keys="defaultkey"
      :current-node-key="currentnodekey"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>
<script>
  import * as menuservice from '../../../service/menuservice'
  import { CHANGE_CHOOSE_MENUTREE, MENU_CHILD_LIST } from '../../../store/mutation-types'

  export default {
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'menuname'
        }
      };
    },
    computed: {
      menutreedatas: {
        get() {
          return this.$store.state.menu.menurootlist
        },
        set(value) {

        }
      },
      defaultkey: {
        get() {
          const key = this.$store.state.menu.choosetreeobj.id
          return [ key ]
        },
        set(value) {

        }
      },
      currentnodekey: {
        get() {
          return this.$store.state.menu.choosetreeobj.id
        },
        set(value) {

        }
      }
    },
    methods: {
      handleNodeClick(data) {
        this.$store.commit(CHANGE_CHOOSE_MENUTREE, data)
        const parentid = data.id
        if (parentid !== undefined) {
          menuservice.menuList({parentid}).then(value => {
            const data = value.data
            if (data.length > 0) {
              this.$store.commit(MENU_CHILD_LIST,data)
            }else{
              this.$store.commit(MENU_CHILD_LIST,[])
            }
          })
        }
      },
      loadNode(node, resolve) {
        const parentid = node.key
        if (parentid !== undefined) {
          menuservice.menuList({parentid}).then(value => {
            const data = value.data
            if (data.length > 0) {
              this.$store.commit(MENU_CHILD_LIST,data)
              resolve(data)
            } else {
              this.$store.commit(MENU_CHILD_LIST,[])
              resolve([]);
            }
          })
        }
      }
    }
  };
</script>
<style scoped>
  .el-tree {
    min-height: 320px;
  }
</style>
