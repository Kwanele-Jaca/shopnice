import { signup, login } from "./auth.js";
import { auth, db } from "./firebase.js";

import { 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  collection, getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


let isLogin = true;

const submitBtn = document.getElementById("submitBtn");
const toggleText = document.getElementById("toggleText");
const formTitle = document.getElementById("formTitle");


if (toggleText) {
  toggleText.addEventListener("click", () => {
    isLogin = !isLogin;

    if (isLogin) {
      formTitle.innerText = "Login";
      submitBtn.innerText = "Login";
      toggleText.innerText = "Don't have an account? Sign up";
    } else {
      formTitle.innerText = "Sign Up";
      submitBtn.innerText = "Sign Up";
      toggleText.innerText = "Already have an account? Login";
    }
  });
}

// SUBMIT BUTTON
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (isLogin) {
      login(email, password)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
    } else {
      signup(email, password)
        .then(() => {
          alert("Account created! Please login.");
          isLogin = true;
          formTitle.innerText = "Login";
          submitBtn.innerText = "Login";
        })
        .catch(err => alert(err.message));
    }
  });
}


const userEmailDisplay = document.getElementById("userEmail");

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (userEmailDisplay) {
      userEmailDisplay.innerText = user.email;
    }

    loadProducts();

  } else {
    
    if (window.location.pathname.includes("index.html")) {
      window.location.href = "login.html";
    }
  }
});



async function loadProducts() {
  const container = document.getElementById("productsContainer");

  if (!container) return;

  const snapshot = await getDocs(collection(db, "products"));

  container.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = doc.data();

    const card = document.createElement("div");

    card.innerHTML = `
      <div class="product-card">
        <img src="${p.imageURL}" width="150">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>${p.description}</p>
        <h4>R${p.price}</h4>

        <button onclick="addToCart('${doc.id}', '${p.name}', ${p.price}, '${p.imageURL}')">
          Add to Cart
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}


window.addToCart = function(productId, name, price, imageURL) {
  console.log("Add to cart clicked:", name);
};