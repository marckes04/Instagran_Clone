import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });



  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} alt="Instagram" />
          
          <Input 
            placeholder="Email" 
            fontSize={14} 
            type="email" 
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />

          <Input 
            placeholder="Password" 
            fontSize={14} 
            type="password" 
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {!isLogin ? (
            <Input
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              fontSize={14}
              type="password"
            />
          ) : null}

          {/* Agregamos el onClick aquí para que el botón funcione */}
          <Button 
            w={"full"} 
            colorScheme={"blue"} 
            size={"sm"} 
            fontSize={14} 
          >
            {isLogin ? "Log In" : "Sign Up"}
          </Button>

          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
            <Image src="google.png" w={5} alt="Google logo" />
            <Text mx="2" color={"blue.500"}>
              Log in with Google
            </Text>
          </Flex>
        </VStack>
      </Box>

      {/* Agregamos un mt={4} para separar los dos cuadros */}
      <Box border={"1px solid gray"} borderRadius={4} padding={5} mt={4}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          {/* Corregido: Solo un onClick para cambiar el estado */}
          <Box 
            onClick={() => setIsLogin(!isLogin)} 
            color={"blue.500"} 
            cursor={"pointer"}
            fontWeight={"bold"}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;