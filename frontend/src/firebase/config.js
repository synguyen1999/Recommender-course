
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_SENDERID,
//     appId: process.env.REACT_APP_APPID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyAe8QqMVeew7vSnb1r_h82wL7cHsy5XCN0",
    authDomain: "college-management-68812.firebaseapp.com",
    projectId: "college-management-68812",
    storageBucket: "college-management-68812.appspot.com",
    messagingSenderId: "652230940869",
    appId: "1:652230940869:web:1f9d3ba1f1d4dcf1ab38ac",
    measurementId: "G-8GQYN9YRDX"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);