function createFakerData(){
var leftBottomPoint;
var interval = 1;
var featuresList = [];
console.log(`create`);
var colorId;//0 green, 1 yelllow, 2 red

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
        console.log(`leftBottomPoint1`,leftBottomPoint[0]+`,`+leftBottomPoint[1]);
        // if (30 < leftBottomPoint[0]  
        //     && leftBottomPoint < 35
        //     && 130 < leftBottomPoint[1] 
        //     && leftBottomPoint[1] < 135) {
        //         console.log(`leftBottomPoint0`,leftBottomPoint[0]+`,`+leftBottomPoint[1]);
        //     colorId = 1;
        // }else if(35 < leftBottomPoint[0] 
        //     && leftBottomPoint[0] < 39 
        //     && 135 < leftBottomPoint[1] 
        //     && leftBottomPoint[1] < 140){
        //     colorId = 2
        // }else{
        //     colorId = 0;  
        // }
        if (lat<30 && lng <140) {
            colorId = 1
        } else if (lat<40&& lng <150) {
            colorId =2
        }else{
            colorId = 0
        }

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
                "colorId": colorId,
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

