import { useContext, useEffect, useRef } from "react";

import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { Geometry, Point } from "ol/geom";

import { Box } from "@chakra-ui/react";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Style, Circle, Fill } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { transformSRC } from "../util/transform";
import { Context } from "../store/ContextProvider";
import { createGeoJson } from "../util/createGeoJson";
import { fromLonLat } from "ol/proj";
import { Station } from "../services/stations";
import { Feature } from "ol";

const MapView = () => {
  const mapRef = useRef<Map | null>();
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
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        if (layer && layer.get("name") === "stations") {
          const refCoordinates = feature.getGeometry()?.getCoordinates(); 
          const x = refCoordinates[0].toFixed(3);
          const y = refCoordinates[1].toFixed(3);
          const info = `<div>
                <span>
                Network:  ${feature.getProperties().Network}
                </span>
                <span>
               Station:  ${feature.getProperties().Station}
              </span>
                <span>
                X: ${x}
              </span>
              <span>
              Y: ${y}
            </span>
            
            </div>`;
          const infoElement = document.getElementById("info");
          if (infoElement) infoElement.innerHTML = info;
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
      mapRef.current?.getLayers().forEach((layer) => {
        if (layer && layer.get("name") === "stations") {
          mapRef.current?.removeLayer(layer);
        }
      });
      const geoJsonData = createGeoJson(cntx.stations);

      if (geoJsonData.features.length > 0) {
        const geoJSONObject = transformSRC(geoJsonData);
        const vectorSource = new VectorSource<Feature>({
          features: new GeoJSON().readFeatures(
            geoJSONObject
          ) as Feature<Geometry>[],
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
        mapRef.current?.addLayer(vectorLayer);
        const extent = vectorSource.getExtent();
        mapRef.current?.getView().fit(extent, {
          size: mapRef.current.getSize(),
          duration: 300,
        });
      }
    }
  }, [cntx.stations]);

  if (cntx.selectedStation) {
    const selectedStation: Station | undefined = cntx.stations?.find(
      (item: Station) => item.station === cntx.selectedStation
    );
    if (selectedStation) {
      mapRef.current
        ?.getView()
        .fit(
          new Point(
            fromLonLat([
              parseFloat(selectedStation.longitude),
              parseFloat(selectedStation.latitude),
            ])
          ),
          {
            maxZoom: 10,
            duration: 300,
          }
        );
    }
  }

  return (
    <Box position="relative" width="100%" height="100%">
      <div
        id="info"
        style={{
          position: "absolute",
          top: "2%",
          right: "20%",
          left: "20%",
          zIndex: 1,
          textAlign: "center",
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
        }}
      >
        Stations Map
      </div>
      <div id="map"></div>
    </Box>
  );
};

export default MapView;
