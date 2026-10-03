import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/contants";
import usePostComment from "../hooks/usePostComment";
import useAuthStore from "../../Store/authStore";
import useLikePost from "../hooks/useLikePost";

const PostFooter = ({ post, username, isProfilePage }) => {
  const authUser = useAuthStore((state) => state.user);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { handleLikePost, isLiked,likes } = useLikePost(post);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      {/* Iconos de Like y Comentario */}
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>

      {/* Contador de Likes */}
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {/* Si NO es el modal del perfil (es el feed de inicio) muestra caption y total de comentarios */}
      {!isProfilePage && (
        <>
          <Text fontSize="sm" fontWeight={700}>
            {username}{" "}
            <Text as="span" fontWeight={400}>
              {post?.caption}
            </Text>
          </Text>

          {post?.comments?.length > 0 && (
            <Text fontSize="sm" color={"gray"} cursor={"pointer"}>
              View all {post.comments.length} comments
            </Text>
          )}
        </>
      )}

      {/* Input para agregar comentario */}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;