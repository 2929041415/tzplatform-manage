<template>
  <div>
    <el-tree
      :data="menutreedatas"
      :props="props"
      node-key="id"
      show-checkbox
      ref="resourcetree"
      :check-strictly="true"
      :default-checked-keys="defaulecheckeddatas"
      @check-change="handleCheckChange">
    </el-tree>
  </div>
</template>

<script>
  import * as menuservice from '../../../service/menuservice'
  import {CHOOSE_ROLE_RESOURCE_LIST, HAS_RESOURCE_LIST} from '../../../store/mutation-types'

  export default {
    data() {
      return {
        props: {
          children: 'children',
          label: 'label'
        },
        count: 1
      };
    },
    computed: {
      menutreedatas: {
        get() {
          return this.$store.state.role.resourcelist
        },
        set(value) {

        }
      },
      defaulecheckeddatas:{
        get() {
          return this.$store.state.role.hasresourcelist
        },
        set(value) {
        }
      }
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        const chooseobjs = this.$refs.resourcetree.getCheckedNodes()
        this.$store.commit(CHOOSE_ROLE_RESOURCE_LIST, chooseobjs)
      },
      handleNodeClick(data) {
        console.log(data);
      }
    }
  }
</script>
