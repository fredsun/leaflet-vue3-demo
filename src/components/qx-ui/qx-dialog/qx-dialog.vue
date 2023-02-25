<template>

    <!-- <button @click="isShow = true">点我弹个窗</button> -->
    <teleport to="body">
        
            <div class="dialog">
                <h3>图层选择</h3>
                <h4 @click=clickBtn1>图层1</h4>
                <!-- <h4 @click="$emit('clickedItem',`111`)">图层1</h4> -->
                <h4 @click=clickBtn2>图层2</h4>
                <h4 @click=clickBtn3>图层3</h4>
                <button @click="isShow = false">关闭弹窗</button>
            </div>

    </teleport>

</template>

<script>
import {ref,defineEmits} from 'vue'
export default {
    
    name:'Dialog',
    emits:['clickedItem'],
    setup(prop, ctx){
        // defineEmits(["clickedItem"])
        // ctx.emit(`clickedItem`)
        let isShow = ref(true)
        function clickBtn1(){
            console.log(`clickBtn1`)
            ctx.emit("clickedItem", 1);
        }
        // function clickBtn2(){
        //     console.log(`clickBtn2`)
        //     emit("clickedItem", 2);
        // }
        // function clickBtn3(){
        //     console.log(`clickBtn3`)
        //     emit("clickedItem", 3);
        // }
        return {
            isShow,
            clickBtn1,
            // clickBtn2,
            // clickBtn3,
        }
    }
}
</script>

<style>

.dialog{
    z-index: 10;
    position: absolute;
    top: 10px;
    left: 10px;
    /* transform: translate(-50%,-50%); */
    text-align: center;
    width: 200px;
    height: 300px;
    background-color: rgb(140, 135, 225,0.5);
}
</style>