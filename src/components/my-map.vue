<script setup>
    import L from 'leaflet';
  import 'leaflet/dist/leaflet.css'
  import {getMapKeystore}from '../utils/keystore'
  import {onMounted, defineProps, watch} from 'vue'
  let tdtKey = getMapKeystore()


  const props = defineProps({
    title:String,
    default: ""
})
console.log(props.title);

  const initMap = () => {
    //天地图矢量图层
    const vecLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)
    //天地图矢量注记图层
    const cvaLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)
    //天地图影像图层
    const imgLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)
    //天地图影像注记图层
    const ciaLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)

    //矢量图层组
    const vecLayerGroup = L.layerGroup([vecLayer,cvaLayer])
    //影像图层组
    const imgLayerGroup = L.layerGroup([imgLayer,ciaLayer])
    var baseLayers = {
                "天地图矢量": vecLayerGroup,
                "天地图影像": imgLayerGroup
            };
    let map = L.map('map',{  //需绑定地图容器div的id
        
      center:[32.063417, 118.849672], //初始地图中心
      zoom:13, //初始缩放等级
      maxZoom:18, //最大缩放等级
      minZoom:0, //最小缩放等级
      zoomControl:false,//不显示缩放小控件
      layers:[vecLayerGroup]
    })
    //添加圆圈
    L.circle([32.063417, 118.849672], 500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).addTo(map)
    //添加标记
    L.marker([32.063417, 118.849672]).addTo(map)
    //
    // console.log(L.control.layers);
    
    L.control.layers(baseLayers).addTo(map);
    
    // L.control.addLayers(imgLayerGroup).addTo(map)
    // L.control.addLayers(vecLayerGroup).addTo(map)
  }
  onMounted(()=>{
    initMap()
  })

</script>

<template>
    <!-- leaflet地图容器 -->
    <div id ='map' class="mainMap"></div>
</template>
<style>
.mainMap{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    z-index: 1;
}
</style>