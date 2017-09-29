<template>
  <div class="platform-style">
    <router-view></router-view>
  </div>
</template>

<script>
  import { MENU_SELECT_CHANGE } from '../../../store/mutation-types'

  export default {
    created() {
      this.$store.commit(MENU_SELECT_CHANGE,'2')
    },
    components: {  },
  }

</script>

<style scoped>


</style>
