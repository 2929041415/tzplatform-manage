<template>
  <div class="platform-style">
    <el-row>
      <el-col :span="4">
        <LeftMenu></LeftMenu>
      </el-col>
      <el-col :span="19" :offset="1">
        <TestContent></TestContent>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import LeftMenu from './leftmenu'
  import TestContent from './testcontent'

  export default {
    data() {
      return {}
    },
    components:{LeftMenu,TestContent}
  }

</script>

<style scoped>

</style>
