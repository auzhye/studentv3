import React from 'react';
import {useState} from 'react';
import { auth, firestore } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import ReactStars from 'react-rating-star-with-type'
import {
  Flex,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Tabler = () => {
 const [user, loading] = useAuthState(auth);
 var query;
 if (!loading) {
     query = firestore.collection('vertejumi').where("skolotajs_uid", "==", user.uid);
 }
 const [skola_data, loadingData] = useCollectionData(query, {idField:'id'});
 var total = 0;
 const videjais = loadingData ? null : Object.values(skola_data).forEach(val => total += val.vertejums);
 const videjais2 = loadingData ? null : Math.round(total / skola_data.length);
 const [star, setStar] = useState(5);

 const onChange=(nextValue)=>{
     setStar(nextValue)
 }
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      w="full"
      bg={bg}
      _dark={{ bg: {bg} }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{ base: "column" }}
        w="full"
        bg={{ md: bg }}
        shadow="lg"
      >
        <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w={{ base: 120, md: "full" }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}
                fontSize="md"
                fontWeight="hairline"
              >
                <span>Vārds</span>
                <span>Vērtējums</span>
                <span>Atgr. saite</span>
              </SimpleGrid>
        {skola_data && skola_data.map((msg, pid) => {
          return (
            <Flex
              direction={{ base: "row", md: "column" }}
              bg={dataColor}
              key={pid}
            >
              <SimpleGrid
                spacingY={3}
                columns={{ base: 1, md: 3 }}
                w="full"
                py={2}
                px={10}
                fontWeight="hairline"
              >
                <span>{msg.skolnieks}</span>
                <ReactStars isEdit={false} value={msg.vertejums} count={5}/>
                <span>{msg.saite}</span>
              </SimpleGrid>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
};

export default Tabler;