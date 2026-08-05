// ===== dashboard.js =====

// Load Products
let products = JSON.parse(localStorage.getItem("products")) || [];

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    document.querySelectorAll(".sidebar li").forEach(item => {
        item.classList.remove("active");
    });

    event.target.classList.add("active");
}

function addProduct() {

    let name = document.getElementById("productName").value;
    let price = document.getElementById("productPrice").value;

    if(name==="" || price===""){
        alert("Enter Product Name & Price");
        return;
    }

    products.push({
        name:name,
        price:price
    });

    localStorage.setItem("products",JSON.stringify(products));

    document.getElementById("productName").value="";
    document.getElementById("productPrice").value="";

    loadProducts();
}

function loadProducts(){

    let table=document.getElementById("productTable");

    table.innerHTML="";

    products.forEach((product,index)=>{

        table.innerHTML+=`
        <tr>

        <td>${product.name}</td>

        <td>₹${product.price}</td>

        <td>

        <button onclick="deleteProduct(${index})">

        Delete

        </button>

        </td>

        </tr>
        `;

    });

    document.getElementById("productCount").innerText=products.length;

}

function deleteProduct(index){

    products.splice(index,1);

    localStorage.setItem("products",JSON.stringify(products));

    loadProducts();

}

function clearData(){

    if(confirm("Delete All Products?")){

        localStorage.removeItem("products");

        products=[];

        loadProducts();

    }

}

function logout(){

    alert("Logout Successful");

    window.location.href="login.html";

}

loadProducts();