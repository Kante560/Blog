import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase"; // ✅ Make sure this is correct
import { doc, setDoc } from "firebase/firestore"; // ✅ For Firestore updates

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (user) {
      // ✅ Mark offline before logout
      await setDoc(doc(db, "users", user.uid), { online: false }, { merge: true });
    }
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);

        // ✅ Mark as online
        await setDoc(userRef, { online: true, email: currentUser.email }, { merge: true });

        const handleUnload = async () => {
          await setDoc(userRef, { online: false }, { merge: true });
        };

        // ✅ Handle tab close or refresh
        window.addEventListener("beforeunload", handleUnload);

        return () => {
          handleUnload();
          window.removeEventListener("beforeunload", handleUnload);
        };
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
