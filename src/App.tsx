import { useState, useEffect } from "react";

import MapView from "./components/MapView";
import StationSelection from "./components/StationSelection";
import { ChakraProvider, Flex } from "@chakra-ui/react";

interface ILocation {
  lat?: number;
  lng?: number;
}

function App() {

  const [location, setLocation] = useState<ILocation>({})


  return (
    <ChakraProvider>
      <Flex width="100%" height="100vh" p={"64px"}>
        <StationSelection  />
        <MapView lat={location?.lat} lng={location?.lng} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
