(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.feature_area_sort = f()}})(function(){var define,module,exports;
var _$wgs84_3 = {};
_$wgs84_3.RADIUS = 6378137;
/* common-shake removed: module.exports.FLATTENING = */ void 1/298.257223563;
/* common-shake removed: module.exports.POLAR_RADIUS = */ void 6356752.3142;

var _$geojsonArea_2 = {};
/* removed: var _$wgs84_3 = require('wgs84'); */;

_$geojsonArea_2.geometry = geometry;
/* common-shake removed: module.exports.ring = */ void ringArea;

function geometry(_) {
    var area = 0, i;
    switch (_.type) {
        case 'Polygon':
            return polygonArea(_.coordinates);
        case 'MultiPolygon':
            for (i = 0; i < _.coordinates.length; i++) {
                area += polygonArea(_.coordinates[i]);
            }
            return area;
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
            return 0;
        case 'GeometryCollection':
            for (i = 0; i < _.geometries.length; i++) {
                area += geometry(_.geometries[i]);
            }
            return area;
    }
}

function polygonArea(coords) {
    var area = 0;
    if (coords && coords.length > 0) {
        area += Math.abs(ringArea(coords[0]));
        for (var i = 1; i < coords.length; i++) {
            area -= Math.abs(ringArea(coords[i]));
        }
    }
    return area;
}

/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */

function ringArea(coords) {
    var p1, p2, p3, lowerIndex, middleIndex, upperIndex, i,
    area = 0,
    coordsLength = coords.length;

    if (coordsLength > 2) {
        for (i = 0; i < coordsLength; i++) {
            if (i === coordsLength - 2) {// i = N-2
                lowerIndex = coordsLength - 2;
                middleIndex = coordsLength -1;
                upperIndex = 0;
            } else if (i === coordsLength - 1) {// i = N-1
                lowerIndex = coordsLength - 1;
                middleIndex = 0;
                upperIndex = 1;
            } else { // i = 0 to N-3
                lowerIndex = i;
                middleIndex = i+1;
                upperIndex = i+2;
            }
            p1 = coords[lowerIndex];
            p2 = coords[middleIndex];
            p3 = coords[upperIndex];
            area += ( rad(p3[0]) - rad(p1[0]) ) * Math.sin( rad(p2[1]));
        }

        area = area * _$wgs84_3.RADIUS * _$wgs84_3.RADIUS / 2;
    }

    return area;
}

function rad(_) {
    return _ * Math.PI / 180;
}
/* removed: var _$geojsonArea_2 = require("@mapbox/geojson-area"); */;
var __geometry_1 = _$geojsonArea_2.geometry;

/*
inputGeoJson: string
selectionProperty: string
*/
function onInvoke(meta, getValue, setValue) {
  // get options
  var inputGeoJson = getValue("inputGeoJson");
  var selectionProperty = getValue("selectionProperty");

  try {
    var json = JSON.parse(inputGeoJson);

    var geometryMap = {};
    json.features.sort(function (a, b) {
      var areaA = geometryMap[a.properties[selectionProperty]] || (geometryMap[a.properties[selectionProperty]] = __geometry_1(a.geometry));
      var areaB = geometryMap[b.properties[selectionProperty]] || (geometryMap[b.properties[selectionProperty]] = __geometry_1(b.geometry));

      if (areaA > areaB) {
        return -1;
      }

      if (areaA < areaB) {
        return 1;
      }

      return 0;
    });

    setValue("outputGeoJson", JSON.stringify(json));
  } catch(e) {
    setValue("outputGeoJson", "");
  }
}
/*
outputGeoJson: string
*/

var _$featureAreaSort_1 = function () { return onInvoke; };

return _$featureAreaSort_1;

});
