<template>
  <div id="app">
    <Headers :key="headerKey" @refresh-header="refreshHeader" />
    <router-view className="r" @refresh-header="refreshHeader" />
  </div>
</template>

<script>
import Headers from './components/element/Header.vue'

export default {
  components: {
    Headers,
  },
  data() {
    return {
      headerKey: 0, // Уникальный ключ для компонента Header
    }
  },
  methods: {
    refreshHeader() {
      this.headerKey ++ // Изменяем ключ, чтобы пересоздать Header
    },
  },
}
</script>

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
.r{
  margin-top: 6%;
}
</style>
