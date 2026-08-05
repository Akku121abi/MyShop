import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Total Amount
let totalAmount = Number(localStorage.getItem("cartTotal")) || 0;

// Show Amount
document.getElementById("amountText").innerHTML =
"Total Amount : ₹" + totalAmount;

// Order ID
const orderId = "ORD" + Date.now();

// UPI Link
const upiLink =
`upi://pay?pa=akash5601@fifederal&pn=Akash&am=${totalAmount}&cu=INR&tn=${orderId}`;

// QR Generate
new QRCode(document.getElementById("qrcode"), {
    text: upiLink,
    width: 250,
    height: 250
});

// Pay Button
document.getElementById("payBtn").href = upiLink;

// Place Order
const btn = document.getElementById("placeOrderBtn");

btn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const utr = document.getElementById("utr").value.trim();

    if (!name || !mobile || !address || !utr) {
        alert("Please fill all details.");
        return;
    }

    try {

        await addDoc(collection(db, "orders"), {

            orderId: orderId,

            customerName: name,

            mobile: mobile,

            address: address,

            amount: totalAmount,

            utr: utr,

            paymentMethod: "UPI",

            paymentStatus: "Pending",

            createdAt: serverTimestamp()

        });

        alert("✅ Order Placed Successfully.\nPayment Verification Pending.");

        localStorage.removeItem("cart");
        localStorage.removeItem("cartTotal");

        document.getElementById("name").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("address").value = "";
        document.getElementById("utr").value = "";

        window.location.href = "index.html";

    } catch (e) {

        console.error(e);

        alert(e.message);

    }

});
