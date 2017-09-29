<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import HeadLayout from './components/Head'
  import LoginView from './modules/userlogin/login'

  export default {
    name: 'app',
    components: { HeadLayout, LoginView }
  }
</script>
<style scoped>
  .content-style{
    min-width: 1300px;
    margin: 0 auto;
  }
</style>
