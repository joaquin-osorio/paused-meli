import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import ItemsList from "../ItemsList/ItemsList";

const Seller = ({ nickname }) => {
  const [dateText, setDateText] = useState("");
  const [dif, setDif] = useState([]);

  const toast = useToast();

  const baseUrl = "https://paused-meli-api.vercel.app";

  useEffect(() => {
    fetch(`${baseUrl}/getPrevReg?nickname=${nickname}`)
      .then((res) => res.json())
      .then((data) => {
        const d = new Date(data.date.seconds * 1000);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const hour = d.getHours();
        const minutes = d.getMinutes();
        setDateText(
          `Ultimo registro el ${day}-${month}-${year} a las ${hour}:${minutes}`
        );
      });
  }, []);

  const handleClick = () => {
    Promise.all([
      fetch(`${baseUrl}/getPublications?nickname=${nickname}`).then((res) =>
        res.json()
      ),
      fetch(`${baseUrl}/getPrevReg?nickname=${nickname}`).then((res) =>
        res.json()
      ),
    ])
      .then(([data1, data2]) => {
        console.log(data1);
        console.log(data2);
        console.log(compareArrays(data1.items, data2.items));
        setDif(compareArrays(data1.items, data2.items));
        fetch(`${baseUrl}/getPublications?nickname=${nickname}&save=true`).then(
          () => {
            console.log("Guardado en la DB");
          }
        );
      })
      .then(() => {
        toast({
          title: "Datos actualizados",
          description: "Se han guardado los datos en la base de datos",
          status: "success",
          duration: 5000,
          position: "top",
        });
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
    <Flex direction="column" alignItems="center" gap="1em">
      <Flex direction="column" alignItems="center">
        <Heading as="h3" size="lg" color="#25174E">
          {nickname}
        </Heading>
        {dateText.length ? (
          <Text color="#25174E">{dateText}</Text>
        ) : (
          <Text color="#25174E">Loading...</Text>
        )}
      </Flex>
      <Divider borderColor="#25174E" />
      {dif.length ? (
        <ItemsList items={dif} />
      ) : (
        <Text color="#25174E">No hay cambios</Text>
      )}
      {
        !dif.length ? <Button onClick={handleClick} colorScheme="teal">Check Data</Button> : <Button onClick={handleClick} colorScheme="teal" isDisabled>Check Data</Button>
      }

    </Flex>
  );
};

export default Seller;
