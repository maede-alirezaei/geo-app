import { Card, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Station, getStations } from "../services/stations";
import { Context } from "../store/ContextProvider";
import { parseText } from "../util/parseText";
import { Network, getNetworks } from "../services/networks";

function StationSelection() {
  const cntx = useContext(Context);
  const [network, setNetwork] = useState<string>("");
  const [networks, setNetworks] = useState<Network[]>([]);
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
        const parsedStations: Station[] = parseText<Station>(response.data);
        cntx.handleStations(parsedStations);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [network]);
  useEffect(() => {
    const fetchNetworks = async () => {
      setLoading(true);
      try {
        const response = await getNetworks();
        const parsedNetworks = parseText<Network>(response.data);
        setNetworks(parsedNetworks);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchNetworks();
  }, []);
  const handleStationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    cntx.handleSelectedStation(event.target.value);
  };
  return (
    <Card width="50%" p="32px" mr={2}>
      <Select placeholder="Select network" onChange={handleChange}>
        {networks &&
          networks.map((item, index) => (
            <option key={`${index}` + `${item.network}`} value={item.network}>
              {item.network}
            </option>
          ))}
      </Select>

      {!network && <Text m={2}>Please select a network.</Text>}
      {loading && <Text m={2}>Loading...</Text>}
      {error && <Text m={2}>{error.message}</Text>}
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
