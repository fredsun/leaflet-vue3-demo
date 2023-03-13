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
import guoGeoJsonData from '../utils/data/guoGeoData.json'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet.markercluster";
import "leaflet-rotatedmarker"
import "../utils/L.Graticule";
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
  // drawGeoJsonPolyline();
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


  drawGeoJSONBeijing();
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
  L.marker([118.849672, 32.053417]).addTo(map)
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
  var plane1 = L.marker([118.869500, 32.053417], {
    //设置图标
    icon: icon,
    rotationAngle: 90
  });

  var plane2 = L.marker([118.859500, 32.043417], {
    //设置图标
    icon: icon,
    rotationAngle: 45
  });

  var plane3 = L.marker([118.879500, 32.053417], {
    //设置图标
    icon: icon,
    rotationAngle: 100
  });
  const marks = [plane1, plane2, plane3]
  ciLayer.addLayers(marks)
}

//获取天地图区域geojson
function drawGeoJsonPolyline() {
  var featureJsons = new Array()
  featureJsons.concat(jsonData.features)
  console.log(drawnItems)
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

//直接根据geojson绘制
function drawGeoJSONBeijing() {
  // var featureJsons = new Array();
  //合并数组，即赋值
  // featureJsons.concat(jsonData.features)
  // console.log(`cleandata`,featureJsons.length);
  // console.log(featureJsons.length)

  // console.log(`beforeClean`, jsonData);
  // for (var i = 0; i < jsonData.features.length; i++) {  
  //   for (var j = 0; j < jsonData.features[i].geometry.coordinates.length; j++) {
  //     for (let k = 0; k < jsonData.features[i].geometry.coordinates[j].length; k++) {
  //       //删除北京数据后的0
  //       jsonData.features[i].geometry.coordinates[j][k].pop()
  //       //latlng对调，适配天地图
  //       // console.log(`lnglat`,arrayLngLat);
  //       jsonData.features[i].geometry.coordinates[j][k].reverse()
  //       // console.log(`latlng`,arrayLngLat);
  //       // console.log(`arrayLngLatZero`, arrayCoor[j]);
  //       // console.log('arrayLngLat', arrayLngLat)
  //     }
  //   }
  // }
  console.log(`cleandata`, jsonData);
  // var myStyle = {
  //   "color": "#00f",
  //   "weight": 2,
  //   "opacity": 0.5,
  //   "fillColor": '#ff2600',
  //   "fillOpacity": 0.5,
  //   "stroke": 'red',
  // };
  console.log(`afterclean`, jsonData);
  L.geoJSON(jsonData, {
    style: function (feature) {
      switch (feature.properties.CNAME) {
        case '东城区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#0000ff',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
        case '丰台区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#00ff00',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
        case '西城区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#095325',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
        case '石景山区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#464336',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
        case '通州区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#636536',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
        case '海淀区':
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#642562',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };

        default:
          return {
            "color": "#00f",
            "weight": 2,
            "opacity": 0.5,
            "fillColor": '#ff0000',
            "fillOpacity": 0.5,
            "stroke": 'red',
          };
      }
    }
  }).addTo(map);
}

//绘制canvas点群
function drawCanvasPoints() {
  // console.log(`data`, getData());
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
      // console.log(`info`, info);
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
<<<<<<< HEAD
      var lnglat1 = [32.034404, 118.824663];
      var lnglat2 = [35.903596, 111.679377];
      var lnglat3 = [27.354039, 109.950031];
      var lnglat4 = [33.626467, 100.935355];
      var dot1 = info.layer._map.latLngToContainerPoint([lnglat1[0], lnglat1[1]]);
      var dot2 = info.layer._map.latLngToContainerPoint([lnglat2[0], lnglat2[1]]);
      var dot3 = info.layer._map.latLngToContainerPoint([lnglat3[0], lnglat3[1]]);
      var dot4 = info.layer._map.latLngToContainerPoint([lnglat4[0], lnglat4[1]]);
      // console.log(`latlng1`, dot1.x + `,` + dot1.y);
      // console.log(`latlng2`, dot2.x + `,` + dot2.y);
      ctx.beginPath();
      ctx.moveTo(dot1.x, dot1.y);
      ctx.lineTo(dot2.x, dot2.y);
      ctx.lineTo(dot3.x, dot3.y);
      ctx.lineTo(dot4.x, dot4.y);
      ctx.quadraticCurveTo(dot1.x, dot1.y, dot2.x, dot2.y)
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = "green";
      ctx.fillText("text", dot1.x, dot1.y)
      ctx.fillStyle = "green";
      ctx.fillText("text", dot2.x, dot2.y)
      ctx.fillStyle = "blue";
      ctx.fillText("text2", dot3.x, dot3.y)
      console.log(`lnglat2: ` + lnglat2);
      console.log(`dot2`, dot2.x, dot2.y);

      var latlngDatas = [
        // [0,0],
        [74.112097, 28.75764],
        [82.942799, 41.298646],
        [93.981177, 33.56488],
        [100.015491, 40.629238],
        [108.846193, 30.302207],
        [120.178928, 40.517005],
        [162.860657, 22.21681],
        // [180,90]
      ]


      // var dotDatas = [];
      // for (let index = 0; index < latlngDatas.length; index++) {
      //   const element = latlngDatas[index];
      //   // console.log(`element`, element);
      //   // console.log(`element`, element[0]);
      //   // console.log(`element`, element[1]);
      //   var dot = info.layer._map.latLngToContainerPoint([latlngDatas[index][1], latlngDatas[index][0]]);
      //   dotDatas.push([dot.x, dot.y]);
      // }
      for (let index = 0; index < latlngDatas.length; index++) {
        const element = latlngDatas[index];
        element.reverse();
      }

      var datas = latlngDatas;
      // for (let index = 0; index < 50; index++) {
      //     datas.push([Math.random() * 200, Math.random() * 300])
      // }
      console.log(`latlngDatas[0]`, latlngDatas[0]);
      // console.log(`dotDatas[0]`, dotDatas[0]);
      var height = 360;
      var width = 180;
      // var height = info.canvas.height;
      // var width = info.canvas.width;
      console.log(`canvas.height`, height);
      console.log(`canvas.width`, width);
      var dataXMax = datas[0][0],
        dataXMin = datas[0][1],
        dataYMax = datas[0][0],
        dataYMin = datas[0][1],
        diffY = 0,
        diffX = 0;
      console.log(`dataXMax`, dataXMax);
      console.log(`dataXMin`, dataXMin);
      datas.forEach(function (obj, i) {
        if (dataXMax < obj[0]) dataXMax = obj[0]
        if (dataXMin > obj[0]) dataXMin = obj[0]
        if (dataYMax < obj[1]) dataYMax = obj[1]
        if (dataYMin > obj[1]) dataYMin = obj[1]
      })
      console.log(`dataXMax`, dataXMax);
      console.log(`dataXMin`, dataXMin);
      diffY = height / (dataYMax - dataYMin)
      diffX = width / (dataXMax - dataXMin)
      console.log(`diffY`, diffY);
      console.log(`diffX`, diffX);
      console.log(`datas[0][0]`, datas[0][0]);
      ctx.beginPath();
      ctx.strokeStyle = "#000"
      ctx.fillStyle = "#000"
      ctx.lineWidth = 5.0;
      ctx.fillRect(0, width, 0, height)
      ctx.lineTo(datas[0][0], [0][1]);
      datas.forEach(function (item, index) { //找到前一个点到下一个点中间的控制点
        var scale = 0.1
        if (index === 0) {
          ctx.lineTo(nowX, nowY)
          return
        }
        if (index === 1) {
          var last1X = Math.floor(width - diffX * (datas[index - 1][0] - dataXMin)),
            last1Y = Math.floor(height - diffY * (datas[index - 1][1] - dataYMin)),
            nowX = Math.floor(width - diffX * (datas[index][0] - dataXMin)),
            nowY = Math.floor(height - diffY * (datas[index][1] - dataYMin)),
            nextX = Math.floor(width - diffY * (datas[index + 1][0] - dataXMin)),
            nextY = Math.floor(height - diffY * (datas[index + 1][1] - dataYMin)),
            cAx = last1X + (nowX - 0) * scale,
            cAy = last1Y + (nowY - self.height) * scale,
            cBx = nowX - (nextX - last1X) * scale,
            cBy = nowY - (nextY - last1Y) * scale;
          return;
        }
        if (index === datas.length - 1) {
          var scale = 0.1
          var last1X = Math.floor(width - diffX * (datas[index - 1][0] - dataXMin)),
            last1Y = Math.floor(height - diffY * (datas[index - 1][1] - dataYMin)),
            last2X = Math.floor(width - diffX * (datas[index - 2][0] - dataXMin)),
            last2Y = Math.floor(height - diffY * (datas[index - 2][1] - dataYMin)),
            nowX = Math.floor(width - diffX * (datas[index][0] - dataXMin)),
            nowY = Math.floor(height - diffY * (datas[index][1] - dataYMin)),
            cAx = last1X + (nowX - last2X) * scale,
            cAy = last1Y + (nowY - last2Y) * scale,
            cBx = nowX - (nowX - last1X) * scale,
            cBy = nowY - (nowY - last1Y) * scale;
          return;
        }
        // console.log(`index`, index);
        var last1X = Math.floor(width - diffX * (datas[index - 1][0] - dataXMin)),
          last1Y = Math.floor(height - diffY * (datas[index - 1][1] - dataYMin)),
          last2X = Math.floor(width - diffX * (datas[index - 2][0] - dataXMin)),
          last2Y = Math.floor(height - diffY * (datas[index - 2][1] - dataYMin)),
          nowX = Math.floor(width - diffX * (datas[index][0] - dataXMin)),
          nowY = Math.floor(height - diffY * (datas[index][1] - dataYMin)),
          nextX = Math.floor(width - diffY * (datas[index + 1][0] - dataXMin)),
          nextY = Math.floor(height - diffY * (datas[index + 1][1] - dataYMin)),
          cAx = last1X + (nowX - last2X) * scale,
          cAy = last1Y + (nowY - last2Y) * scale,
          cBx = nowX - (nextX - last1X) * scale,
          cBy = nowY - (nextY - last1Y) * scale;
          var latA = info.layer._map.latLngToContainerPoint([cAx,cAy]);
          var latB = info.layer._map.latLngToContainerPoint([cBx,cBy]);
          var now = info.layer._map.latLngToContainerPoint([nowX,nowY]);
          console.log(`now`, now.x, now.y);
          ctx.bezierCurveTo(
            latA.x,
            latA.y,
            latB.x,
            latB.y,
            now.x,
            now.y
          )
        // ctx.bezierCurveTo(
        //   cAx,
        //   cAy,
        //   cBx,
        //   cBy,
        //   nowX,
        //   nowY);
        // console.log(`nowx`, nowX);
        // console.log(`nowy`, nowY);
      })
      ctx.stroke();
      ctx.closePath();
      L.graticule().addTo(map);
=======
      console.log(`draw`);
      // ctx.quadraticCurveTo(32.034404, 118.824663, 31.908939, 118.733826);
      // ctx.quadraticCurveTo(32.057909, 118.682084, 32.214456, 118.835012);
      // ctx.quadraticCurveTo(31.96189, 118.145113, 31.647654, 118.053127);
      // ctx.quadraticCurveTo(31.523627, 119.04888, 31.511807, 119.879058);
      // var dots = [[118.824663, 32.034404], [113.751372, 10.81264]]
      // ctx.fillStyle = "#000"
      // ctx.lineWidth = 5.0;
      // ctx.strokeStyle = "#cc0000"
      // ctx.beginPath();
      // var dot = info.layer._map.latLngToContainerPoint(dots(0));
      // ctx.moveTo(dot.x, dot.y);
      // var dot2 = info.layer._map.latLngToContainerPoint(dots(1));
      // ctx.lineTo(dot2.x, dot2.y);
      // ctx.moveTo(32.034404, 118.824663);
      // ctx.lineTo(31.81264, 113.751372);

      // ctx.quadraticCurveTo(118.824663, 32.034404, 118.733826, 31.908939);
      // ctx.quadraticCurveTo(118.682084, 32.057909, 118.835012, 32.214456);
      // ctx.quadraticCurveTo(118.145113, 31.96189, 118.053127, 31.647654);
      // ctx.quadraticCurveTo(119.04888, 31.523627, 119.879058, 31.511807);
      // ctx.stroke();
      // ctx.closePath();
>>>>>>> 57c77d981ce6772f957fd482f6ac33fb79e3dd0f
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