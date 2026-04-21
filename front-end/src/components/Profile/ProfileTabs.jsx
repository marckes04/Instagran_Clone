import { Box, Flex, Text } from '@chakra-ui/react'; // 1. Añadimos Text aquí
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'; // 2. X mayúscula
import React from 'react';

const ProfileTabs = () => {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      {/* TAB 1: POSTS */}
      <Flex borderTop={"1px solid white"} alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsGrid3X3 /> {/* 3. Nombre exacto y etiqueta cerrada */}
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>Posts</Text>
      </Flex>

      {/* TAB 2 */}
      <Flex  alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsBookmark/>
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>Saved</Text>
      </Flex>
      
      {/* TAB 3 */}
      <Flex  alignItems={"center"} p="3" gap={1} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsSuitHeart />
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>Posts</Text>
      </Flex>

    </Flex>
  );
};

export default ProfileTabs;