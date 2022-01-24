import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const useAlbum = (img) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  // controll if the selected album is added to album
  const inspectImage = async () => {
    setIsMutating(true);
    try {
      // get reference of image in db
      const dbRef = doc(db, "images", img._id);
      // update it
      await updateDoc(dbRef, { add: true });
    } catch (e) {
      setIsError(true);
      setError(e);
      setIsMutating(false);
      console.log("error: ", e);
    }
  };

  const unInspectImage = async () => {
    setIsMutating(true);
    try {
     
      const dbRef = doc(db, "images", img._id);
      await updateDoc(dbRef, { add: false });
    } catch (e) {
      setIsError(true);
      setError(e);
      setIsMutating(false);
    }
  };

  const addAlbum = async (img, newAlbum) => {
    setIsMutating(true);
    const dbRef = doc(db, "images", img._id);// get reference of image in db
  // get reference of image in db
    await updateDoc(dbRef, { album: arrayUnion(`${newAlbum}`) });
    await updateDoc(dbRef, { add: false });
  };

  return {
    error,
    isError,
    isMutating,
    addAlbum,
    inspectImage,
    unInspectImage,
  };
};

export default useAlbum;
