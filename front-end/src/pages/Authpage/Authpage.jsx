import { Box, Container, Flex, VStack, Image } from "@chakra-ui/react"; // Quité Center de aquí si no lo usas como etiqueta
import AuthForm from "../../components/AuthForm/AuthForm";

const Authpage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex gap={10} justifyContent={"center"} alignItems={"center"}>
          
          {/* Lado izquierdo (Imagen) */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone img" />
          </Box>

          {/* Lado derecho (Formulario) */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />

            {/* ✅ CORREGIDO: "center" como string */}
            <Box textAlign={"center"}>Get the app.</Box>
            
            <Flex gap={5} justifyContent={"center"}>
              <Image src='/playstore.png' h={10} alt='Play Store logo' />
              <Image src='/microsoft.png' h={10} alt='Microsoft logo' />
            </Flex>
          </VStack>

        </Flex>
      </Container>
    </Flex>
  );
};

export default Authpage;