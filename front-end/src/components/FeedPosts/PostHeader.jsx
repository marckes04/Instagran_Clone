import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetUserProfileById from "../hooks/useGetProfileById";
import { timeAgo } from "../../utils/timeAgo";
import useFollowUser from "../hooks/useFollowUser";

const PostHeader = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileById(post?.createdBy);
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post?.createdBy);

  if (isLoading) {
    return (
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
          <SkeletonCircle size="10" />
          <Skeleton height="10px" width="100px" />
        </Flex>
        <Skeleton height="10px" width="50px" />
      </Flex>
    );
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar
            src={userProfile?.profilePicURL}
            name={userProfile?.username}
            alt="user profile pic"
            size={"sm"}
          />
        </Link>

        <Flex fontSize={12} fontWeight={"bold"} gap="2" alignItems={"center"}>
          <Link to={`/${userProfile?.username}`}>
            {userProfile?.username}
          </Link>
          <Box color={"gray.500"}>
            • {post?.createdAt ? timeAgo(post.createdAt) : ""}
          </Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;