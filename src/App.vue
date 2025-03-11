<script>
// import axios from 'axios'
import Game from './components/page/GamesPage.vue'
import Headers from './components/element/Header.vue'
export default {
  components: {Headers, Game},
  data() {
    return {
      projects: [], //Сюда будут загружены данные
      user: null
    }
  },
  methods: {
    allProject(){
      const prokect = {};
    },
    setUser(userData){
      this.user=userData
    }
  }
};
</script>

<template>
<Headers />
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
