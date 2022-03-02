import React, { useState } from "react"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useUpdateAlbum = () => {
  const [isUpdating, setIsUpdating] = useState(false)

 
  const newAlbumName = async (newName, id) => {
    setIsUpdating(true)

    try {
      const albumRef = doc(db, 'albums', id)
      await updateDoc(albumRef, { name: newName })
    } catch(error) {
      console.log(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    newAlbumName,
    isUpdating
  }
}

export default useUpdateAlbum