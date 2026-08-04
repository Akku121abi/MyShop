import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

  try {

    await addDoc(collection(db, "orders"), {

      customerName: name,
      mobile: mobile,
      address: address,

      paymentStatus: "Pending Verification",

      screenshotName: screenshot.name,

      createdAt: serverTimestamp()

    });

    alert("✅ Order Placed Successfully!\nPayment verification ke baad order process hoga.");

    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
    document.getElementById("screenshot").value = "";

  } catch (e) {

    console.error(e);

    alert("❌ " + e.message);

  }

});