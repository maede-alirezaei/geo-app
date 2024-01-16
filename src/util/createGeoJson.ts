export function createGeoJson(data) {
  const features = data
    .filter((item) => item.Latitude && item.Longitude)
    .map((item) => ({
      type: "Feature",
      properties: {
        Network: item.Network,
        Station: item.Station,
        Elevation: parseFloat(item.Elevation),
        SiteName: item.SiteName,
        StartTime: item.StartTime,
        EndTime: item.EndTime,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(item.Longitude), parseFloat(item.Latitude)],
      },
    }));

  const featureCollection = {
    type: "FeatureCollection",
    features,
  };

  return featureCollection;
}
