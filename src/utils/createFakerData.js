function createFakerData(){
var leftBottomPoint;
var interval = 1;
var featuresList = [];
console.log(`create`);

for (let lng = -180; lng <= 180; lng+=interval) {
    for (let lat = -90; lat <= 90; lat+=interval) {
        // console.log(`lng lat`, lng+`.`+lat);
        let leftBottomPoint = [lng, lat];
        let  rightBottomPoint = [lng+interval, lat];
        let rightTopPoint = [lng+interval, lat+interval];
        let  leftTopPoint = [lng, lat+interval];
        var coordinatesList = [[
            leftBottomPoint,
            rightBottomPoint,
            rightTopPoint,
            leftTopPoint,
            leftBottomPoint,//回到原点成polygon
        ]];
        // console.log(`leftBottomPoint`,leftBottomPoint);
        var feature ={
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": coordinatesList,      
            },
            "properties": {
                "fnid": "1778",
                "grow_4326": "3",
                "gcol_4326": "350",
                "bj_conveni": "",
                "bj_dianpin": "",
                "bj_mall": "",
                "bj_superma": "",
                "bj_unicom_": "",
                "impervious": 0.0636364
            }
        };
        featuresList.push(feature);
    } 
}



var JsonObject = {
    "type":"FeatureCollection", 
    "features": featuresList
};
console.log(`featureList`, featuresList);
console.log(`JsonObject`,JsonObject);
return JSON.stringify(JsonObject);

}

export  {
    createFakerData
}

