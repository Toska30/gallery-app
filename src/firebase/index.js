import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD8iByzvdwYePIFs2TeiM1NfkbK9hqDztc",
	authDomain: "foto-app-blerta.firebaseapp.com",
	databaseURL: "https://foto-app-blerta-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "foto-app-blerta",
	storageBucket: "foto-app-blerta.appspot.com",
	messagingSenderId: "632459903757",
	appId: "1:632459903757:web:6a648c4b50d44d0e57e644"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage(app);

export { app as default, auth, db, storage };
