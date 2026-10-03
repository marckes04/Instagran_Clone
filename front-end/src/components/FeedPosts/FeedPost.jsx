import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";
import useGetProfileById from "../hooks/useGetProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetProfileById(post?.createdBy);

  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed Post"} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} username={userProfile?.username} />
    </>
  );
};

export default FeedPost;