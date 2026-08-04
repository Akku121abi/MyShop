let cart = JSON.parse(localStorage.getItem("cart")) || [];

function buy() {
    alert("Product purchased successfully!");
}

function addToCart(id, name, price) {
    cart.push({
        id: id,
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}