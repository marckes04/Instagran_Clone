import { Text, Flex, VStack, Box, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser"; // Corregido a singular
import useGetSuggestedUsers from "../../components/hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers(); // Corregida la ortografía a suggestedUsers

  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUsers?.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>
      )}

      {/* Usuarios dinámicos obtenidos desde Firestore */}
      {suggestedUsers &&
        suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.uid || user.id} />
        ))}

      {/* Footer */}
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2026 Built By{" "}
        <ChakraLink
          href="https://github.com/marckes04"
          target="_blank"
          color="blue.400"
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