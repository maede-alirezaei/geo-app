import { fromLonLat } from "ol/proj";

/**
 * Interface for the GeoJSON Object
 */
interface IGeoJSONObject {
  type: string;
  features: IFeature[];
}

/**
 * Interface for the GeoJSON Object Feature
 */
interface IFeature {
  type: string;
  properties: IProperties;
  geometry: IPointGeometry;
}

/**
 * Interface for the GeoJSON Object Feature Geometry of type Point
 */
interface IPointGeometry {
  coordinates: number[];
  type: string;
}

interface IProperties {}

export const transformSRC = (
  geojsonObject: IGeoJSONObject,
  targetSRC?: string
) => {
  var results = geojsonObject;
  var temp: number[];
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