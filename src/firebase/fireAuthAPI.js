import { useEffect, useState } from "react";
import { firebaseDB } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const addNewUser = (user) => {
  return setDoc(doc(firebaseDB, "users", user.id), user);
};
export const getCurrentUser = (uid) => {
  return getDoc(doc(firebaseDB, "users", uid));
};
export const getUser = (uid) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getDoc(doc(firebaseDB, "users", uid))
      .then((doc) => setUser(doc.data()))
      .catch((err) => console.log(err));
  }, []);
  return user;
};
