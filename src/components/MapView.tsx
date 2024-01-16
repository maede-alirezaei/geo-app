import { useContext, useEffect, useRef } from "react";

import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { Point } from "ol/geom";

import { Box } from "@chakra-ui/react";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Style, Circle, Fill, Stroke } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { transformSRC } from "../util/transform";
import { Context } from "../store/ContextProvider";
import { createGeoJson } from "../util/createGeoJson";

const MapView = () => {
  const mapRef = useRef();
  const cntx = useContext(Context);

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
    const geoJsonData = createGeoJson(cntx.stations);

    if (geoJsonData.features.length > 0) {
      const geoJSONObject = transformSRC(geoJsonData);
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJSONObject),
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
    mapRef.current = map;
    return () => {
      map.setTarget(undefined);
    };
  }, [cntx.stations]);

  if (cntx.selectedStation) {
    //  mapRef.current.getView().fit(new Point(selectedStation), {
    //   maxZoom:  mapRef.current.getView().getZoom(),
    //   duration: 300,
    // });
  }
  return (
    <Box width={"100%"} height={"100%"}>
      <div id="map"></div>
    </Box>
  );
};

export default MapView;
