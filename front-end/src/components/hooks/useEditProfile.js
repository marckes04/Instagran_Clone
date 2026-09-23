import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import useAuthStore from "../../Store/authStore";
import useUserProfileStore from "../../Store/userProfileStore";
import useShowToast from "./useShowToast";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const userDocRef = doc(firestore, "users", authUser.uid);
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);

    try {
      let URL = authUser.profilePicURL || "";

      // Si el usuario seleccionó una imagen nueva, se sube a Firebase Storage
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(storageRef);
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio !== undefined ? inputs.bio : authUser.bio,
        profilePicURL: URL,
      };

      await updateDoc(userDocRef, updatedUser);

      // Sincronizar Zustand stores y localStorage
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);

      showToast("Éxito", "Succesfully Updated Profile!!!", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;