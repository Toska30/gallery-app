import React from 'react'
import AlbumsGrid from '../components/AlbumsGrid'
import CreateAlbum from '../components/CreateAlbum'

const Albums = () => {

    return (
 
        <div className="albumbg">  
        <div>
            <CreateAlbum title="Create new album" />
            <AlbumsGrid />
        </div>
       </div>
        
    )
}

export default Albums