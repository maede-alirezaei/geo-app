import { Box, Card, Select, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getStations } from "../services/stations";
import { Context } from "../store/ContextProvider";
import { parseText } from "../util/parseText";

function StationSelection() {
  const cntx = useContext(Context);
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  useEffect(() => {
    if (!network) return;
    const fetchStations = async () => {
      setLoading(true);

      try {
        const response = await getStations({ network });
        const parsedStations = parseText(response.data);
        cntx.handleStations(parsedStations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [network]);


  const handleStationChange = (event) => {
    console.log(event.target.value);
    cntx.handleSelectedStation(event.target.value);
  };
  return (
    <Card width="50%" p="32px">
      <Select placeholder="Select network" onChange={handleChange}>
        <option value="CX">CX</option>
      </Select>

      {!network && <Text mt={1}>Please select a network.</Text>}
      {loading && <Text mt={1}>Loading...</Text>}
      {error && <Text mt={1}>{error.message}</Text>}
      {network && !loading && !error && cntx.stations && (
        <Select
          mt={2}
          onChange={handleStationChange}
          placeholder="Select station"
        >
          {cntx.stations.map((item) => (
            <option key={item.station} value={item.station}>
              {item.Station}
            </option>
          ))}
        </Select>
      )}
    </Card>
  );
}

export default StationSelection;
