import { Flex } from "@chakra-ui/react";
import Seller from "./components/Seller/Seller";

function App() {
  const trackedSellers = ["PCMIDICENTER", "ARTURIA ARGENTINA"];
  return (
    <Flex
      pt={20}
      direction="column"
      bg="#D6FFF6"
      w="100vw"
      minH="100vh"
      alignItems="center"
      gap="3em"
    >
      {trackedSellers.map((seller) => (
        <Seller nickname={seller} />
      ))}
    </Flex>
  );
}

export default App;
