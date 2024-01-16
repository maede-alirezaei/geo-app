import { fromLonLat } from "ol/proj";
import { GeoJsonFeatureCollection } from "./createGeoJson";

export const transformSRC = (geojsonObject: GeoJsonFeatureCollection) => {
  const results = geojsonObject;
  let temp: number[];
  results["features"].map((feature, index) => {
    const coordinates = feature.geometry.coordinates;
    const geometryType = feature.geometry.type;

    switch (geometryType) {
      case "Point":
        temp = fromLonLat([coordinates[0], coordinates[1]]);
        break;
    }
    results["features"][index]["geometry"]["coordinates"] = temp;
  });
  return results;
};
