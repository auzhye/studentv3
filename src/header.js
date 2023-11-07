import React, {createContext, useState} from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  VStack,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import {useRef} from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import { auth } from './config/firebase';
import {signOut} from "firebase/auth";
import Logo from './logo.png';
import { useAuthState } from 'react-firebase-hooks/auth';


const Header = () => {
 const [user] = useAuthState(auth);
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue("white", "gray.800");
  const ref = useRef(null);
  const [y, setY] = React.useState(0);
  const height = ref.current ? ref.current.getBoundingClientRect() : 0;

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue("brand.600", "brand.50");
    const hbg = useColorModeValue("gray.50", "brand.400");
    const tcl = useColorModeValue("gray.900", "gray.50");
    const dcl = useColorModeValue("gray.500", "gray.50");
    return (
      <Link
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{ bg: hbg }}
      >
        <Icon
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d={props.icon} />
        </Icon>
        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Link>
    );
  };

  function logoutFn() {
   signOut(auth)
   .catch((error) => {
     console.log(error);
   });
 }
 const MobileNavContentLogout = (
  
  <VStack
  pos="absolute"
  top={0}
  left={0}
  right={0}
  display={mobileNav.isOpen ? "flex" : "none"}
  flexDirection="column"
  p={2}
  pb={4}
  m={2}
  bg={bg}
  spacing={3}
  rounded="sm"
  shadow="sm"
  zIndex={99999999}
>
<CloseButton 
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
  <Button onClick={() => {window.location.href = "/login"}} w="full" variant="ghost" leftIcon={<AiFillHome />}>
    Ienākt
  </Button>
</VStack>
 );
  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
      zIndex={99999999}
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button onClick={() => {window.location.href = "/home"}} w="full" variant="ghost" leftIcon={<AiFillHome />}>Čats</Button>
      <Button onClick={() => {window.location.href = "/skola"}} w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Konsultācijas
      </Button>
      <Button onClick={() => {window.location.href = "/vertejums"}}
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Vērtējums
      </Button>
      <Button onClick={logoutFn} w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Iziet
      </Button>
    </VStack>
  );
  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s"
      bg={bg}
      borderTop="6px solid"
      borderTopColor="brand.400"
      w="full"
      overflowY="hidden"
      borderBottomWidth={2}
      color="gray.200"
      _dark={{ color: "gray.900" }}
      zIndex="999999999999"
    >
      <chakra.div h="4.5rem" mx="auto" maxW="1200px">
        <Flex
          w="full"
          h="full"
          px="6"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="flex-start">
            <Link href="/">
              <HStack>
                <img src={Logo} height="auto" width="200px" />
              </HStack>
            </Link>
          </Flex>
          <Flex>
            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
             {user ? <Linkers /> : null}
            </HStack>
          </Flex>
          <Flex justify="flex-end" align="center" color="gray.400">
            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
             {user ? null : <Ienakt />}
            </HStack>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{ color: "inherit" }}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Flex>
        </Flex>
        {user ? MobileNavContent : MobileNavContentLogout}
      </chakra.div>
    </chakra.header>
  );
};
function Ienakt() {
 return (
  <>
   <Button colorScheme="brand" variant="solid" size="sm" onClick={() => {window.location.href = "/login"}}>
     Ienākt
   </Button>
  </>
 );
}
function Linkers() {
 function logoutFn() {
  signOut(auth)
  .catch((error) => {
    console.log(error);
  });
}
const bg = useColorModeValue("white", "gray.800");
const cl = useColorModeValue("gray.800", "white");
 return (
  <>
   <Button
     bg={bg}
     color="gray.500"
     display="inline-flex"
     alignItems="center"
     fontSize="md"
     _hover={{ color: cl }}
     _focus={{ boxShadow: "none" }}
     onClick={() => {window.location.href = "/home"}}
   >
     Čats
   </Button>
   <Button
     bg={bg}
     color="gray.500"
     display="inline-flex"
     alignItems="center"
     fontSize="md"
     _hover={{ color: cl }}
     _focus={{ boxShadow: "none" }}
     onClick={() => {window.location.href = "/skola"}}
   >
     Konsultācijas
   </Button>
   <Button
     bg={bg}
     color="gray.500"
     display="inline-flex"
     alignItems="center"
     fontSize="md"
     _hover={{ color: cl }}
     _focus={{ boxShadow: "none" }}
     onClick={() => {window.location.href = "/vertejums"}}
   >
     Vērtējums
   </Button>
   <Button
     bg={bg}
     color="gray.500"
     display="inline-flex"
     alignItems="center"
     fontSize="md"
     _hover={{ color: cl }}
     _focus={{ boxShadow: "none" }}
     onClick={logoutFn}
   >
     Iziet
   </Button>
  </>
 );
}

export default Header;