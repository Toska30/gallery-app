import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import PhotosGrid from '../components/PhotosGrid'
import usePhotos from '../hooks/usePhotos'
import UploadPhotos from "../components/UploadPhotos"
import useAlbum from "../hooks/useAlbum"
import { Button } from "react-bootstrap"
import useUpdateAlbum from '../hooks/useUpdateAlbum'
import CreateAlbum from '../components/CreateAlbum'

const Album = () => {
    const { id } = useParams()
    const albumNameRef = useRef()
    const photos = usePhotos(id)
    const album = useAlbum(id)
    const updateAlbum = useUpdateAlbum()
    const [change, setChange] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setChange(!change)
    }

    const handleChangeName = (e) => {
        e.preventDefault()

        if(!albumNameRef.current.value) return
        updateAlbum.newAlbumName(albumNameRef.current.value, album.data.id)
        setChange(!change)
    }

    return (
        <div className="albumbg">  
        <div>
            {!change ? <div className="album-name">
                            {album.data && <h1>{ album.data.name }</h1>}
                            <Button onClick={handleClick}>Change album name</Button>
                        </div>
            :  <div className="album-name-change">
                    <form onSubmit={handleChangeName}>
                        <p>Enter new album name</p> 
                        <input ref={albumNameRef} placeholder={album.data && album.data.name} />
                        <Button type="submit" style={{marginLeft: "1rem"}}>Submit</Button>
                    </form>
                    <Button variant="danger" style={{height: "50%", margin: "auto 0 0 1rem"}} onClick={handleClick}>X</Button>
                </div>}
            {album.data && 
                <div>
                    <h1 className="review-link" onClick={() => navigate(`/review/${album.data.owner}/${album.data.id}`)}>Review link</h1>
                </div>}
            <UploadPhotos id={id} />
            {photos && <PhotosGrid query={photos} />}
            <CreateAlbum title="Create new album from selected photos" album={album.data} />
        </div>
        </div>
    )
}

export default Album