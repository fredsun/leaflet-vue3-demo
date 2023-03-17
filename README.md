###包安装
npm create vite@latest leaflet-vue3-app  -- --template vue-ts
npm install dayjs --save
npm install @icon-park/vue-next --save
npm install ant-design-vue --save
npm install axios --save
npm install localforage --save
npm install leaflet --save
npm install leaflet.markercluster
npm install leaflet-rotatedmarker --save
npm install echarts vue-echarts --save
//for leaflet-canvas-marker
npm install rbush
网格图思路：大网格用 geojson 的 line 属性直接画，小网格考虑到本身是数据驱动的效果，后续可能的点击/划过展示的需求，不用细geojson线来绘制固定的小格，而是 canvas 写
leaflet-omnivore.min.js//其他格式转化为geojson，geojson的快速读写
Leaflet.VectorGrid//绘制矢量数据
geojson-vt//geojson转化为矢量tiles
leaflet.markercluster//聚合图层
leaflet.featuregroup.subgroup//动态的从 cluster里增删数据
leaflet.ChineseTmsProviders//地图服务加载插件