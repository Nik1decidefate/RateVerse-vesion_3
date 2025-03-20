<script>
// import axios from 'axios'
// import Game from './components/page/GamesPage.vue'
import Headers from './components/element/Header.vue'
export default {
  components: {Headers},
  data() {
    return {
      renderKey:0
    }
  },
  methods: {
    reRender(){
      this.renderKey++
    }
  },
  mounted() {
    this.reRender()
  }
}
</script>

<template>
    <Headers :key="renderKey" />
</template>

<style scoped>
/* .h{
  min-height: 100vh;
  min-width: 100vh;
  top: 0px;
  margin: 0px;
} */
template{
  padding: 0%;
}
</style>
