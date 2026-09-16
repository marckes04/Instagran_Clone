import { Avatar, Button, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import useAuthStore from '../../Store/authStore';

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) {
    return (
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Flex alignItems="center" gap={2}>
          <SkeletonCircle size="10" />
          <Skeleton height="10px" width="80px" />
        </Flex>
        <Skeleton height="15px" width="50px" />
      </Flex>
    );
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full">
      <Flex alignItems="center" gap={2}>
        <Link to={`/${authUser?.username || ""}`}>
          <Avatar
            name={authUser?.fullName || authUser?.username || "User"}
            size="md"
            src={authUser?.profilePicURL || ""}
          />
        </Link>
        <Link to={`/${authUser?.username || ""}`}>
          <Text fontSize={12} fontWeight="bold">
            {authUser?.username || "Guest"}
          </Text>
        </Link>
      </Flex>
      <Button
        size="xs"
        background="transparent"
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight="medium"
        color="blue.400"
        onClick={handleLogout}
        isLoading={isLoggingOut}
        cursor="pointer"
      >
        Log out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;