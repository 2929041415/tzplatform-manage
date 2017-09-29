<template>
  <div class="platform-style">
    <HomeCount></HomeCount>
    <AppCount></AppCount>
    <AppNotice></AppNotice>
  </div>
</template>

<script>
  import {SECOND_MENU_SHOW} from '../../../store/mutation-types'
  import HomeCount from './homecount'
  import AppCount from './appcount'
  import AppNotice from './appnotice'


  export default {
    data() {
      return {}
    },
    components: {HomeCount, AppCount, AppNotice},
    created() {
      /* 隐藏掉二级导航栏 */
      this.$store.commit(SECOND_MENU_SHOW, false)
    }
  }

</script>

<style scoped>

  .platform-style {
    padding-top: 60px;
    width: 1300px;
  }

  .home-title {
    height: 95px;
    border: 1px solid #E5EBF2;
    text-align: center;
    background-color: white;
  }

  .home-title span {
    display: block;
    padding-top: 10px;
    font-size: 18px;
    font-weight: 500;
  }

  .home-title.user span {
    color: #1D8CE0;
  }

  .home-title.task span {
    color: #F0433D;
  }

  .home-title.app span {
    color: #5cb85c;
  }

  .home-title.apiinfo span {
    color: #f0ad4e;
  }

  .home-title-icon {
    font-size: 50px !important;
    margin-top: 5px;
  }

  .home-title-icon.user {
    color: #1D8CE0;
  }

  .home-title-icon.app {
    color: #5cb85c;
  }

  .home-title-icon.task {
    color: #F0433D;
  }

  .home-title-icon.apiinfo {
    color: #f0ad4e;
  }

  .home-title-description {
    text-align: center;
    height: 40px;
    vertical-align: middle;
  }

  .home-title-description.user {
    background-color: #1D8CE0;
  }

  .home-title-description.task {
    background-color: #F0433D;
  }

  .home-title-description.app {
    background-color: #5cb85c;
  }

  .home-title-description.apiinfo {
    background-color: #f0ad4e;
  }

  .home-title-description span {
    color: white;
    line-height: 40px;
  }


</style>
