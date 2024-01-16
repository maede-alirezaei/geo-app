import { Card, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Station, getStations } from "../services/stations";
import { Context } from "../store/ContextProvider";
import { parseText } from "../util/parseText";

function StationSelection() {
  const cntx = useContext(Context);
  const [network, setNetwork] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value);
  };

  useEffect(() => {
    if (!network) return;
    const fetchStations = async () => {
      setLoading(true);

      try {
        const response = await getStations({ network });
        const parsedStations: Station[] = parseText(response.data);
        cntx.handleStations(parsedStations);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [network]);

  const handleStationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    cntx.handleSelectedStation(event.target.value);
  };
  return (
    <Card width="50%" p="32px">
      <Select placeholder="Select network" onChange={handleChange}>
        <option value="CX">CX</option>
        <option value="1A">1A</option>
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
          {cntx.stations.map((item: Station, index) => (
            <option key={`${index}` + `${item.siteName}`} value={item.station}>
              {item.station}
            </option>
          ))}
        </Select>
      )}
    </Card>
  );
}

export default StationSelection;
