import { Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs"; // Icono estándar de Instagram para crear post

const CreatePost = () => {
  const {onOpen} = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <BsPlusSquare size={24} />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
    </>
  );
};

export default CreatePost;