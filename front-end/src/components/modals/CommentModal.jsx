import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import Comment from "../Comment/Comment";
import usePostComment from "../hooks/usePostComment";

const CommentModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentRef.current.value.trim()) return;
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader color={"white"}>Comments</ModalHeader>
        <ModalCloseButton color={"white"} />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
          >
            {post?.comments?.map((comment, idx) => (
              <Comment key={comment.id || idx} comment={comment} />
            ))}
          </Flex>

          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input
              placeholder="Comment"
              size={"sm"}
              ref={commentRef}
              color={"white"}
            />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;