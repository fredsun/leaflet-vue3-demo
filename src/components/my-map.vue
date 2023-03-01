<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { getMapKeystore } from '../utils/keystore'
import { onMounted, defineProps, watch, inject, ref } from 'vue'
// import axios from 'axios';
import { apiGetUserInfo } from '../apis/user';
import jsonData from '../../public/js/BEIJING_country.json'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";
import QXToast from './qx-ui/qx-toast/qx-toast.vue';
let tdtKey = getMapKeystore()
var map;
const $toast = inject('$toast')
let mapLayer = {};
//绘制图层
var drawnItems = new L.FeatureGroup();

const props = defineProps({
  title: String,
  default: ""
})

watch(props, (newValue, oldValue) => {
  console.log(`watch l` + props.title);
  changeMapType(props.title)
})
console.log(props.title);
console.log(`11111`);

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
  const vecLayerGroup = L.layerGroup([vecLayer, cvaLayer])
  //影像图层组
  const imgLayerGroup = L.layerGroup([imgLayer, ciaLayer])
  var baseLayers = {
    "天地图矢量": vecLayerGroup,
    "天地图影像": imgLayerGroup
  };

  map = L.map('map', {  //需绑定地图容器div的id
    center: [32.063417, 118.849672], //初始地图中心
    zoom: 13, //初始缩放等级
    maxZoom: 18, //最大缩放等级
    minZoom: 0, //最小缩放等级
    zoomControl: false,//不显示缩放小控件
    layers: [vecLayerGroup]
  })

  //添加圆圈
  L.circle([32.063417, 118.849672], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map)
  //添加标记
  L.marker([32.063417, 118.849672]).addTo(map)

  console.log(L.control.layers);

  L.control.layers(baseLayers, null).addTo(map);

  for (let node of document.querySelectorAll('.leaflet-control-layers-base label')) {
    mapLayer[node.innerText.trim()] = node.querySelector('input')
  }

  var featureJsons = new Array()
  featureJsons.concat(jsonData.features)
  console.log(jsonData.features.length)
  // console.log(featureJsons.length)
  for (var i = 0; i < jsonData.features.length; i++) {
    // console.log(jsonData.features[i]);

    var arrayCoor = jsonData.features[i].geometry.coordinates
    // console.log(arrayCoor)
    for (var j = 0; j < arrayCoor.length; j++) {
      var arrayLngLatZero = arrayCoor[j];
      // console.log('arrayLngLatZero', arrayLngLatZero)
      for (var k = 0; k < arrayLngLatZero.length; k++) {
        var arrayLngLat = arrayLngLatZero[k]
        arrayLngLat.pop()
        arrayLngLat.reverse()
        console.log('arrayLngLat', arrayLngLat)
        // var pol{{yline = L.polyline([[32.09438, 118.763722], [32.096093, 118.825238], [32.065009, 118.848235], [32.04983, 118.783844], [32.064029, 118.718304]], {
      }
      var polyline = L.polyline(arrayLngLatZero, {
        // var polyline = L.polyline(featureJson, {
        //线颜色
        color: 'blue'
      }).addTo(drawnItems);
      map.addLayer(drawnItems)
    }

  }

  // //补充地图基层变化提示
  // map.on('baselayerchange', function (e) {
  //   //弹框提示
  //   alert("基图层改变了！");
  // })
  //地图zoom监听
  map.on('zoom', function (e) {
    //弹框提示
    // alert("地图级数改变！");
    // $toast.show(' 添加成功')
    // showModal = true


    $toast.open("1000")
    setTimeout(() => {
      $toast.close()
    }, 2000)
  })

  // //地图单击监听
  // map.on('click', function (e) {
  //   //获取点击位置的坐标
  //   var coordinate = [e.latlng.lat, e.latlng.lng];
  //   //弹框提示点击位置的坐标
  //   alert("地图被单击了！点击位置为：" + coordinate);
  // })

  console.log("map", map)
}

// 模拟点击
function changeMapType(value) {
  console.log(`change` + value)
  // this.mapType = value
  mapLayer[value].click()
}
onMounted(() => {
  initMap()
  // fetchAPI()
  // fetchGetInfo()
  fetchGeoJson()
})

//模拟网络请求
function fetchAPI() {
  const $axios = inject('$axios')
  console.log('axios' + $axios)
  $axios.get('https://echo.hoppscotch.io').then((resp) => {
    console.log(resp.data)
  }).catch((err) => {
    console.log(err)
  })
}

//模拟封装接口
function fetchGetInfo() {
  const param = {
    userID: '1001',
    userName: 'aaa',
  }
  apiGetUserInfo(param).then(res => {
    console.log(res)
  })
}

//获取天地图区域geojson
function fetchGeoJson() {

}
</script>

<template>
  <!-- leaflet地图容器 -->
  <div id='map' class="mainMap"></div>
</template>
<style>
.mainMap {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
</style>