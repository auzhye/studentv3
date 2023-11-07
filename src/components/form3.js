import React from 'react';
import {useState} from 'react';
import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/compat/app';
import {onAuthStateChanged} from "firebase/auth";
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  useColorModeValue
} from "@chakra-ui/react";

const Form3 = () => {
 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
  } else {
    // User is signed o ut
    window.location = '/login';
  }
});
const playlists = firestore.collection('playlists');

const query = playlists.orderBy('createdAt', "desc");
const [playlists_data] = useCollectionData(query, {idField:'id'});
const [formValue, setFormValue] = useState('');
const [formValue2, setFormValue2] = useState('');
const playlists2 = firestore.collection("playlists")
.where("name", "==", formValue);
const [user, loading] = useAuthState(auth);

const update = async (e) => {
  e.preventDefault();
  const {uid, photoURL, displayName} = auth.currentUser;
  function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const isInsideDb = await   
  playlists2.get().then((querySnapshot) => {
      const ret = [];
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          ret.push(doc.data());
      });
      if (ret.length !== 0) {
        return true;
      } else {
        return false;
      }
  })
  const isSpotify = () => {
    if (formValue.includes("https://open.spotify.com/playlist/") || formValue.includes("http://open.spotify.com/playlist/")) {
      return true;
    } else {
      return false;
    }
  }
   await playlists.add({
     name: formValue,
     createdAt:firebase.firestore.FieldValue.serverTimestamp(),
     uid,
     photoURL,
     displayName
   });
   setFormValue("");
 }

 const bg = useColorModeValue("white", "gray.800");
  return (
    <Box bg={bg} _dark={{ bg: {bg} }} p={10}>
      <Box>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Skolas čats
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
              >
                Dalies ar svarīgiem domu graudiem.
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
                bg={bg}
                _dark={{ bg: {bg} }}
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 3]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Ziņa
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        onChange={(e) => setFormValue(e.target.value)}
                        value={formValue}
                        type="text"
                        placeholder="Message..."
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
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
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Post
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      {playlists_data && playlists_data.map(msg => <Playlist key={msg.id} message={msg}/>)}
    </Box>
  );
};

export default Form3;

function Playlist(props) {
 const { name, photoURL, displayName, uid } = props.message;
 return (
   <div style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>
     <div style={{textAlign:"left", display:"inline-block"}}>
       <img src={photoURL}/>
       <p style={{textAlign:"center"}}>{displayName}</p>
     </div>
     <div>
      {name}
     </div>
   </div>
 );
}