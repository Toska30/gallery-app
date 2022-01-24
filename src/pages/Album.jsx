import React, { useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

import ImageGrid from "../components/ImageGrid";
import useUploadImage from "../hooks/useUploadImage";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import "../App.scss"

const Album = () => {
  const upload = useUploadImage();
  const [buildLink, setBuildLink] = useState("");
  const { currentUser } = useAuthContext();
  const params = useParams();
  const albumId = params.id;

  //get images in album from db
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

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }
    for (var i = 0; i < acceptedFiles.length; i++) {
      upload.mutate(acceptedFiles[i]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: " image/jpeg, image/png, image/jpg",
    maxFiles: 20,
    onDrop,
  });

  //create link using window.location.href to get the url
  const generateLink = () => {
    const nav = window.location.href + `/review/${currentUser.uid}`;
    setBuildLink(nav);
  };

  return (
    <Container>
      <div className="neat">
        <h1>Upload your images </h1>

        <div
          {...getRootProps()}
          id="dropzone-wrapper"
          className={`${isDragAccept ? "drag-accept" : ""}${
            isDragReject ? "drag-reject" : ""
          }`}
        >
          <input {...getInputProps()} />

          <div className="indicator">
          <div className="fasize"><FaCloudUploadAlt/></div>
          
            {isDragActive ? (
              isDragAccept ? (
                <p>Acceped 🥳</p>
              ) : (
                <p>Not accepted 😕</p>
              )
            ) : (
              <p>Drop your images here</p>
              
            )}
            
          </div>

          {upload.progress !== null && (
            <ProgressBar variant="success" animated now={upload.progress} />
          )}

          {upload.isError && <Alert variant="warning">{upload.error}</Alert>}
          {upload.isSuccess && <Alert variant="success">Nice!</Alert>}
        </div>
      

      <h2>Create new album with selected images</h2>
      <Col>
        <Row xs={1} md={2} className="py-4">
          <div>
            <Link to="/create-album">
              <Button>Create Album with selected images</Button>
            </Link>
          </div>
          <div>
            <Button onClick={generateLink}>Create link</Button>
            {buildLink && (
              <Card className="link-div">
                <Card.Text className="daku">{buildLink}</Card.Text>
              </Card>
            )}
          </div>
        </Row>
      </Col>
      <ImageGrid query={imageQuery.data} />
      </div>
    </Container>
    
  );
};

export default Album;
