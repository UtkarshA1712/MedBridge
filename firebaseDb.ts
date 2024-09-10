import { ref, set, get, onValue } from "firebase/database";
import { db } from "./firebaseConfig";

export const addUser = (userId: string, name: string, email: string) => {
  return set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
};

export const fetchUser = async (userId: string) => {
  const userRef = ref(db, 'users/' + userId);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export const listenToUser = (userId: string, callback: (data: any) => void) => {
  const userRef = ref(db, 'users/' + userId);
  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};
