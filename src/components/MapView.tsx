import { useEffect } from "react";

import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
// import { Point } from "ol/geom";

import { Box } from "@chakra-ui/react";
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { Style, Circle, Fill, Stroke } from 'ol/style.js';
import GeoJSON from 'ol/format/GeoJSON.js';

interface ILocation {
  lat?: number;
  lng?: number;
}


const MapView:React.FC<ILocation> = (props) => {
  const {lat, lng} = props;
  console.log(lat, lng)


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

    // GeoJSON object with a Point geometry
    const geojsonObject = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              13.39049453253108,
              52.5240734431535
            ],
            "type": "Point"
          }
        }
      ]
    }

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject)
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({
            color: 'red'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 2
          })
        })
      })
    });

    // Add Vector layer to the map
    map.addLayer(vectorLayer);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

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
