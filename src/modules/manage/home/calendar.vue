<template>
  <lunar-calendar @change="onChange" dateLang="cn" lang="cn"></lunar-calendar>
</template>

<script>
  import lunarCalendar from 'vue-lunar-calendar'

  export default {
    data() {
      return {}
    },
    components: {lunarCalendar},
    methods: {
      onChange() {

      }
    }
  }
</script>

<style scoped>

</style>
