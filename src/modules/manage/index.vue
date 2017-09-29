<template>
  <div class="content-style">
    <HeadLayout></HeadLayout>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeadLayout from '@/components/Head'

  export default {
    components: { HeadLayout },
  }
</script>
<style scoped>
  .content-style{
    min-width: 1300px;
    margin: 0 auto;
  }
</style>
