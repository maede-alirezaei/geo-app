import { useEffect } from "react";

import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
// import { Point } from "ol/geom";

import { Box } from "@chakra-ui/react";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Style, Circle, Fill, Stroke } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { transformSRC } from "../util/transform";

const MapView = ({ stations }) => {
  const features = stations
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
  console.log("stations");
  const jsonString: string = JSON.stringify(featureCollection, null, 2);
  console.log(featureCollection);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    if (featureCollection.features.length > 0) {
      const GeoJSONObject3857 = transformSRC(featureCollection);
      console.log("jsonString");

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(GeoJSONObject3857),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Circle({
            radius: 2,
            fill: new Fill({
              color: "blue",
            }),
          }),
        }),
      });

      // Add Vector layer to the map
      map.addLayer(vectorLayer);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [jsonString]);

  // useEffect(() => {
  //    if (lat && lng) {
  //     map.getView().fit(new Point([lat, lng]), {
  //       maxZoom: map.getView().getZoom(),
  //       duration: 300,
  //     });

  //    }
  //   // Update Map View
  // }, [lat, lng])

  return (
    <Box width={"100%"} height={"100%"}>
      <div id="map"></div>
    </Box>
  );
};

export default MapView;
