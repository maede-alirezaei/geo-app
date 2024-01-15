import { Box, Card, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getStations } from "../services/stations";

function StationSelection({ onStationsHandler }) {
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState();
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
        onStationsHandler(parsedStations);
        setStations(parsedStations);
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
    setSelectedStation(event.target.value);
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

      <Box p={1}>
        {!network && <Text mt={1}>Please select a network.</Text>}
        {network && stations && (
          <Select onChange={handleStationChange}>
            {stations.map((item) => (
              <option key={item.station} value={item}>
                {item.Station}
              </option>
            ))}
          </Select>
        )}
      </Box>
    </Card>
  );
}

export default StationSelection;
