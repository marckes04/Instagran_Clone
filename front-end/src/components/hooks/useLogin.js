import { useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../Store/authStore";
import useShowToast from "./useShowToast";

const useLogin = () => {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Por favor completa todos los campos", "error");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email.trim(),
        inputs.password
      );

      if (!userCred) {
        showToast("Error", "Correo o contraseña incorrectos", "error");
        return;
      }

      const docRef = doc(firestore, "users", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      let userData;

      if (docSnap.exists()) {
        userData = docSnap.data();
      } else {
        const fallbackUsername = inputs.email.split("@")[0].toLowerCase();
        userData = {
          uid: userCred.user.uid,
          email: inputs.email.trim().toLowerCase(),
          username: fallbackUsername,
          fullName: fallbackUsername,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(docRef, userData);
      }

      localStorage.setItem("user-info", JSON.stringify(userData));
      loginUser(userData);
      navigate(`/${userData.username}`);
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;