import React,{ useState } from 'react'
import { Button, Card } from "react-bootstrap"
import { usePhotoContext } from '../contexts/PhotoContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsUp,
    faThumbsDown,
  } from "@fortawesome/free-solid-svg-icons";

const PhotoCard = ({ photo, review = null }) => {
    const [greenThumb, setGreenThumb] = useState(null)
    const [redThumb, setRedThumb] = useState(null)
    const { chosenPhotos, setChosenPhotos, notChosenPhotos, setNotChosenPhotos } = usePhotoContext()


    const handlePhoto = (e) => {
        e.stopPropagation()
        if(!chosenPhotos.includes(photo)) {
            setChosenPhotos(prev => [...prev, photo])
        } else { 
            setChosenPhotos(prev => prev.filter(current => current !== photo))
        }
    }

    const thumbUp = (e) => {
        e.stopPropagation()
        if(greenThumb) return
        setRedThumb(false)
        setGreenThumb(!greenThumb)

        if (!chosenPhotos.includes(photo)) {
            setNotChosenPhotos(prev => prev.filter(currPhoto => photo.id !== currPhoto.id))
            setChosenPhotos(prev => [...prev, photo])
          }
    }

    const thumbDown = (e) => {
        e.stopPropagation()
        if(redThumb) return
        setGreenThumb(false)
        setRedThumb(!redThumb)

        if (!notChosenPhotos.includes(photo)) {
            setChosenPhotos(prev => prev.filter(currPhoto => photo.id !== currPhoto.id))
            setNotChosenPhotos(prev => [...prev, photo])
          }
    }

    return (
        <div>
        {!review && 
            <div>
                <input onClick={handlePhoto} type="checkbox" /> 
            </div>
        } 
            <Card className="photo-card">
                <Card.Header>
                    <p className="photo-name" title={photo.name}>
                        {photo.name}
                    </p>
                </Card.Header>

                <a href={photo.url}>
                    <Card.Img variant="top" src={photo.url} title={photo._id} />
                </a>
                {review && 
                <Card.Footer className="thumbs">
                    <Button onClick={(e) => thumbUp(e)} className={`${greenThumb ? "green" : ""}`}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </Button>
                    <Button onClick={(e) => thumbDown(e)} className={`${redThumb ? "red" : ""}`}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </Button>
                </Card.Footer>}
            </Card>
        </div>
    )
}

export default PhotoCard