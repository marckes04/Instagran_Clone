import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../hooks/useShowToast";
import useAuthStore from "../../Store/authStore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (newUser) {
        const userRef = doc(firestore, "users", newUser.user.uid);
        const userSnap = await getDoc(userRef);

        let userData;

        if (userSnap.exists()) {
          // Existing user login: read saved profile data
          userData = userSnap.data();
        } else {
          // New user registration: generate document and save once
          const fallbackUsername = newUser.user.email.split("@")[0].toLowerCase();

          userData = {
            uid: newUser.user.uid,
            email: newUser.user.email.toLowerCase(),
            username: fallbackUsername,
            fullName: newUser.user.displayName || fallbackUsername,
            bio: "",
            profilePicURL: newUser.user.photoURL || "",
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
          };

          await setDoc(userRef, userData);
        }

        // Common post-auth sync
        localStorage.setItem("user-info", JSON.stringify(userData));
        loginUser(userData);
        navigate(`/${userData.username}`);
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={5} alt="Google logo" />
      <Text mx="2" color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;