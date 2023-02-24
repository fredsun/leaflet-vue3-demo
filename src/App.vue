<script setup lang="ts">

import MainView from './components/main-view.vue'
</script>

<template>
  <MainView class="mainView"/>
  <!-- <MyMap mapkey="keyName" class="myMap"/> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

.mainView{
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
