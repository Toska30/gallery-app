import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";


const useUploadImage = () => {
	const { currentUser } = useAuthContext();
	const [error, setError] = useState(null);
	const [isError, setIsError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [progress, setProgress] = useState(null);
	const [isMutating, setIsMutating] = useState(null);
	const params = useParams();
	const albumId = params.id;

	const mutate = async (img) => {
	
		setError(null);
		setIsError(null);
		setIsSuccess(null);
		setIsMutating(true);

		
		if (!img instanceof File) {
			setError("That is no file");
			setIsError(true);
			setIsMutating(false);
			return;
		}
		//create uuid for file
		const uuid = uuidv4();
		// find mimetype
		const ext = img.name.substring(img.name.lastIndexOf(".") + 1);

		// ref to full path in storage
		const fileRef = ref(storage, `images/${uuid}.${ext}`);

		try {
			// create a reference for uploading
			const storageRef = ref(storage, fileRef);

			// start upload of image
			const uploadTask = uploadBytesResumable(storageRef, img);

			// attach upload observer
			uploadTask.on("state_changed", (uploadTaskSnapshot) => {
				// update progress
				setProgress(
					Math.round(
						(uploadTaskSnapshot.bytesTransferred /
							uploadTaskSnapshot.totalBytes) *
							1000
					) / 10
				);
			});

			// wait for upload 
			await uploadTask.then();

			// get download url 
			const url = await getDownloadURL(storageRef);

			// create reference to db-collection images
			const collectionRef = collection(db, "images");

			// create document in db for the uploaded image
			await addDoc(collectionRef, {
				name: img.name,
				path: fileRef.fullPath,
				size: img.size,
				type: img.type,
				timestamp: serverTimestamp(),
				album: [albumId],
				add: false,
				owner: currentUser.uid,
				ext,
				url,
				uuid,
			});

			setProgress(null);
			setIsSuccess(true);
			setIsMutating(false);
		} catch (e) {
			console.log("error: ", e);

			setError(e.message);
			setIsError(true);
			setIsMutating(false);
			setIsSuccess(false);
		}
	};

	return {
		error,
		isError,
		isMutating,
		isSuccess,
		mutate,
		progress,
	};
};

export default useUploadImage;
