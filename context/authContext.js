import { useState, createContext, useContext, useEffect } from "react";
import Router from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//custom
import { auth } from "../firebase";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const data = useProvideAuth();
  return <authContext.Provider value={data}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  //shared app data
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          setUser({
            id: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
          });
          setStatus("authenticated");
        } else {
          setUser(null);
          Router.push("/welcome");
        }
      });
    } catch (error) {
      console.info("Auth Context: authstatechanged error: ");
    }
  }, []);

  const SignIn = async (credentials) => {
    setStatus("loading");
    const { email, password } = credentials;
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(error);
      if (errorCode === "auth/user-not-found") {
        setError("User not found");
      } else if (errorCode === "auth/wrong-password") {
        setError("Invalid user password");
      } else if (errorCode === "auth/invalid-email") {
        setError("Invalid email");
      } else {
        let err = `${errorCode} ${errorMessage}`;
        setError(err);
      }
      setUser(null);
      setStatus("unauthenticated");
    });
  };

  const Logout = async () => {
    setUser(null);
    setStatus("unauthenticated");
    await signOut(auth);
  };

  const EditUserProfile = () => {};

  return {
    user,
    status,
    error,
    SignIn,
    Logout,
    EditUserProfile,
  };
}
