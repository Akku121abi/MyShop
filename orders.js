import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersList = document.getElementById("ordersList");

async function loadOrders() {

    ordersList.innerHTML = "<h2>Loading Orders...</h2>";

    try {

        const querySnapshot = await getDocs(collection(db, "orders"));

        ordersList.innerHTML = "";

        if (querySnapshot.empty) {
            ordersList.innerHTML = "<h2>No Orders Found</h2>";
            return;
        }

        querySnapshot.forEach((orderDoc) => {

            const order = orderDoc.data();

            ordersList.innerHTML += `
            <div class="order">

                <h3>${order.customerName}</h3>

                <p><b>Mobile:</b> ${order.mobile}</p>

                <p><b>Address:</b> ${order.address}</p>

                <p><b>Status:</b>
                <span id="status-${orderDoc.id}">
                ${order.paymentStatus}
                </span>
                </p>

                <button onclick="approveOrder('${orderDoc.id}')">
                    Approve Order
                </button>

            </div>
            `;

        });

    } catch (e) {

        console.error(e);

        ordersList.innerHTML = "<h2>Error Loading Orders</h2>";

    }

}

window.approveOrder = async function(id){

    try{

        await updateDoc(doc(db,"orders",id),{

            paymentStatus:"Approved"

        });

        document.getElementById("status-"+id).innerText="Approved";

        alert("✅ Order Approved");

    }catch(e){

        alert(e.message);

    }

}

loadOrders();