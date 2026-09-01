const API = "https://pizza-fire-1.onrender.com";
let token = localStorage.getItem("pf_admin_token") || "";
let menu = [], orders = [];

const $ = s => document.querySelector(s);

async function api(url, options = {}) {
    const res = await fetch(API + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem("pf_admin_token");
            token = "";
            showLogin();
        }
        throw new Error(data.detail || "Request failed");
    }

    return data;
}


/* ================= LOGIN ================= */

async function login(e) {
    e.preventDefault();

    const email = $("#email").value.trim();
    const password = $("#password").value;

    $("#loginError").textContent = "";

    try {
        const data = await api("/api/admin/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        token = data.token;
        localStorage.setItem("pf_admin_token", token);

        showApp();
    } catch (err) {
        $("#loginError").textContent = err.message;
    }
}

$("#loginForm")?.addEventListener("submit", login);


/* ================= SCREEN ================= */

function showLogin() {
    $("#loginScreen")?.classList.remove("hidden");
    $("#application")?.classList.add("hidden");
}

function showApp() {
    $("#loginScreen")?.classList.add("hidden");
    $("#application")?.classList.remove("hidden");
    loadDashboard();
}


/* ================= NAVIGATION ================= */

document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        const page = btn.dataset.page;

        document.querySelectorAll(".nav-item")
            .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

        if ($("#pageTitle"))
            $("#pageTitle").textContent =
                page.charAt(0).toUpperCase() + page.slice(1);

        if (page === "dashboard") loadDashboard();
        if (page === "orders") loadOrders();
        if (page === "menu") loadMenu();
        if (page === "settings") loadSettings();
    });
});


/* ================= DASHBOARD ================= */

async function loadDashboard() {
    try {
        orders = await api("/api/admin/orders");

        const pending = orders.filter(o =>
            ["new", "accepted", "preparing", "ready", "out_for_delivery"]
                .includes(o.status)
        );

        const delivered = orders.filter(
            o => o.status === "delivered"
        );

        const revenue = delivered.reduce(
            (sum, o) => sum + Number(o.total || 0), 0
        );

        $("#pageContent").innerHTML = `
            <div class="content">

                <div class="stats">

                    <div class="stat">
                        <div class="stat-head">TOTAL ORDERS</div>
                        <strong>${orders.length}</strong>
                    </div>

                    <div class="stat">
                        <div class="stat-head">PENDING</div>
                        <strong>${pending.length}</strong>
                    </div>

                    <div class="stat">
                        <div class="stat-head">DELIVERED</div>
                        <strong>${delivered.length}</strong>
                    </div>

                    <div class="stat">
                        <div class="stat-head">REVENUE</div>
                        <strong>₹${revenue.toLocaleString("en-IN")}</strong>
                    </div>

                </div>

                <div class="panel">
                    <div class="panel-header">
                        <h3>Recent Orders</h3>
                    </div>

                    ${
                        orders.slice(0, 5).map(o => `
                            <div class="order-mini">
                                <div>
                                    <b>#${o.order_no}</b>
                                    <p>${o.customer_name} · ₹${o.total}</p>
                                </div>

                                <span class="pill">
                                    ${o.status.replaceAll("_", " ")}
                                </span>
                            </div>
                        `).join("")
                        || `<div class="empty">No orders yet.</div>`
                    }

                </div>

            </div>
        `;
    } catch (err) {
        alert(err.message);
    }
}


/* ================= ORDERS ================= */

async function loadOrders() {
    try {
        orders = await api("/api/admin/orders");

        $("#pageContent").innerHTML = `
            <div class="content">

                <div class="page-header">
                    <div>
                        <small>ORDER MANAGEMENT</small>
                        <h1>Orders</h1>
                    </div>
                </div>

                <div class="table-wrap">

                    <table>

                        <thead>
                            <tr>
                                <th>ORDER</th>
                                <th>CUSTOMER</th>
                                <th>TOTAL</th>
                                <th>PAYMENT</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>

                            ${
                                orders.map(o => `
                                    <tr>

                                        <td>
                                            <b>#${o.order_no}</b>
                                            <div class="item-sub">
                                                ${o.created_at}
                                            </div>
                                        </td>

                                        <td>
                                            <b>${o.customer_name}</b>
                                            <div class="item-sub">
                                                ${o.phone}
                                            </div>
                                        </td>

                                        <td>
                                            <b>₹${o.total}</b>
                                        </td>

                                        <td>
                                            ${o.payment.toUpperCase()}
                                        </td>

                                        <td>
                                            <span class="pill">
                                                ${o.status.replaceAll("_", " ")}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                onchange="
                                                    updateStatus(
                                                        ${o.id},
                                                        this.value
                                                    )
                                                "
                                            >

                                                ${
                                                    [
                                                        "new",
                                                        "accepted",
                                                        "preparing",
                                                        "ready",
                                                        "out_for_delivery",
                                                        "delivered",
                                                        "rejected"
                                                    ].map(s => `
                                                        <option
                                                            value="${s}"
                                                            ${o.status === s ? "selected" : ""}
                                                        >
                                                            ${s.replaceAll("_", " ")}
                                                        </option>
                                                    `).join("")
                                                }

                                            </select>
                                        </td>

                                    </tr>
                                `).join("")
                                ||
                                `
                                    <tr>
                                        <td colspan="6">
                                            <div class="empty">
                                                No orders yet.
                                            </div>
                                        </td>
                                    </tr>
                                `
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        `;
    } catch (err) {
        alert(err.message);
    }
}


async function updateStatus(id, status) {
    try {
        await api(`/api/admin/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status })
        });

        loadOrders();
    } catch (err) {
        alert(err.message);
    }
}


/* ================= MENU ================= */

async function loadMenu() {
    try {
        menu = await api("/api/admin/menu");

        $("#pageContent").innerHTML = `
            <div class="content">

                <div class="page-header">

                    <div>
                        <small>CATALOG MANAGEMENT</small>
                        <h1>Menu</h1>
                    </div>

                    <button
                        class="btn primary"
                        onclick="openItem()"
                    >
                        + Add Item
                    </button>

                </div>

                <div class="table-wrap">

                    <table>

                        <thead>
                            <tr>
                                <th>ITEM</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>

                            ${
                                menu.map(item => `
                                    <tr>

                                        <td>
                                            ${item.emoji}
                                            <b>${item.name}</b>

                                            <div class="item-sub">
                                                ${item.description || ""}
                                            </div>
                                        </td>

                                        <td>
                                            ${item.category}
                                        </td>

                                        <td>
                                            ₹${item.price}
                                        </td>

                                        <td>
                                            <span class="pill">
                                                ${
                                                    item.active
                                                        ? "Available"
                                                        : "Hidden"
                                                }
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                class="small-button"
                                                onclick="
                                                    openItem(${item.id})
                                                "
                                            >
                                                Edit
                                            </button>

                                            <button
                                                class="small-button"
                                                onclick="
                                                    toggleItem(${item.id})
                                                "
                                            >
                                                ${
                                                    item.active
                                                        ? "Hide"
                                                        : "Show"
                                                }
                                            </button>

                                            <button
                                                class="small-button"
                                                onclick="
                                                    deleteItem(${item.id})
                                                "
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>
                                `).join("")
                                ||
                                `
                                    <tr>
                                        <td colspan="5">
                                            <div class="empty">
                                                No menu items.
                                            </div>
                                        </td>
                                    </tr>
                                `
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        `;
    } catch (err) {
        alert(err.message);
    }
}


/* ================= MENU CRUD ================= */

function openItem(id = "") {

    const item = menu.find(
        x => x.id === Number(id)
    );

    $("#itemId").value = item?.id || "";
    $("#itemName").value = item?.name || "";
    $("#itemCategory").value = item?.category || "Pizza";
    $("#itemPrice").value = item?.price || "";
    $("#itemEmoji").value = item?.emoji || "🍕";
    $("#itemDescription").value =
        item?.description || "";

    $("#itemAvailability").value =
        item?.active ? "1" : "0";

    $("#itemCustomization").checked =
        !!item?.custom;

    $("#itemBestseller").checked =
        !!item?.bestseller;

    $("#drawerTitle").textContent =
        item ? "Edit Item" : "Add Item";

    $("#itemDrawerOverlay")
        ?.classList.add("show");
}


function closeItem() {
    $("#itemDrawerOverlay")
        ?.classList.remove("show");
}


$("#closeItemDrawer")?.addEventListener(
    "click",
    closeItem
);

$("#cancelItem")?.addEventListener(
    "click",
    closeItem
);


$("#itemForm")?.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const id = Number(
            $("#itemId").value
        );

        const item = {

            name: $("#itemName")
                .value.trim(),

            category: $("#itemCategory")
                .value,

            price: Number(
                $("#itemPrice").value
            ),

            emoji: $("#itemEmoji")
                .value || "🍕",

            image: "",

            description: $("#itemDescription")
                .value.trim(),

            active: Number(
                $("#itemAvailability").value
            ),

            custom: $("#itemCustomization")
                .checked ? 1 : 0,

            bestseller: $("#itemBestseller")
                .checked ? 1 : 0

        };


        try {

            await api(
                id
                    ? `/api/admin/menu/${id}`
                    : "/api/admin/menu",
                {
                    method: id
                        ? "PATCH"
                        : "POST",

                    body: JSON.stringify(item)
                }
            );

            closeItem();
            loadMenu();

        } catch (err) {

            alert(err.message);

        }

    }
);


async function toggleItem(id) {

    const item = menu.find(
        x => x.id === id
    );

    if (!item) return;

    await api(
        `/api/admin/menu/${id}`,
        {
            method: "PATCH",

            body: JSON.stringify({

                name: item.name,
                category: item.category,
                price: item.price,
                emoji: item.emoji,
                image: item.image || "",
                description: item.description || "",
                active: item.active ? 0 : 1,
                custom: item.custom,
                bestseller: item.bestseller

            })
        }
    );

    loadMenu();
}


async function deleteItem(id) {

    if (!confirm(
        "Delete this menu item?"
    )) return;

    await api(
        `/api/admin/menu/${id}`,
        {
            method: "DELETE"
        }
    );

    loadMenu();
}


/* ================= SETTINGS ================= */

async function loadSettings() {

    try {

        const s =
            await api(
                "/api/admin/settings"
            );

        $("#pageContent").innerHTML = `

            <div class="content">

                <div class="page-header">
                    <div>
                        <small>STORE CONTROL</small>
                        <h1>Settings</h1>
                    </div>
                </div>

                <div class="panel">

                    <div class="input-group">
                        <label>Store Name</label>
                        <input
                            id="storeName"
                            value="${s.store_name || ""}"
                        >
                    </div>

                    <div class="input-group">
                        <label>Order Receiving Number</label>
                        <input
                            id="storePhone"
                            value="${s.phone || ""}"
                        >
                    </div>

                    <div class="input-group">
                        <label>Opening Time</label>
                        <input
                            id="opening"
                            type="time"
                            value="${s.opening_time || "10:00"}"
                        >
                    </div>

                    <div class="input-group">
                        <label>Closing Time</label>
                        <input
                            id="closing"
                            type="time"
                            value="${s.closing_time || "22:00"}"
                        >
                    </div>

                    <div class="input-group">
                        <label>UPI ID</label>
                        <input
                            id="upi"
                            value="${s.upi_id || ""}"
                            placeholder="example@upi"
                        >
                    </div>

                    <div class="input-group">
                        <label>Address</label>
                        <textarea id="address">${s.address || ""}</textarea>
                    </div>

                    <button
                        class="btn primary"
                        onclick="saveSettings()"
                    >
                        Save Settings
                    </button>

                </div>

            </div>
        `;

    } catch (err) {

        alert(err.message);

    }
}


async function saveSettings() {

    const settings = {

        store_name:
            $("#storeName").value,

        phone:
            $("#storePhone").value,

        opening_time:
            $("#opening").value,

        closing_time:
            $("#closing").value,

        upi_id:
            $("#upi").value,

        address:
            $("#address").value

    };


    try {

        for (
            const [key, value]
            of Object.entries(settings)
        ) {

            await api(
                `/api/admin/settings/${key}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        value
                    })
                }
            );

        }

        alert("Settings saved!");

    } catch (err) {

        alert(err.message);

    }

}


/* ================= LOGOUT ================= */

$("#logoutButton")?.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "pf_admin_token"
        );

        token = "";

        showLogin();

    }
);


/* ================= START ================= */
/* IMPORTANT: THIS MUST BE AT THE END */

if (token) {

    showApp();

} else {

    showLogin();

}
