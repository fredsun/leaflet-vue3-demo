<template>
    <div class="qx-main-view" id="qx-main-view">
         <MyMap mapkey="keyName" class="my-map" :title="title"/>
         <QXDialog  @clickedItem="handleClicked"/>
    </div>
    
</template>
<script >
import {ref,reactive} from 'vue'
import MyMap from './my-map.vue'
import QXDialog from './qx-ui/qx-dialog/qx-dialog.vue'
export default{
    components:{QXDialog,MyMap},
    setup(){
        let title = ref("aaa")
        // const data = ref<string>(' ')

        const handleClicked = value=>{
            console.log(`handleClicked${value}`)
            title.value = value+``
            console.log(`title${title.value}`)
            // data.value = '我是父组件异步获取的数据'
        }
        
        
        return{
            title,
            handleClicked
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
