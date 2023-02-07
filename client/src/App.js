import { useEffect, useState } from "react";
import "./App.css";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";

function App() {
  const trackedSellers = ["PCMIDICENTER", "ARTURIA OFICIAL"];
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [dif, setDif] = useState([]);

  const baseUrl = "http://localhost:3001";

  const handleClick = () => {
    Promise.all([
      fetch(`${baseUrl}/getPublications?nickname=PCMIDICENTER`).then((res) =>
        res.json()
      ),
      fetch(`${baseUrl}/getPrevReg?nickname=PCMIDICENTER`).then((res) =>
        res.json()
      ),
    ]).then(([data1, data2]) => {
      console.log(data1);
      console.log(data2);
      console.log(compareArrays(data1.items, data2.items));
      setDif(compareArrays(data1.items, data2.items));
      fetch(`${baseUrl}/getPublications?nickname=PCMIDICENTER&save=true`).then(
        () => {
          console.log("Guardado en la DB");
        }
      );
    });
  };

  const compareArrays = (arr1, arr2) => {
    const differences = [];
    const arr1Ids = arr1.map((item) => item.id);
    const arr2Ids = arr2.map((item) => item.id);
    for (let i = 0; i < arr1Ids.length; i++) {
      if (!arr2Ids.includes(arr1Ids[i])) {
        differences.push({ value: arr1[i], type: "extra" });
      }
    }
    for (let i = 0; i < arr2Ids.length; i++) {
      if (!arr1Ids.includes(arr2Ids[i])) {
        differences.push({ value: arr2[i], type: "missing" });
      }
    }
    return differences;
  };

  return (
    <Flex direction="column" alignItems="center" w="100%">
      <Heading>PC MIDI CENTER</Heading>
      <Button onClick={handleClick}>Check Data</Button>
    </Flex>
  );
}

export default App;
