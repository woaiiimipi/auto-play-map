<template>
  <div id="app">
    <Bmap />
  </div>
</template>

<script>
import Bmap from './components/Bmap.vue';

export default {
  name: 'App',
  components: {
    Bmap
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
