import { useEffect, useState } from "react";
import useAuthStore from "../../Store/authStore";
import useUserProfileStore from "../../Store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    if (!authUser) {
      showToast("Error", "Debes iniciar sesión para seguir usuarios", "error");
      return;
    }
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, "users", userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      if (isFollowing) {
        // Unfollow
        const updatedAuthUser = {
          ...authUser,
          following: authUser.following.filter((uid) => uid !== userId),
        };
        setAuthUser(updatedAuthUser);
        localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== authUser.uid),
          });
        }

        setIsFollowing(false);
      } else {
        // Follow
        const updatedAuthUser = {
          ...authUser,
          following: [...authUser.following, userId],
        };
        setAuthUser(updatedAuthUser);
        localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        }

        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser && userId) {
      const isUserFollowing = authUser.following?.includes(userId);
      setIsFollowing(isUserFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;