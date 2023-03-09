<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { getMapKeystore } from '../utils/keystore'
import "../utils/canvas/L.CanvasLayer";
import { getData } from "../utils/data"
import { CanvasMarkerLayer } from '../utils/leaflet.canvasmarker';
import { onMounted, defineProps, watch, inject, ref } from 'vue'
// import axios from 'axios';
import { apiGetUserInfo } from '../apis/user';
import jsonData from '../../public/js/BEIJING_country.json'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";
import "leaflet-rotatedmarker"
import QXToast from './qx-ui/qx-toast/qx-toast.vue';
let tdtKey = getMapKeystore()
var map;
const $toast = inject('$toast')
let mapLayer = {};
//绘制geoJson图层
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

onMounted(() => {
  initMap()
  // fetchAPI()
  // fetchGetInfo()
  fetchGeoJson()
})

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

  drawSimple();
  drawPlane();
  fetchGeoJson();
  drawCanvasPoints();
  console.log(L.control.layers);

  L.control.layers(baseLayers, null).addTo(map);
  //监听control图层变化
  for (let node of document.querySelectorAll('.leaflet-control-layers-base label')) {
    mapLayer[node.innerText.trim()] = node.querySelector('input')
  }

  // //补充地图基层变化提示
  // map.on('baselayerchange', function (e) {
  //   //弹框提示
  //   alert("基图层改变了！");
  // })
  //地图zoom监听
  map.on('zoom', function (e) {
    $toast({
      value: 'zoom change',
      duration: 2000, // 如果大于0则不必使用destory方法
      background: '#000',
      color: '#fff'
    })
  })

  // //地图单击监听
  // map.on('click', function (e) {
  //   //获取点击位置的坐标
  //   var coordinate = [e.latlng.lat, e.latlng.lng];
  //   //弹框提示点击位置的坐标
  //   alert("地图被单击了！点击位置为：" + coordinate);
  // })

}

// 模拟点击
function changeMapType(value) {
  console.log(`change` + value)
  // this.mapType = value
  mapLayer[value].click()
}



function drawSimple() {
  //添加圆圈
  L.circle([32.063417, 118.849672], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map)
  //添加标记
  L.marker([32.053417, 118.849672]).addTo(map)
  L.marker([32.023117, 118.049272]).addTo(map)
  L.marker([32.064417, 118.449642]).addTo(map)
  L.marker([32.413117, 118.849679]).addTo(map)
  L.marker([32.053457, 118.249672]).addTo(map)
  L.marker([32.163417, 118.849660]).addTo(map)
  L.marker([32.033417, 118.549671]).addTo(map)

  //添加点
  L.circle([32.053417, 118.869500], {
    //点半径
    radius: 5,
    //颜色
    color: 'red',
    //透明度
    fillOpacity: 1
  }).addTo(map);
}

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

//绘制3个小飞机
function drawPlane() {
  var ciLayer = L.canvasMarkerLayer({
    collisionFlg: false
  }).addTo(map);
  //绘制旋转图标
  var icon = L.icon({
    //图标地址
    iconUrl: "./src/assets/icon_plane.png",
    //图标大小
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  })


  // const canvasLayer = new CanvasIconLayer({});
  var plane1 = L.marker([32.053417, 118.869500], {
    //设置图标
    icon: icon,
    rotationAngle: 90
  });

  var plane2 = L.marker([32.043417, 118.859500], {
    //设置图标
    icon: icon,
    rotationAngle: 45
  });

  var plane3 = L.marker([32.053417, 118.879500], {
    //设置图标
    icon: icon,
    rotationAngle: 100
  });
  const marks = [plane1, plane2, plane3]
  ciLayer.addLayers(marks)
}

//获取天地图区域geojson
function fetchGeoJson() {
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
        // console.log('arrayLngLat', arrayLngLat)
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
}

//绘制canvas点群
function drawCanvasPoints() {
  console.log(`data`, getData());
  var myCustomCanvasDraw = function () {
    this.onLayerDidMount = function () {
      // -- prepare custom drawing    
    };
    this.onLayerWillUnmount = function () {
      // -- custom cleanup    
    };
    this.setData = function (data) {
      // -- custom data set
      this.needRedraw(); // -- call to drawLayer
    };
    this.onDrawLayer = function (info) {
      var canvasData = getData()
      console.log(`info`, info);
      // -- custom  draw
      var ctx = info.canvas.getContext('2d');
      ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
      ctx.fillStyle = "rgba(255,116,0, 0.2)";
      for (var i = 0; i < canvasData.length; i++) {
        var d = canvasData[i];
        if (info.bounds.contains([d[0], d[1]])) {
          var dot = info.layer._map.latLngToContainerPoint([d[0], d[1]]);
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
        }
      }
      console.log(`draw`);
    }
  }
  myCustomCanvasDraw.prototype = new L.CanvasLayer(); // -- setup prototype 
  var myLayer = new myCustomCanvasDraw();
  myLayer.addTo(map);
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