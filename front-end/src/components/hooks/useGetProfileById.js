import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const useGetProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);

      // Si no hay userId, evitamos peticiones innecesarias
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const userSnap = await getDoc(doc(firestore, "users", userId));
        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [showToast, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetProfileById;