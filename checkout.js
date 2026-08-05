import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===== Total Amount =====
// अभी टेस्ट के लिए 499 रखा है।
let totalAmount = Number(localStorage.getItem("cartTotal")) || 499;

// Show Amount
document.getElementById("amountText").innerHTML =
`Total Amount : ₹${totalAmount}`;

// Unique Order ID
const orderId = "ORD" + Date.now();

// UPI Link
const upiLink =
`upi://pay?pa=skyler4567@ybl&pn=Akash&am=${totalAmount}&cu=INR&tn=${orderId}`;

// QR Generate
new QRCode(document.getElementById("qrcode"), {
    text: upiLink,
    width: 250,
    height: 250
});

// Pay Button
document.getElementById("payBtn").href = upiLink;

// Button
const btn = document.getElementById("placeOrderBtn");

btn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const screenshot = document.getElementById("screenshot").files[0];

    if (!name || !mobile || !address) {
        alert("Please fill all details.");
        return;
    }

    if (!screenshot) {
        alert("Please upload payment screenshot.");
        return;
    }

    alert("Part 1 Working ✅");
});
