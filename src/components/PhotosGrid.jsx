import React from 'react'
import PhotoCard from './PhotoCard'
import { SRLWrapper } from "simple-react-lightbox"
import Masonry from 'react-masonry-css'

const masonryBreakpoints = {
	default: 6,
	576: 2,
	768: 3,
	992: 4,
}

const PhotosGrid = ({ query, review }) => {

    return (
        <SRLWrapper>
            <Masonry
            	breakpointCols={masonryBreakpoints}
				className="photos-masonry"
				columnClassName="photos-masonry-column"
            >
                {query.data && query.data.map( (photo, index) => (
                    <PhotoCard key={index} photo={photo} review={review} />
                )) }
            </Masonry>
        </SRLWrapper>
    )
}

export default PhotosGrid