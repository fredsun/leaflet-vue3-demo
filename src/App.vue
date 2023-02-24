<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import MyMap from './components/MyMap.vue';
</script>

<template>
  <MyMap mapkey="keyName" class="myMap"/>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

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
