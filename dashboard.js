import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Sidebar
window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
};

// Load Products
async function loadProducts() {
  const table = document.getElementById("productTable");
  table.innerHTML = "";

  const snapshot = await getDocs(collection(db, "products"));

  document.getElementById("productCount").innerText = snapshot.size;

  snapshot.forEach((item) => {

    const product = item.data();

    table.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>₹${product.price}</td>
        <td>
          <button onclick="deleteProduct('${item.id}')">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Add Product
window.addProduct = async function () {

  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();

  if (!name || !price) {
    alert("Enter Product Name & Price");
    return;
  }

  await addDoc(collection(db, "products"), {
    name: name,
    price: Number(price)
  });

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";

  loadProducts();
};

// Delete Product
window.deleteProduct = async function (id) {

  await deleteDoc(doc(db, "products", id));

  loadProducts();
};

// Clear Data
window.clearData = async function () {

  alert("Delete All अभी disabled है।");
};

// Logout
window.logout = function () {
  window.location.href = "login.html";
};

loadProducts();loadProducts();
