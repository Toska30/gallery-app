import React from "react";
import { db } from "../firebase";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {collection,where,query} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import ImageGrid from "../components/ImageGrid";


const Preview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.user;
  const albumId = params.id;
  

  //get the images
  const imageReference = query(
    collection(db, "images"),
    where("album", "array-contains", albumId)
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

  const handdleSubmit = (e) => {
    e.preventDefault();
    navigate(`/review-done/${albumId}/${userId}`);
  };
  return (
    <>
      <h1>Review</h1>
      <Form onSubmit={handdleSubmit}>
        <ImageGrid review={true} query={imageQuery.data} />

        <Button type="submit" className="mt-3">
          Send review
        </Button>
      </Form>
    </>
  );
};

export default Preview;
