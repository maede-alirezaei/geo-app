import MapView from "./components/MapView";
import StationSelection from "./components/StationSelection";
import { ChakraProvider, Flex } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Flex>
        <StationSelection />
        <MapView />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
