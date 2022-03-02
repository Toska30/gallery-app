import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useUploadPhoto = (id) => {
  const { currentUser } = useAuthContext()
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [progress, setProgress] = useState(null)

  const uploadPhoto = async (photo) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsUploading(null)

    if (!photo instanceof File) {
        setError("File is no good")
        setIsError(true)
        setIsUploading(false)
        return
    }

    const fileName = `${Date.now()}-${photo.name}`

    const storageFullPath = `photos/${currentUser.uid}/${fileName}`

    try {
        const storageRef = ref(storage, storageFullPath)
        const upload = uploadBytesResumable(storageRef, photo)

        upload.on('state_changed', (uploadTaskSnapshot) => {
            setProgress(
                Math.round((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 1000) / 10
            )
        })

        await upload.then()

        const url = await getDownloadURL(storageRef)
        const collectionRef = collection(db, "photos")

        await addDoc(collectionRef , {
            created: serverTimestamp(),
            name: photo.name,
            owner: currentUser.uid,
            path: storageRef.fullPath,
            size: photo.size,
            type: photo.type,
            albums: [id],
            url
        })

        setProgress(null)
        setIsSuccess(true)
        setIsUploading(false)

    } catch (e) {

        setError(e.message)
        setIsError(true)
        setIsSuccess(false)
        setIsUploading(false)
    }
  }


  return {
    error,
    isError,
    isUploading,
    isSuccess,
    progress,
    uploadPhoto
  }
}

export default useUploadPhoto