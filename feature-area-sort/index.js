const { geometry } = require("@mapbox/geojson-area");

/*
inputGeoJson: string
selectionProperty: string
*/
function onInvoke(meta, getValue, setValue) {
  // get options
  const inputGeoJson = getValue("inputGeoJson");
  const selectionProperty = getValue("selectionProperty");

  try {
    const json = JSON.parse(inputGeoJson);

    const geometryMap = {};
    json.features.sort((a, b) => {
      const areaA = geometryMap[a.properties[selectionProperty]] || (geometryMap[a.properties[selectionProperty]] = geometry(a.geometry));
      const areaB = geometryMap[b.properties[selectionProperty]] || (geometryMap[b.properties[selectionProperty]] = geometry(b.geometry));

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

module.exports = () => onInvoke;