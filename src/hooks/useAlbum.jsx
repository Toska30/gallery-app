import { useFirestoreDocument } from '@react-query-firebase/firestore'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'

const useAlbum = (albumId) => {
  const albumRef = doc(db, 'albums', albumId)
  const albumQuery = useFirestoreDocument(['album', albumId], albumRef, {
    subscribe: true,
  }, {
    refetchOnMount: 'always',
    select(snapshot) {
      const id = snapshot.id
      return snapshot.exists() ? {id, ...snapshot.data()} : null
    }
  })
  
  return albumQuery
}

export default useAlbum