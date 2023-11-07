import React from 'react';
import {useState, useEffect} from 'react';
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
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
} from "@chakra-ui/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactStars from 'react-rating-star-with-type'

const Form2 = () => {
 const bg = useColorModeValue("white", "gray.800");
 const [user, loading] = useAuthState(auth);
 const skola = firebase.firestore().collection('vertejumi');
 var query;
 if (!loading) {
     query = firebase.firestore().collection('skolotaji');
 }
 const [skola_data] = useCollectionData(query, {idField:'id'});
 const [star, setStar] = useState(5);

 const onChange=(nextValue)=>{
     setStar(nextValue)
 }
 const [formValue, setFormValue] = useState('');
 const [formValue3, setFormValue3] = useState('');
 useEffect(() => {
  setFormValue(skola_data && skola_data.map(e => e.uid)[0]);
 }, [skola_data]);
 const update = async (e) => {
     e.preventDefault();
     document.getElementById("pieteikties").disabled = true;
     const {uid, displayName} = auth.currentUser;
     await skola.add({
         skolnieka_uid:uid,
         skolnieks:displayName,
         skolotajs_uid:formValue,
         vertejums:star,
         saite:formValue3,
         createdAt:firebase.firestore.FieldValue.serverTimestamp(),
     });
     setTimeout(() => {
         document.getElementById("pieteikties").disabled = false;
     }, 2500);
     toast('Jūs veiksmīgi novērtējāt skolotāju!', {
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
                Atgriezeniskā saite
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Iesniedz atgriezenisko saiti skolotājam pēc novadītās stundas.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              onSubmit={update}
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
                      htmlFor="street_address"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Reitings
                    </FormLabel>
                    <ReactStars size="2rem" onChange={onChange} isEdit={true} value={1} count={5}/>
                  </FormControl>

                  <FormControl isRequired as={GridItem} colSpan={[6, 6, null, 6]}>
                    <FormLabel
                      htmlFor="city"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Atgriezeniskā saite
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
                  id="pieteikties"
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Iesniegt
                </Button>
                </Box>
            </chakra.form>
            <p textAlign="center" id='success' className='visible'>Veiksmigi novertets!</p>
          </GridItem>
        </SimpleGrid>
      </Box>
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

export default Form2;

