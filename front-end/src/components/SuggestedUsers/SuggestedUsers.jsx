import { Text, Flex, VStack, Box, Link as ChakraLink } from '@chakra-ui/react'; // Importamos Link de Chakra con un alias
import React from 'react';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
          See All
        </Text>
      </Flex>

      {/* Lista de usuarios sugeridos */}
      <SuggestedUser name='Dan Abramov' followers={1392} avatar='https://bit.ly/dan-abramov' />
      <SuggestedUser name='Ryan Florence' followers={567} avatar='https://bit.ly/ryan-florence' />
      <SuggestedUser name='Christian Nwamba' followers={759} avatar='https://bit.ly/code-beast' />

      {/* Footer de la sección */}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2026 Built By{" "}
        <ChakraLink 
          href="https://github.com/marckes04" 
          target='_blank' 
          color='blue.400' 
          fontSize={12} 
          style={{ textDecoration: "none" }}
          _hover={{ color: "blue.300" }}
        >
          As a Programmer
        </ChakraLink>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;