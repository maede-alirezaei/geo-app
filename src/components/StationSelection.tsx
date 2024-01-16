import { Box, Card, Select, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { getStations } from "../services/stations";
import { Context } from "../store/ContextProvider";

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

  function parseText(rawData: string) {
    const rows = rawData.split("\n");
    const header = rows[0].substring(1).split("|");

    // Process the data rows
    const data = rows.slice(1).map((row) => {
      const values = row.split("|");
      let rowData = {};

      header.forEach((key, index) => {
        rowData = { ...rowData, [key]: values[index] };
      });
      return rowData;
    });
    return data;
  }

  const handleStationChange = (event) => {
    cntx.handleSelectedStation(event.target.value);
  };
  return (
    <Card width="50%" p="32px">
      <Select
        placeholder="Select network"
        onChange={handleChange}
        value={network}
      >
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
          {cntx.stations.map((item, index) => (
            <option key={item.station} value={item}>
              {item.Station}
            </option>
          ))}
        </Select>
      )}
    </Card>
  );
}

export default StationSelection;
