import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

// ✅ CORRECCIÓN: Agregamos las llaves { } para recibir las props correctamente
const PostHeader = ({ username, avatar }) => { 
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
            {/* Ahora 'avatar' sí tiene la ruta de la imagen */}
            <Avatar src={avatar} alt="user profile pic" size={"sm"} />
            
            <Flex fontSize={12} fontWeight={"bold"} gap="2">
                {/* Ahora 'username' sí es el texto del nombre */}
                {username}
                <Box color={"gray.500"}>
                 • 1w
                </Box>
            </Flex>
        </Flex>
        
        <Box cursor={"pointer"}>
            <Text
                fontSize={12}
                color={"blue.500"}
                fontWeight={"bold"}
                _hover={{
                    color: "white",
                }}
                transition={"0.2s ease-in-out"}
            >
                Unfollow
            </Text>
        </Box>
    </Flex>
  );
};

// Al final de PostHeader.jsx
export default PostHeader;