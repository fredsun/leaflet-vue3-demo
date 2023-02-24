<template>
    <div class="qx-main-view" id="qx-main-view">
         <MyMap mapkey="keyName" class="my-map"/>
         <!-- <button class="btnChange">点我更换</button> -->
         <QXDialog />
    </div>
    
</template>
<script >
import MyMap from './my-map.vue'
import QXDialog from './qx-ui/qx-dialog/qx-dialog.vue'
export default{
    components:{QXDialog,MyMap}
}
</script>

<style>
.my-map{
  /* width: 500px;
  height: 500px; */
  width: 100vw;
  height: 100vh;
}
/* .btnChange{
    z-index: 999;
    position: absolute;
} */
.qx-main-view{
    position: relative;
}
</style>
