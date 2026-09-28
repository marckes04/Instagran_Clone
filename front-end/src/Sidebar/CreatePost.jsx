import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../assets/contants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../components/hooks/usePreviewImg";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

  const handlePostCreation = async () => {
    // Aquí conectarás la lógica del store y Firebase más adelante
    console.log("Post Caption:", caption);
    console.log("Selected Image:", selectedFile);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setCaption("");
    setSelectedFile(null);
  };

  return (
    <>
      {/* Botón en el Sidebar */}
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
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create</Box>
      </Flex>

      {/* Modal para Crear Publicación */}
      <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.700" />

        <ModalContent bg={"black"} border={"1px solid gray"} color={"white"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              color={"white"}
              focusBorderColor="whiteAlpha.400"
            />

            {/* Entrada del archivo */}
            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
                color: "white",
              }}
              size={18}
            />

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image
                  src={selectedFile}
                  alt="Selected img"
                  maxH={"300px"}
                  objectFit={"contain"}
                  borderRadius={4}
                />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  color={"white"}
                  bg={"blackAlpha.700"}
                  _hover={{ bg: "blackAlpha.900" }}
                  onClick={() => setSelectedFile(null)}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="blue"
              onClick={handlePostCreation}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;