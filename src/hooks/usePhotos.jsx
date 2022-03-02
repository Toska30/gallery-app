import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from "../firebase"
import { collection, where, query, orderBy } from '@firebase/firestore'

const usePhotos = (album) => {
    const ref = collection(db, "photos");
    const queryRef = query(ref, where("albums" , "array-contains" , album), orderBy("created", "desc"))
    const photosQuery = useFirestoreQueryData(["photos", album], queryRef, {
        idField: "id",
        subscribe: true,
    }, {
        refetchOnMount: "always"
    })

    return photosQuery
}

export default usePhotos