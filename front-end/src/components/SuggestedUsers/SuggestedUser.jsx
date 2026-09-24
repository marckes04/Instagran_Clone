import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../components/hooks/useFollowUser";
import useAuthStore from "../../Store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
  // Se usa user?.uid con fallback a "" para evitar el error si user llega undefined
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user?.uid || "");
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    if (!user) return;
    await handleFollowUser();
    if (setUser) {
      setUser({
        ...user,
        followers: isFollowing
          ? (user.followers || []).filter((uid) => uid !== authUser?.uid)
          : [...(user.followers || []), authUser?.uid],
      });
    }
  };

  // Si no hay datos de usuario válidos, no renderiza nada
  if (!user) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar
            src={user.profilePicURL || ""}
            size={"md"}
            name={user.fullName || user.username}
          />
        </Link>
        <VStack spacing={0} alignItems={"flex-start"}>
          <Link to={`/${user.username}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullName || user.username}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {user.followers?.length || 0} followers
          </Box>
        </VStack>
      </Flex>

      {authUser?.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={"transparent"}
          p={0}
          h={"max-content"}
          fontWeight={"medium"}
          color={"blue.400"}
          cursor={"pointer"}
          _hover={{ color: "white" }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;