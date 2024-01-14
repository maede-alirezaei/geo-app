import MapView from "./components/MapView";
import StationSelection from "./components/StationSelection";
import { ChakraProvider, Flex } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Flex width="100%" height="100vh" p={"64px"}>
        <StationSelection />
        <MapView />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
