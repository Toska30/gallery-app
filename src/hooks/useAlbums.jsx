import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, where, query, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useAlbums = () => {
  const { currentUser } = useAuthContext()

  const queryRef = query((collection(db, 'albums')), where(`owner`, '==', currentUser.uid), orderBy('created', 'desc'))
  const albumsQuery = useFirestoreQueryData(['albums', currentUser.uid], queryRef, {
    idField: 'id',
    subscribe: true,
  }, {
    refetchOnMount: 'always'
  })

  return albumsQuery
}

export default useAlbums