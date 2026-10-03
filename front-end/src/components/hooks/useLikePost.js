import { useState, useEffect } from "react";
import useAuthStore from "../../Store/authStore";
import useShowToast from "./useShowToast";
import usePostStore from "../../Store/postStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(authUser?.uid) || false);
  const showToast = useShowToast();
  const likePostStore = usePostStore((state) => state.likePost);

  // Sincroniza el estado si el post cambia o termina de cargar desde Firestore
  useEffect(() => {
    setLikes(post?.likes?.length || 0);
    setIsLiked(post?.likes?.includes(authUser?.uid) || false);
  }, [post?.likes, authUser?.uid]);

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) {
      return showToast("Error", "You must be logged in to like a post", "error");
    }

    setIsUpdating(true);

    // Actualización optimista de la interfaz
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    try {
      const postRef = doc(firestore, "posts", post.id);

      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      // Actualiza el store global
      likePostStore(post.id, authUser.uid);
    } catch (error) {
      // Revertir estado local en caso de fallo en la red o permisos
      setIsLiked(isLiked);
      setLikes(likes);
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;