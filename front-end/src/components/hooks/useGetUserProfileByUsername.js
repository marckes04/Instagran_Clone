import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useUserProfileStore from "../../Store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      console.log("--> 1. Buscando en Firestore perfil con username:", username);

      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.warn("--> 2. NO se encontró ningún usuario con el username:", username);
          setUserProfile(null);
          return;
        }

        let userDoc = null;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        console.log("--> 2. ¡Usuario encontrado con éxito!:", userDoc);
        setUserProfile(userDoc);
      } catch (error) {
        console.error("Error al consultar perfil:", error.message);
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      getUserProfile();
    } else {
      setIsLoading(false);
    }
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;