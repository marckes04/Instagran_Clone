import { Avatar, Box, Flex, Link, Tooltip, Button } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai"; 
import { BiLogOut } from "react-icons/bi"; // Importamos el icono de Logout
import { 
  CreatePostLogo, 
  InstagramLogo, 
  InstagramMobileLogo, 
  SearchLogo, 
  NotificationsLogo 
} from '../assets/contants';

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: AiFillHome,
      text: "Home",
      link: "/",
    },
    {
      icon: SearchLogo,
      text: "Search",
    },
    {
      icon: NotificationsLogo,
      text: "Notifications",
    },
    {
      icon: CreatePostLogo,
      text: "Create",
    },
    {
      icon: null,
      text: "Profile",
      link: "/asaprogrammer",
    },
  ];

  const handleLogout = () => {
    // Aquí irá tu lógica de Firebase/Auth más adelante
    console.log("Logging out...");
  };

  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w="full" height={"full"}>
        {/* Logos */}
        <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor="pointer">
          <InstagramLogo />
        </Link>
        <Link 
          to={"/"} as={RouterLink} p={2} display={{ base: "block", md: "none" }} 
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={10}
          cursor="pointer"
        >
          <InstagramMobileLogo />
        </Link>

        {/* Items del Menú */}
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          {sidebarItems.map((item, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={item.text}
              placement='right'
              ml={1}
              openDelay={500}
              display={{ base: 'block', md: 'none' }}
            >
              <Link
                display={"flex"}
                to={item.link || "#"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {item.text === "Profile" ? (
                  <Avatar size={"sm"} name='Mario Martinez' src='/profilepic.png' />
                ) : (
                  <item.icon size={25} />
                )}
                <Box display={{ base: "none", md: "block" }}>
                  {item.text}
                </Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        {/* --- BOTÓN DE LOGOUT --- */}
        {/* mt="auto" empuja este elemento hacia la parte inferior del Flex */}
        <Tooltip
          hasArrow
          label={"Logout"}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: 'block', md: 'none' }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"} 
            justifyContent={{ base: "center", md: "flex-start" }}
            cursor={"pointer"}
          >
            <BiLogOut size={25} />
            <Box display={{ base: "none", md: "block" }}>
              Logout
            </Box>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;