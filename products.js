import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productList = document.getElementById("productList");

async function loadProducts() {

    productList.innerHTML = "<h2>Loading Products...</h2>";

    try {

        const querySnapshot = await getDocs(collection(db, "products"));

        productList.innerHTML = "";

        if (querySnapshot.empty) {
            productList.innerHTML = "<h2>No Products Found</h2>";
            return;
        }

        querySnapshot.forEach((doc) => {

            const product = doc.data();

            productList.innerHTML += `

            <div class="product">

                <img src="${product.image}" width="220">

                <h2>${product.name}</h2>

                <p class="price">₹${product.price}</p>

                <button onclick="addToCart('${doc.id}','${product.name}','${product.price}','${product.image}')">
                    Add To Cart
                </button>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

        productList.innerHTML =
        "<h2>Failed to load products!</h2>";

    }

}

window.addToCart = function(id,name,price,image){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id:id,
        name:name,
        price:price,
        image:image
    });

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(name + " Added To Cart");

}

loadProducts();