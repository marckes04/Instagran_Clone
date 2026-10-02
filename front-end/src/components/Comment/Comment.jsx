import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo"; // Ajusta la ruta a donde guardaste la función

const Comment = ({ createdAt, username, profilePic, text, comment }) => {
  // Soporta tanto props directas como si se pasa un objeto comment={...}
  const userProfilePic = profilePic || comment?.profilePicURL;
  const user = username || comment?.username;
  const commentText = text || comment?.comment;
  const rawTime = createdAt || comment?.createdAt;

  return (
    <Flex gap={4}>
      <Avatar src={userProfilePic} size={"sm"} />
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={12} color={"white"}>
            {user}
          </Text>
          <Text fontSize={14} color={"whiteAlpha.900"}>
            {commentText}
          </Text>
        </Flex>

        {/* AQUÍ se formatea la fecha y hora */}
        <Text fontSize={12} color={"gray"}>
          {typeof rawTime === "number" ? timeAgo(rawTime) : rawTime}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;