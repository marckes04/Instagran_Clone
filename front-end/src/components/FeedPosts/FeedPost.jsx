// FeedPost.jsx
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { Box, Image } from "@chakra-ui/react";

const FeedPost = ({ post }) => {
  return (
    <>
      {/* Übergib das vollständige post-Objekt */}
      <PostHeader post={post} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed Post"} />
      </Box>
      <PostFooter post={post} />
    </>
  );
};

export default FeedPost;