const circle = require("@turf/circle");

/*
table: tabledata
latField: string
lngField: string
radiusField?: string
steps: number, default is 64
radius: number, default is 0.2
units: string, can be [miles, feet, kilometers, degrees, radians], default is kilometers
addProperties: bool
 */
function onInvoke(meta, getValue, setValue) {
  // get options
  const options = {
    table: getValue("table"),
    latField: getValue("latField"),
    lngField: getValue("lngField"),
    radiusField: getValue("radiusField"),
    steps: parseFloat(getValue("steps")),
    radius: parseFloat(getValue("radius")),
    units: getValue("units"),
    addProperties: getValue("addProperties").toString() === "true"
  };

  // set defaults

  let radiusScalar = 1;

  if (!options.steps || isNaN(options.steps)) {
    options.steps = 64;
  }

  if (!options.radius || isNaN(options.radius)) {
    options.radius = 0.2;
  }

  if (!options.units || !options.units.trim().length) {
    options.units = "kilometers";
  }

  // allow for feet, which is not supported by turf
  if (options.units == "feet") {
    options.units = "miles";
    radiusScalar /= 5280;
  }

  // quick check, probably won't amount to much
  if (!options.table) {
    console.error("polygon_circles: no table!");
    return;
  }

  let latFieldIdx = -1;
  let lngFieldIdx = -1;
  let radiusFieldIdx = -1;
  const propertyNames = [];

  options.table.cols.forEach((col, i) => {
    if (col.name === options.latField) {
      latFieldIdx = i;
    }

    if (col.name === options.lngField) {
      lngFieldIdx = i;
    }

    if (options.radiusField && col.name === options.radiusField) {
      radiusFieldIdx = i;
    }

    if (options.addProperties) {
      propertyNames.push(col.name);
    }
  });

  if (latFieldIdx < 0 || lngFieldIdx < 0) {
    console.error(`polygon_circles: invalid latField/lngField! ${latFieldIdx} ${lngFieldIdx}`);
    return;
  }

  const features = options.table.rows.map(row => {
    const properties = {};
    if (options.addProperties) {
      propertyNames.forEach((name, i) => {
        if (i === lngFieldIdx || i == latFieldIdx || i == radiusFieldIdx) {
          return;
        }
        properties[name] = row[i];
      });
    }

    const coordinates = [parseFloat(row[lngFieldIdx]), parseFloat(row[latFieldIdx])];
    const radius = radiusFieldIdx < 0 ? options.radius : parseFloat(row[radiusFieldIdx]);

    if (isNaN(radius)) {
      radius = 0;
    }

    return circle(coordinates, radius * radiusScalar, {
      steps: options.steps,
      units: options.units,
      properties
    });
  });
  
  const geojson = JSON.stringify({
    type: "FeatureCollection",
    features
  });

  setValue("geojson", geojson);
}
/*
geojson: string
*/

module.exports = () => onInvoke;