import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import useAlbum from "../hooks/useAlbum";
import { useNavigate } from "react-router-dom";
import "../App.scss"

const CreateAlbum = (data) => {
  const { currentUser } = useAuthContext();
  const albumNameRef = useRef();
  const navigate = useNavigate();
  const buildAlbum = useAlbum();
  const images = data.images;
  const chooseImages = data.chooseImages;

  const handleClick = async (e) => {
    e.preventDefault();
    if (!albumNameRef.current.value.length) {
      return;
    }
    try {
      await addDoc(collection(db, "albums"), {
        title: albumNameRef.current.value,
        timestamp: serverTimestamp(),
        owner: currentUser.uid,
      }).then(function (docRef) {
        const newAlbum = docRef.id;

        //form an album based on images selected
        if (chooseImages) {
          for (var i = 0; i < images.length; i++) {
            buildAlbum.addAlbum(images[i], newAlbum);
          }
          navigate(`/album/${docRef.id}`); //the album in which it will be navigated
        }
      });
    } catch (e) {
      return;
    }
  };

  return (
    <div className="neat">
    <Container>
      <h3>Create a new album</h3>
      <Form onSubmit={handleClick}>
        <Form.Group className="mb-3" controlId="formGroupAlbumName">
          <Form.Label>Name the album</Form.Label>
          <Form.Control
            type="text"
            ref={albumNameRef}
            placeholder="Give a name to your album"
            required
          />
        </Form.Group>

        <Button type="submit">Create your new album</Button>
      </Form>
      
    </Container>
    </div>
  );
};

export default CreateAlbum;
