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
import { Style, Circle, Fill } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { transformSRC } from "../util/transform";
import { Context } from "../store/ContextProvider";
import { createGeoJson } from "../util/createGeoJson";
import { fromLonLat } from "ol/proj";

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

    map.on("pointermove", function (e) {
      e.preventDefault();
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (layer && layer.get("name") === "stations") {
          const refCoordinates = feature.getGeometry().getCoordinates();
          const x = refCoordinates[0].toFixed(3);
          const y = refCoordinates[1].toFixed(3);
          const info = `<div>
              <p style="margin:0; text-align:center">
                <span style="font-weight:bold">
                  ${feature.getProperties().Network}
                </span>
              </p>
              <hr style="margin:8px 0" />
              <p style="margin:0">
                X: ${x} <br />
                Y: ${y}
              </p>
            </div>`;
          document.getElementById("popup-content").innerHTML = info;
        } else {
          document.getElementById("popup-content").innerHTML = "";
        }
      });
    });
    mapRef.current = map;
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (cntx.stations) {
      mapRef.current.getLayers().forEach((layer) => {
        if (layer && layer.get("name") === "stations") {
          mapRef.current.removeLayer(layer);
        }
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
              radius: 8,
              fill: new Fill({
                color: "blue",
              }),
            }),
          }),
          properties: { name: "stations" },
        });
        // Add Vector layer to the map
        mapRef.current.addLayer(vectorLayer);
        const extent = vectorSource.getExtent();
        mapRef.current.getView().fit(extent, {
          size: mapRef.current.getSize(),
          duration: 300,
        });
      }
    }
  }, [cntx.stations]);

  if (cntx.selectedStation) {
    const selectedStation = cntx.stations.find(
      (item) => item.station === cntx.selectedStation
    );
    if (selectedStation) {
      mapRef.current
        .getView()
        .fit(
          new Point(
            fromLonLat([selectedStation.longitude, selectedStation.latitude])
          ),
          {
            maxZoom: 10,
            duration: 300,
          }
        );
    }
  }

  return (
    <Box width={"100%"} height={"100%"}>
      <div id="popup">
        <span id="popup-content">info</span>
      </div>
      <div id="map"></div>
    </Box>
  );
};

export default MapView;
