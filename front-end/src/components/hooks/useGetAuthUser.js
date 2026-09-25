import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../Store/authStore";

const useGetAuthUser = () => {
  const [firebaseUser, authLoading, error] = useAuthState(auth);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const loginUser = useAuthStore((state) => state.login);
  const logoutUser = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const syncUser = async () => {
      // 1. If Firebase says user is logged in
      if (firebaseUser) {
        // If Zustand already has user-info loaded from localStorage, no need to re-fetch
        if (authUser) return;

        setIsFetchingProfile(true);
        try {
          const docRef = doc(firestore, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            localStorage.setItem("user-info", JSON.stringify(userData));
            loginUser(userData);
          } else {
            console.error("Firestore user document does not exist for UID:", firebaseUser.uid);
          }
        } catch (err) {
          console.error("Error fetching user profile from Firestore:", err);
        } finally {
          setIsFetchingProfile(false);
        }
      } 
      // 2. If Firebase has finished checking and no user is signed in
      else if (!authLoading) {
        localStorage.removeItem("user-info");
        logoutUser();
      }
    };

    syncUser();
  }, [firebaseUser, authLoading]);

  // The overall loading state is true if Firebase is checking or Firestore is fetching
  const loading = authLoading || isFetchingProfile;

  return { authUser, loading, error };
};

export default useGetAuthUser;