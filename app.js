// Import Firebase SDK (เวอร์ชั่น v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ⚠️ นำค่าจากหน้า Firebase Console (จุดที่กด Register app) มาวางแทนที่ค่าจำลองด้านล่างนี้ครับ ⚠️
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "onlinealert-2d6e0.firebaseapp.com",
    projectId: "onlinealert-2d6e0",
    storageBucket: "onlinealert-2d6e0.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// เริ่มต้นใช้งาน Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ส่งออกโมดูลเพื่อให้ index.html และ admin.html ดึงไปใช้
export { 
    auth, 
    db, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy 
};
