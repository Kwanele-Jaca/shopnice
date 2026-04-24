

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBW9E-xzoXuxfM7xKLjrB35DYzoMtEEmdw",
  authDomain: "shopnice-4f83b.firebaseapp.com",
  projectId: "shopnice-4f83b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { auth };