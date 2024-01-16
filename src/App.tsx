import MapView from "./components/MapView";
import StationSelection from "./components/StationSelection";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import ContextProvider from "./store/ContextProvider";

function App() {

  return (
    <ChakraProvider>
      <ContextProvider>
        <Flex width="100%" height="100vh" p={"64px"}>
          <StationSelection />
          <MapView />
        </Flex>
      </ContextProvider>
    </ChakraProvider>
  );
}

export default App;
