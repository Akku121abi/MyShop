import { db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetails = document.getElementById("productDetails");

async function loadProduct() {

    if (!productId) {
        productDetails.innerHTML = "<h2>Product Not Found!</h2>";
        return;
    }

    try {

        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            productDetails.innerHTML = "<h2>Product Not Found!</h2>";
            return;
        }

        const product = docSnap.data();

        productDetails.innerHTML = `
        <div class="product">
            <img src="${product.image}" width="300">
            <h1>${product.name}</h1>
            <h2 style="color:green;">₹${product.price}</h2>

            <button onclick="addToCart()">
                Add To Cart
            </button>
        </div>
        `;

        window.addToCart = function () {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product Added To Cart");

        };

    } catch (error) {

        console.error(error);

        productDetails.innerHTML = "<h2>Error Loading Product!</h2>";

    }

}

loadProduct();