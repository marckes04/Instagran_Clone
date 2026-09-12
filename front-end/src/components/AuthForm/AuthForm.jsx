import { useState } from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth"; // <-- Add this import

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Main Authentication Box */}
      <Box border="1px solid gray" borderRadius={4} p={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} alt="Instagram" cursor="pointer" />

          {isLogin ? <Login /> : <Signup />}

          {/* Divider */}
          <Flex alignItems="center" justifyContent="center" my={4} gap={1} w="full">
            <Box flex={2} h="1px" bg="gray.400" />
            <Text mx={1} color="white">
              OR
            </Text>
            <Box flex={2} h="1px" bg="gray.400" />
          </Flex>

          {/* Google Auth Component */}
          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      {/* Switch Auth Mode Box */}
      <Box border="1px solid gray" borderRadius={4} p={5} mt={4}>
        <Flex alignItems="center" justifyContent="center">
          <Text mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Text
            as="span"
            color="blue.500"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;