import {
  Flex,
  GridItem,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  Avatar,
  Divider,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useUserProfileStore from "../../Store/userProfileStore";
import useAuthStore from "../../Store/authStore";
import usePostStore from "../../Store/postStore";
import useShowToast from "../hooks/useShowToast";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import { firestore, storage } from "../../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      try {
        await deleteObject(imageRef);
      } catch (storageError) {
        console.warn("Storage deletion error or file not found:", storageError);
      }

      const userRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      await deleteDoc(doc(firestore, "posts", post.id));

      deletePost(post.id);
      if (decrementPostCount) decrementPostCount(post.id);

      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease-in-out"}
          zIndex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.likes?.length || 0}
              </Text>
            </Flex>

            <Flex alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post?.comments?.length || 0}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={post?.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post?.imageURL} alt="profile post" />
              </Flex>

              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile?.profilePicURL}
                      size={"sm"}
                      name={userProfile?.username}
                    />
                    <Text fontWeight={"bold"} fontSize={12} color={"white"}>
                      {userProfile?.username}
                    </Text>
                  </Flex>

                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor="pointer" />
                    </Button>
                  )}
                </Flex>

                <Divider my={4} bg={"gray.500"} />

                <VStack w="full" alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  
                  {post?.caption && (
                    <caption
                      createdAt={post.createdAt}
                      username={userProfile?.username}
                      profilePic={userProfile?.profilePicURL}
                      text={post.caption}
                    />
                  )}

                  {/* Corregido: etiqueta con C mayúscula y key segura */}
                  {post?.comments?.map((comment, index) => (
                    <Comment key={comment.id || index} comment={comment} />
                  ))}
                </VStack>

                <Divider my={4} bg={"gray.800"} />

                <PostFooter isProfilePage={true} post={post} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;