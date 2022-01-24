import React from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {collection,where,query,addDoc,serverTimestamp} from "firebase/firestore";
import useAlbum from "../hooks/useAlbum";

const Review = () => {
  const buildAlbum = useAlbum();
  const params = useParams();
  const albumId = params.id;
  const userId = params.user;

  const ImgReviewRef = query(
    collection(db, "images"),
    where("album", "array-contains", albumId),
    where("add", "==", true)
  );
  const imageQuery = useFirestoreQueryData(
    ["images"],
    ImgReviewRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  const images = imageQuery.data;
  const createAlbum = async () => {
    try {
      await addDoc(collection(db, "albums"), {
        title: "reviewed",
        timestamp: serverTimestamp(),
        owner: userId,
      }).then(function (docRef) {
         //skapa album utifrån bilder
        const newAlbum = docRef.id;
      
        if (imageQuery) {
          for (var i = 0; i < images.length; i++) {
            buildAlbum.addAlbum(images[i], newAlbum);
          }
        }
      });
    } catch (e) {
      console.error("Smth went wrong ", e);
      return;
    }
  };

  
  return (
    <>
      <Button onClick={createAlbum}>Send review</Button>
      <h1>Reviews done</h1>
    </>
  );
};

export default Review;
