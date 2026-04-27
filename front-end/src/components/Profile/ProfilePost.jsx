import {
  Flex,
  GridItem,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Avatar,
  Divider,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Importaciones de tus otros componentes (verifica que estas rutas sean las correctas en tu proyecto)
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* --- MINIATURA DEL POST EN EL PERFIL --- */}
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Image
          src={img}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />

        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease-in-out"}
          zIndex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>

      {/* --- MODAL (VENTANA EMERGENTE) --- */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={"full"} mx={"auto"} justifyContent={"center"}>
              
              {/* LADO IZQUIERDO: Imagen */}
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image src={img} alt="post" />
              </Box>

              {/* LADO DERECHO: Header, Comentarios y Footer */}
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                
                {/* 1. Header (Usuario y Botón de borrar) */}
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src='/profilepic.png'
                      size={'sm'}
                      name='As a programmer'
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      asaprogrammer_
                    </Text>
                  </Flex>

                  <Box _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1}>
                    <MdDelete size={20} cursor="pointer" />
                  </Box>
                </Flex>

                <Divider my={4} bg={"gray.500"} />

                {/* 2. Comentarios (Ocupan el espacio sobrante gracias a flex={1}) */}
                <VStack w="full" alignItems={"start"} flex={1} overflowY={"auto"}>
                  <Comment
                    createdAt="1d ago"
                    username="asaprogrammer_"
                    profilePic="/profilepic.png"
                    text={"Dummy images from unsplash"}
                  />
                  <Comment
                    createdAt="12h ago"
                    username="dan_abramov"
                    profilePic="https://bit.ly/dan-abramov"
                    text={"Awesome post!"}
                  />
                  <Comment
                    createdAt="3h ago"
                    username="ryan_florence"
                    profilePic="https://bit.ly/ryan-florence"
                    text={"Looking great 🔥"}
                  />
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                {/* 3. Footer (Siempre pegado abajo) */}
                <PostFooter isProfilePage={true} username={"asaprogrammer_"} />
              </Flex>
              
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;