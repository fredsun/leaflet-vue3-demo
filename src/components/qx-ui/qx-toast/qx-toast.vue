<template>
  <div class="toast">
    {{toasttext}}
  </div>
</template>
<script>
export default {
  name: "toast",
  props:{
    toasttext: String,
    inject:['toasttext'],
    setUp(){
      console.log(`inject`, this.toasttext)
    }
  }
}
</script>
<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  padding: 8px 10px;
  z-index: 11;
}
</style>