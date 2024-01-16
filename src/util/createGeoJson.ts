import { Station } from "../services/stations";

interface GeoJsonFeature {
  type: string;
  properties: Station;
  geometry: PointGeometry;
}

interface PointGeometry {
  coordinates: number[];
  type: string;
}
export interface GeoJsonFeatureCollection {
  type: string;
  features: GeoJsonFeature[];
}

export function createGeoJson(data: Station[]): GeoJsonFeatureCollection {
  const features = data
    .filter((item) => item.latitude && item.longitude)
    .map((item) => ({
      type: "Feature",
      properties: {
        Network: item.network,
        Station: item.station,
        Elevation: parseFloat(item.elevation),
        SiteName: item.siteName,
        StartTime: item.startTime,
        EndTime: item.endTime,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
      },
    }));

  const featureCollection = {
    type: "FeatureCollection",
    features,
  };

  return featureCollection;
}
