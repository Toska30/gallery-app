import React, { useState } from "react";
import { SRLWrapper } from "simple-react-lightbox";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import useAlbum from "../hooks/useAlbum";
import "../App.scss"

const ImageView = ({ img, review }) => {
  const changeAlbum = useAlbum(img);
  const [ismarked, setIsmarked] = useState(false);

  //check if the pic is selected or not
  const handleOnChange = (img) => {
    setIsmarked(!ismarked);
    if (!ismarked) {
      changeAlbum.inspectImage(img);
    } else {
      changeAlbum.unInspectImage(img);
    }
  };
  const handleLike = async () => {
    try {
      const dbRef = doc(db, "images", img._id); 
      await updateDoc(dbRef, { add: true }); //update  album 
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleDislike = async () => {
    try {
      const dbRef = doc(db, "images", img._id);
      await updateDoc(dbRef, { add: false });
    } catch (e) {
      
    }
  };

  return (
    <SRLWrapper>
      <Card text="light" bg="dark" className="mt-5">
        <a href={img.url}>
          <Card.Img variant="top" src={img.url} />
        </a>
        <Card.Body>
          <Card.Title>{img.name}</Card.Title>
          {!review && (
            <Row>
              <Col>
                <Form.Check>
                  <Form.Check.Input
                    inline
                    type="checkbox"
                    isValid
                    checked={img.add}
                    onChange={handleOnChange}
                    value={img._id}
                  />
                  <Form.Check.Label className="labletext">Choose your images</Form.Check.Label>
                </Form.Check>
              </Col>
            </Row>
          )}
          {review && (
            <div key={`inline-radio`} className="m-3">
              <Form.Check
                type="radio"
                inline
                label="👍"
                name={img._id}
                onChange={handleLike}
                value={img._id}
                required
              />
              <Form.Check
                type="radio"
                inline
                label="👎"
                name={img._id}
                onChange={handleDislike}
                value={img._id}
                required
              />
            </div>
          )}
        </Card.Body>
      </Card>
    </SRLWrapper>
  );
};

export default ImageView;
