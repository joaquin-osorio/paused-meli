import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const ItemsList = ({ items }) => {

    const customRed = "#FF8386";
    const customGreen = "#3BCCBE";

  return (
    <Flex direction="column" alignItems="center">
      {items.map((item) => {
        return (
          <Text fontSize='md' key={item.value.id} color={item.type === 'missing' ? customRed : customGreen}>
            {item.value.id} - {item.value.title}
          </Text>
        );
      })}
    </Flex>
  );
};

export default ItemsList;
