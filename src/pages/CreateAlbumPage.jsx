import React from "react";
import { Container } from "react-bootstrap";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, where, query } from "firebase/firestore";
import ImageGrid from "../components/ImageGrid";
import { useAuthContext } from "../contexts/AuthContext";
import CreateAlbum from "../components/CreateAlbum";


const CreateAlbumPage = () => {
  const { currentUser } = useAuthContext();

  //create ref to images
  const imageReference = query(
    collection(db, "images"),
    where("add", "==", true),
    where("owner", "==", currentUser.uid)
  );

  const imageQuery = useFirestoreQueryData(
    ["images"],
    imageReference,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return (
    <Container>
      <CreateAlbum chooseImages={true} images={imageQuery.data}></CreateAlbum>

      <ImageGrid query={imageQuery.data} />
    </Container>
  );
};

export default CreateAlbumPage;
