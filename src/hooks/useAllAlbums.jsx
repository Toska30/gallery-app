import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";

const useAllAlbums = () => {
  const { currentUser } = useAuthContext();

  const queryRef = query(
    collection(db, "albums"),
    where("owner", "==", currentUser.uid),
    orderBy("timestamp")
  );

  const { data, isLoading } = useFirestoreQueryData(
    ["albums", currentUser.uid],
    queryRef,
    { idField: "id", subscribe: true },
    { refetchOnMount: "always" }
  );

  return { data, isLoading };
};

export default useAllAlbums;