<template>
    <div class="qx-main-view" id="qx-main-view">
         <MyMap mapkey="keyName" class="my-map" :title="title"/>
         <QXDialog  />
    </div>
    
</template>
<script >
import {ref,reactive} from 'vue'
import MyMap from './my-map.vue'
import QXDialog from './qx-ui/qx-dialog/qx-dialog.vue'
export default{
    components:{QXDialog,MyMap},
    setup(){

        // const state = reactive({
        // fatherData: "I am from Father.",
        // });
        const title = ref("aaa")
        console.log(title)
        return{
            title,
            // QXDialog,
            // MyMap
        }
    }   
    
    
}
</script>

<style>
.my-map{
  width: 100vw;
  height: 100vh;
}

.qx-main-view{
    position: relative;
}
</style>
