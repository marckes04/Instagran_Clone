import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  // Fix: Show spinner only while Firebase is checking auth state
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* Sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* Navbar on top (for non-authenticated pages) */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* Main content on the right */}
      <Box
        flex={1}
        w={{
          base: canRenderSidebar ? "calc(100% - 70px)" : "full",
          md: canRenderSidebar ? "calc(100% - 240px)" : "full",
        }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  );
};