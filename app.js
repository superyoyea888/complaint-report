// Import Firebase SDK (เวอร์ชั่น v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ⚠️ นำค่าจากหน้า Firebase Console (จุดที่กด Register app) มาวางแทนที่ค่าจำลองด้านล่างนี้ครับ ⚠️
const firebaseConfig = {
   apiKey: "AIzaSyBi1LCzz4g6JoWbnXJR0ct3rs8k8YlPTVo",
  authDomain: "onlinealert-2d6e0.firebaseapp.com",
  projectId: "onlinealert-2d6e0",
  storageBucket: "onlinealert-2d6e0.firebasestorage.app",
  messagingSenderId: "909972374094",
  appId: "1:909972374094:web:bfa65c12c1f2dc38d5f91f",
  measurementId: "G-6BW472Q8F1"
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
