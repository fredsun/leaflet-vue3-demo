


<script setup>
    import L from 'leaflet';
  import 'leaflet/dist/leaflet.css'
  import {onMounted} from 'vue'
  let tdtKey = 'tdtkey'
  const initMap = () => {
    //影像地图
     //加载leaflet地图矢量图层
    const vecLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)
    // const tiandituMap =  L.tileLayer(`http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtKey}`)
    //注记
    const cvsLayer = L.tileLayer(`http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tdtKey}`)
    // const tiandituText =  L.tileLayer(`http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtKey}`)
    // const layers = L.layerGroup([tiandituMap,tiandituText])
    const layers = L.layerGroup([vecLayer,cvsLayer])
    let map = L.map('map',{  //需绑定地图容器div的id
        
      center:[32.063417, 118.849672], //初始地图中心
      zoom:12, //初始缩放等级
      maxZoom:18, //最大缩放等级
      minZoom:0, //最小缩放等级
      zoomControl:false,//不显示缩放小控件
      layers:[layers]
    })
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
.map{
    height: 100vh;
    width: 100vw;
}
</style>