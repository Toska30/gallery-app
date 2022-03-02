import React from 'react'
import { useNavigate } from 'react-router'
import useAlbums from '../hooks/useAlbums'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"

const AlbumsGrid = () => {
    const navigate = useNavigate()
    const albums = useAlbums()

    return (
        <div className="albums">
            {albums.data && albums.data.map((album, index) => (
                <div  key={index}>
                    <FontAwesomeIcon onClick={() => { navigate(`/albums/${album.id}`)}} className="album-icon" icon={faFolder} size="6x" color="white" />
                    <h1>{album.name}</h1>
                    {album.reviewedBy ? <span>Reviewed by: {album.reviewedBy}</span> : null}
                </div>
            ))}
        </div>
    )
}

export default AlbumsGrid