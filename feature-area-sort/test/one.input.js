module.exports = {
  selectionProperty: "zoneID",
  inputGeoJson: `{
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {
            "zoneID": 2,
            "site_ID": 1,
            "floor_ID": 1,
            "name": "Produce",
            "zoneType": "MetricZone",
            "enterTrigger": false,
            "exitTrigger": false,
            "dwellTriggerMS": 0,
            "messageContent": {},
            "hoursOfOperation": null
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-84.0423158928752, 33.6802219275318],
                    [-84.0423160605133, 33.6802037926239],
                    [-84.0422823652625, 33.680202955628],
                    [-84.0422833710909, 33.6802219275318],
                    [-84.0423158928752, 33.6802219275318]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "zoneID": 3,
            "site_ID": 1,
            "floor_ID": 1,
            "name": "Check Out",
            "zoneType": "MetricZone",
            "enterTrigger": false,
            "exitTrigger": false,
            "dwellTriggerMS": 0,
            "messageContent": {},
            "hoursOfOperation": null
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-84.0422428026795, 33.6802265310078],
                    [-84.0422719717026, 33.6802259730107],
                    [-84.0422713011503, 33.6801860762101],
                    [-84.0422421321273, 33.6801866342074],
                    [-84.0422428026795, 33.6802265310078]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "zoneID": 4,
            "site_ID": 1,
            "floor_ID": 1,
            "name": "Display Case",
            "zoneType": "MetricZone",
            "enterTrigger": false,
            "exitTrigger": false,
            "dwellTriggerMS": 0,
            "messageContent": {},
            "hoursOfOperation": null
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-84.0423928387463, 33.6802280654997],
                    [-84.0423842892051, 33.680228204999],
                    [-84.0423842892051, 33.6801968176582],
                    [-84.0423921681941, 33.6801968176582],
                    [-84.0423928387463, 33.6802280654997]
                ]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "zoneID": 5,
            "site_ID": 1,
            "floor_ID": 1,
            "name": "Whole Space",
            "zoneType": "MetricZone",
            "enterTrigger": false,
            "exitTrigger": false,
            "dwellTriggerMS": 0,
            "messageContent": {},
            "hoursOfOperation": null
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-84.0422391146421, 33.6801841232194],
                    [-84.0422384440899, 33.6802415969276],
                    [-84.0423950180411, 33.6802404809336],
                    [-84.0423943474889, 33.6801830072247],
                    [-84.0422391146421, 33.6801841232194]
                ]
            ]
        }
    }]
}`
};