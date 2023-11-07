import React from "react";
import { Box, Flex, Image, Link, chakra,useColorModeValue } from "@chakra-ui/react";
import UserImage from "../user.png";

export default function Card(){
 const bg = useColorModeValue("white", "gray.800");
  return (
    <Flex
      bg={bg}
      _dark={{ bg: {bg} }}
      p={20}
      w="full"
      alignItems="center"
      justifyContent="center"
      flexDir={{base:"column", "md": "row"}}
    >
      <Box
        w="xs"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src={UserImage}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link
            display="block"
            fontSize="2xl"
            color="gray.800"
            _dark={{ color: "white" }}
            fontWeight="bold"
          >
            Matīss Šķēle
          </Link>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            Sociālais mārketings
          </chakra.span>
        </Box>
      </Box>
      <Box
        w="xs"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src={UserImage}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link
            display="block"
            fontSize="2xl"
            color="gray.800"
            _dark={{ color: "white" }}
            fontWeight="bold"
          >
            Matejs Galvanausks
          </Link>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            Dizains un idejas autors
          </chakra.span>
        </Box>
      </Box>
      <Box
        w="xs"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src={UserImage}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link
            display="block"
            fontSize="2xl"
            color="gray.800"
            _dark={{ color: "white" }}
            fontWeight="bold"
          >
            Ralfs A. Verveiko
          </Link>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            Programmētājs un idejas autors
          </chakra.span>
        </Box>
      </Box>
    </Flex>
  );
};

