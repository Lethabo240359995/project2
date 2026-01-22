const form = document.getElementById("orderForm");
const message = document.getElementById("thankYouMessage");
const ordersTable = document.getElementById("ordersTable");
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminError = document.getElementById("adminError");

// CHANGE ADMIN PASSWORD HERE
const ADMIN_PASSWORD = "Lethabo123";

// Load orders into admin table
function loadOrders() {
    ordersTable.innerHTML = "";
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.forEach(order => {
        const row = `
            <tr>
                <td>${order.name}</td>
                <td>${order.residence}</td>
                <td>${order.room}</td>
                <td>${order.quantity}</td>
                <td>${order.flavor}</td>
            </tr>
        `;
        ordersTable.innerHTML += row;
    });
}

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const order = {
        name: document.getElementById("name").value,
        residence: document.getElementById("residence").value,
        room: document.getElementById("room").value,
        quantity: document.getElementById("quantity").value,
        flavor: document.getElementById("flavor").value
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    message.innerHTML = `
        Thank you, ${order.name}! 🌟<br>
        Your FREE condom order has been received.<br>
        <em>Taking care of yourself is a powerful step toward success.</em>
    `;

    form.reset();
});

// Show admin login
function showAdminLogin() {
    adminLogin.style.display = "block";
    adminPanel.style.display = "none";
    adminError.textContent = "";
}

// Check admin password
function checkPassword() {
    const inputPassword = document.getElementById("adminPassword").value;

    if (inputPassword === ADMIN_PASSWORD) {
        adminLogin.style.display = "none";
        adminPanel.style.display = "block";
        loadOrders();
    } else {
        adminError.textContent = "Incorrect password. Access denied.";
    }
}
