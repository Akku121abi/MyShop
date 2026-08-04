import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const productList = document.getElementById("productList");
const search = document.getElementById("search");

let allProducts = [];

async function loadProducts() {

    productList.innerHTML = "<h2>Loading Products...</h2>";

    try {

        const querySnapshot = await getDocs(collection(db, "products"));

        productList.innerHTML = "";
        allProducts = [];

        if (querySnapshot.empty) {
            productList.innerHTML = "<h2>No Products Found</h2>";
            return;
        }

        querySnapshot.forEach((doc) => {

            const product = {
                id: doc.id,
                ...doc.data()
            };

            allProducts.push(product);

        });

        showProducts(allProducts);

    } catch (error) {

        console.error(error);

        productList.innerHTML = "<h2>Failed to load products!</h2>";

    }

}

function showProducts(products){

    productList.innerHTML = "";

    products.forEach(product=>{

        productList.innerHTML += `
        <div class="product">
            <img src="${product.image}" width="220">
            <h2>${product.name}</h2>
            <p class="price">₹${product.price}</p>

            <button onclick="window.location.href='products.html'">
                Buy Now
            </button>
        </div>
        `;

    });

}

search.addEventListener("input",()=>{

    const value = search.value.toLowerCase();

    const filtered = allProducts.filter(product=>
        product.name.toLowerCase().includes(value)
    );

    showProducts(filtered);

});

loadProducts();