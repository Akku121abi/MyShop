import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", async () => {

  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();

  if (!name || !price || !image) {
    alert("Please fill all fields.");
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name: name,
      price: Number(price),
      image: image,
      createdAt: new Date()
    });

    alert("✅ Product added successfully!");

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";

  } catch (error) {
    alert("❌ " + error.message);
    console.error(error);
  }

});