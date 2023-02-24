<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import MyMap from './components/MyMap.vue';
</script>

<template>
  <MyMap mapkey="keyName" class="myMap"/>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.myMap{
  /* width: 500px;
  height: 500px; */
  width: 100vw;
  height: 100vh;
}
body, html{
  width: 100vw;
  height: 100vh;
}
</style>
