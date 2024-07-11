import {initializeApp} from "firebase/app";
// import "firebase/database";
import {getStorage} from "firebase/storage"

let firebaseConfig = {
    apiKey: "AIzaSyDzvafmusj4xfW4p4Zzbpgg0ZjEx9QEZms",
    authDomain: "blog-web-01.firebaseapp.com",
    projectId: "blog-web-01",
    storageBucket: "blog-web-01.appspot.com",
    messagingSenderId: "575119465269",
    appId: "1:575119465269:web:d89654ffdfb353eecd4a7c"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app as default};