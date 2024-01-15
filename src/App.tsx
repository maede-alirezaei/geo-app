import { useState } from "react";

import MapView from "./components/MapView";
import StationSelection from "./components/StationSelection";
import { ChakraProvider, Flex } from "@chakra-ui/react";

function App() {
  const [stations, setStations] = useState([]);

  const stationsHandler = (data) => {
    setStations(data);
  };

  return (
    <ChakraProvider>
      <Flex width="100%" height="100vh" p={"64px"}>
        <StationSelection onStationsHandler={stationsHandler} />
        <MapView stations={stations} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
