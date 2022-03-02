import React, { useCallback } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadPhoto from '../hooks/useUploadPhoto'


const UploadPhotos = ({ id }) => {

    const { uploadPhoto, progress } = useUploadPhoto(id)

    const onDrop = useCallback(acceptedFiles => {
        console.log('got files', acceptedFiles)
    
        if (!acceptedFiles.length) return
    
        uploadPhoto(acceptedFiles[0])
      })

    const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/gif, image/jpeg, image/png, image/webp',
        onDrop
      })

    return (
        <div style={{margin: "2rem 0 2rem 0"}}>
            <div {...getRootProps()}
            id="dropzone-wrapper"
            className={`${isDragAccept ? "drag-accept" : ''} ${isDragReject ? "drag-reject" : ''}`}
            >
            <input {...getInputProps()} />
    
                {
                isDragActive
                ? (isDragAccept ? <p>Drop the photo!</p> : <p>This file is not acceptable</p>)
                : <p>Drop photos here</p>
                }
    
            {progress !== null && <ProgressBar variant="success" animated now={progress} />}
    
            </div>
        </div>
    )
}

export default UploadPhotos