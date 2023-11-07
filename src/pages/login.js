import React from 'react';
import { auth } from '../config/firebase';
import '../index.css';
import { Box, Flex, Image, Link, chakra,useColorModeValue } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
function Login() {
    function loginFn() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        window.location = '/home';
      } else {
        // User is signed out
        // ...
      }
    });
    const bg = useColorModeValue("white", "gray.800");
    return (
     <Flex
     bg={bg}
     _dark={{ bg: {bg} }}
     p={10}
     w="full"
     alignItems="center"
     justifyContent="center"
     flexDir={'column'}
   >
    <chakra.h1 fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                letterSpacing="tight"
                padding={10}
                lineHeight="short"
                fontWeight="extrabold"
                color="gray.900"
                _dark={{ color: "white" }}>Ienākt</chakra.h1>
    <input className='login-with-google-btn' type="button" value="Ienākt ar Google" onClick={loginFn} />
   </Flex>
    );
  }
  
  export default Login;