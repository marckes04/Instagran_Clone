import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import useGetProfileById from "../hooks/useGetProfileById";
import { Link } from "react-router-dom";

const Comment = ({ createdAt, username, profilePic, text, comment }) => {
  // Busca el perfil solo si existe comment.createdBy
  const { userProfile, isLoading } = useGetProfileById(comment?.createdBy);

  if (isLoading) return <CommentSkeleton />;

  // Soporta tanto las props directas (como en el caption del post) como las del objeto comment
  const userProfilePic = profilePic || userProfile?.profilePicURL;
  const user = username || userProfile?.username;
  const commentText = text || comment?.comment;
  const rawTime = createdAt || comment?.createdAt;

  return (
    <Flex gap={4} alignItems={"center"}>
      <Link to={`/${user}`}>
        <Avatar src={userProfilePic} size={"sm"} name={user} />
      </Link>

      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link to={`/${user}`}>
            <Text fontWeight={"bold"} fontSize={12} color={"white"}>
              {user}
            </Text>
          </Link>
          <Text fontSize={14} color={"whiteAlpha.900"}>
            {commentText}
          </Text>
        </Flex>

        <Text fontSize={12} color={"gray"}>
          {typeof rawTime === "number" ? timeAgo(rawTime) : rawTime}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={8} w={8} />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};