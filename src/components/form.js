import React from 'react';
import {useState,useEffect} from 'react';
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
import { Timestamp } from "firebase/firestore";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useColorModeValue,
  Link
} from "@chakra-ui/react";

function Form() {
 const bg = useColorModeValue("white", "gray.800");
 const skola = firestore.collection('skolotaji');
    const skola3 = firestore.collection('skola');
    const query = skola;
    const [skola_data] = useCollectionData(query, {idField:'id'});
    const [formValue, setFormValue] = useState('');
    const [formValue2, setFormValue2] = useState('');
    const [formValue3, setFormValue3] = useState('');
    useEffect(() => {
     setFormValue(skola_data && skola_data.map(e => e.uid)[0]);
    }, [skola_data]);
    const update = async (e) => {
        const datums = new Date(document.getElementById("datums").value);
        console.log(datums)
        e.preventDefault();
        document.getElementById("pieteikties").disabled = true;
        const {uid, displayName} = auth.currentUser;
        await skola3.add({
        skolnieka_uid:uid,
        skolnieks:displayName,
        skolotajs_uid:formValue,
        when:Timestamp.fromDate(datums).toDate(),
        tema:formValue3,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        });
        setTimeout(() => {
            document.getElementById("pieteikties").disabled = false;
        }, 2500);
        toast('Jūs veiksmīgi pieteicāties uz konsultācijām!', {
         position: "top-right",
         autoClose: 2500,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
       }
  return (
   <>
    <Box bg={bg} _dark={{ bg: {bg} }} p={10}>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Pieteikties uz konsultācijām
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Piesakies uz skolotaja konsultācijām, ievērojot skolotāju darba grafiku
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={bg}
                _dark={{ bg: {bg} }}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl isRequired as={GridItem} colSpan={[6, 6]}>
                    <FormLabel
                      htmlFor="country"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Izvēlies skolotāju
                    </FormLabel>
                    <Select
                      defaultValue={skola_data && skola_data.map(msg => msg.uid)[0]} value={formValue} onChange={(e) => setFormValue(e.target.value)}
                      id="country"
                      name="country"
                      autoComplete="country"
                      
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    >
                      {skola_data && skola_data.map(msg => <option key={msg.uid} value={msg.uid}>{msg.skolotajs}</option>)}
                    </Select>
                  </FormControl>

                  <FormControl isRequired as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="datums"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Datums
                    </FormLabel>
                    <Input
                      value={formValue2} onChange={(e) => setFormValue2(e.target.value)}
                      type="date"
                      name="datums"
                      id="datums"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />
                  </FormControl>

                  <FormControl isRequired as={GridItem} colSpan={[6, 6, null, 6]}>
                    <FormLabel
                      htmlFor="city"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Tēma
                    </FormLabel>
                    <Input
                      value={formValue3} onChange={(e) => setFormValue3(e.target.value)}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="city"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                    />

                  </FormControl>
                  
                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={bg}
                _dark={{ bg: {bg} }}
                textAlign="right"
              >
                <Button
                onClick={update}
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  id="pieteikties"
                >
                  Iesniegt
                </Button>
                </Box>
                <Stack 
                px={4}
                py={5}
                p={[null, 6]}
                bg={bg}
                _dark={{ bg: {bg} }}
                textAlign='center'
                spacing={0}>
                 
                <SimpleGrid columns={1} spacing={1}  display='inline-block'>
                <Link target="_blank" rel="noreferrer" href='https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vSkvpMXc526_7i_tdPicK3QSaelSah6x6A6Bw2PlyxSG_eotBMqbaYaaL7IAjCjLIczo_hFeEfo_wCy/pubhtml?pli=1#'>Nodarbību saraksts</Link>
               </SimpleGrid>
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <p id='success' className='visible'>Jūs veiksmīgi pieteicāties konsultācijām!</p>
    </Box>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          /><ToastContainer />
          </>
  );
};

export default Form;

