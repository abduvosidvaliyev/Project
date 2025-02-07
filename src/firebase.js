import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB17AEtvyPX9_sXfpUHQqwsvubwculUUUI",
    authDomain: "project-4aace.firebaseapp.com",
    databaseURL: "https://project-4aace-default-rtdb.firebaseio.com",
    projectId: "project-4aace",
    storageBucket: "project-4aace.appspot.com", 
    messagingSenderId: "285116346841",
    appId: "1:285116346841:web:4e28be193d28cd461f29c8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };  
