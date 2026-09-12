import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const signup = async (inputs) => {
    // 1. Validate empty fields
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    // 2. Prevent duplicate usernames
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      // 3. Create authentication user
      const newUser = await createUserWithEmailAndPassword(
        inputs.email.trim(),
        inputs.password
      );

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // 4. Save user document in Firestore
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email.trim().toLowerCase(),
          username: inputs.username.trim().toLowerCase(),
          fullName: inputs.fullName.trim(),
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        showToast("Success", "Account created successfully", "success");
      }
    } catch (err) {
      showToast("Error", err.message || "An unexpected error occurred", "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;