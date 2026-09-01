const API = "http://127.0.0.1:8000";
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

/* =========================================================
   PIZZA FIRE — PROFESSIONAL ADMIN EXTENSIONS
   ========================================================= */

function adminEsc(v){
    return String(v ?? "").replace(/[&<>"']/g,x=>({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[x]));
}

function adminMoney(v){
    return "₹"+Number(v||0).toLocaleString("en-IN");
}

async function loadOffersPro(){
    const box=$("#pageContent");
    try{
        const offers=await api("/api/admin/offers");
        box.innerHTML=`<div class="content">
            <div class="page-header"><div><small>SALES TOOLS</small><h1>Offers</h1></div></div>
            <div class="panel">
                <div class="panel-header"><h3>Active Offers</h3></div>
                ${offers.length?offers.map(o=>`
                    <div class="order-mini">
                        <div><b>${adminEsc(o.code)}</b><p>${adminEsc(o.title)} · ${adminEsc(o.discount_type)} ${o.discount_value}</p></div>
                        <span class="pill">${o.active?"Active":"Inactive"}</span>
                    </div>`).join(""):`<div class="empty">No offers yet.</div>`}
            </div>
        </div>`;
    }catch(e){box.innerHTML=`<div class="content"><div class="panel"><h2>Unable to load offers</h2><p>${adminEsc(e.message)}</p></div></div>`;}
}

async function loadCustomersPro(){
    const box=$("#pageContent");
    try{
        const data=await api("/api/admin/orders");
        const map=new Map();
        data.forEach(o=>{
            const phone=String(o.phone||"");
            if(!phone)return;
            const old=map.get(phone)||{name:o.customer_name,phone,total:0,orders:0,last:o.created_at};
            old.orders++;
            old.total+=Number(o.total||0);
            if(String(o.created_at)>String(old.last))old.last=o.created_at;
            map.set(phone,old);
        });
        const customers=[...map.values()].sort((a,b)=>b.total-a.total);
        box.innerHTML=`<div class="content">
            <div class="page-header"><div><small>CUSTOMER DATABASE</small><h1>Customers</h1></div></div>
            <div class="table-wrap"><table><thead><tr><th>CUSTOMER</th><th>MOBILE</th><th>ORDERS</th><th>SPEND</th><th>LAST ORDER</th></tr></thead>
            <tbody>${customers.map(c=>`<tr>
                <td><b>${adminEsc(c.name||"Customer")}</b></td>
                <td>${adminEsc(c.phone)}</td>
                <td><b>${c.orders}</b></td>
                <td><b>${adminMoney(c.total)}</b></td>
                <td>${adminEsc(c.last||"—")}</td>
            </tr>`).join("")||`<tr><td colspan="5">No customers yet.</td></tr>`}</tbody></table></div>
        </div>`;
    }catch(e){box.innerHTML=`<div class="content"><div class="panel"><h2>Unable to load customers</h2><p>${adminEsc(e.message)}</p></div></div>`;}
}

async function loadAnalyticsPro(){
    const box=$("#pageContent");
    try{
        const stats=await api("/api/admin/stats");
        const data=await api("/api/admin/orders");
        const counts={};
        data.forEach(o=>counts[o.status]=(counts[o.status]||0)+1);
        box.innerHTML=`<div class="content">
            <div class="page-header"><div><small>BUSINESS INSIGHTS</small><h1>Analytics</h1></div></div>
            <div class="stats">
                <div class="stat"><div class="stat-head">TOTAL ORDERS</div><strong>${stats.total_orders??data.length}</strong></div>
                <div class="stat"><div class="stat-head">ACTIVE</div><strong>${stats.active_orders??0}</strong></div>
                <div class="stat"><div class="stat-head">CUSTOMERS</div><strong>${stats.customers??0}</strong></div>
                <div class="stat"><div class="stat-head">DELIVERED REVENUE</div><strong>${adminMoney(stats.revenue)}</strong></div>
            </div>
            <div class="panel"><div class="panel-header"><h3>Order Status Breakdown</h3></div>
                ${Object.entries(counts).map(([s,n])=>`<div class="order-mini"><div><b>${adminEsc(statusLabel(s))}</b></div><span class="pill">${n}</span></div>`).join("")||`<div class="empty">No order data.</div>`}
            </div>
        </div>`;
    }catch(e){box.innerHTML=`<div class="content"><div class="panel"><h2>Unable to load analytics</h2><p>${adminEsc(e.message)}</p></div></div>`;}
}

async function loadSettingsPro(){
    const box=$("#pageContent");
    try{
        const s=await api("/api/admin/settings");
        box.innerHTML=`<div class="content">
            <div class="page-header"><div><small>STORE CONTROL & SECURITY</small><h1>Settings</h1></div></div>
            <div class="panel">
                <div class="panel-header"><h3>Store Settings</h3></div>
                <div class="input-group"><label>Store Name</label><input id="storeName" value="${adminEsc(s.store_name||"Pizza Fire")}"></div>
                <div class="input-group"><label>Order Receiving Number</label><input id="storePhone" value="${adminEsc(s.phone||"")}"></div>
                <div class="input-group"><label>Opening Time</label><input id="opening" type="time" value="${adminEsc(s.opening_time||"10:00")}"></div>
                <div class="input-group"><label>Closing Time</label><input id="closing" type="time" value="${adminEsc(s.closing_time||"22:00")}"></div>
                <div class="input-group"><label>UPI ID</label><input id="upi" value="${adminEsc(s.upi_id||"")}" placeholder="example@upi"></div>
                <div class="input-group"><label>Address</label><textarea id="address">${adminEsc(s.address||"")}</textarea></div>
                <div class="input-group"><label>Store Status</label>
                    <select id="storeOpen"><option value="true" ${s.store_open!=="false"?"selected":""}>OPEN</option><option value="false" ${s.store_open==="false"?"selected":""}>CLOSED</option></select>
                </div>
                <button class="btn primary" onclick="saveSettingsPro()">Save Store Settings</button>
            </div>
            <div class="panel" style="margin-top:18px">
                <div class="panel-header"><h3>Change Admin Password</h3></div>
                <div class="input-group"><label>Current Password</label><input id="currentPassword" type="password" autocomplete="current-password"></div>
                <div class="input-group"><label>New Password</label><input id="newPassword" type="password" minlength="8" autocomplete="new-password"></div>
                <div class="input-group"><label>Confirm New Password</label><input id="confirmPassword" type="password" minlength="8" autocomplete="new-password"></div>
                <button class="btn secondary" onclick="changeAdminPassword()">Change Password</button>
            </div>
        </div>`;
    }catch(e){box.innerHTML=`<div class="content"><div class="panel"><h2>Unable to load settings</h2><p>${adminEsc(e.message)}</p></div></div>`;}
}

async function saveSettingsPro(){
    const values={
        store_name:$("#storeName").value.trim(),
        phone:$("#storePhone").value.trim(),
        opening_time:$("#opening").value,
        closing_time:$("#closing").value,
        upi_id:$("#upi").value.trim(),
        address:$("#address").value.trim(),
        store_open:$("#storeOpen").value
    };
    try{
        for(const [key,value] of Object.entries(values)){
            await api(`/api/admin/settings/${key}`,{method:"PATCH",body:JSON.stringify({value})});
        }
        alert("Store settings saved.");
        loadSettingsPro();
    }catch(e){alert(e.message);}
}

async function changeAdminPassword(){
    const current=$("#currentPassword").value;
    const next=$("#newPassword").value;
    const confirmPass=$("#confirmPassword").value;
    if(next.length<8){alert("New password must be at least 8 characters.");return;}
    if(next!==confirmPass){alert("New passwords do not match.");return;}
    try{
        await api("/api/admin/change-password",{method:"POST",body:JSON.stringify({current_password:current,new_password:next})});
        alert("Password changed successfully. Please sign in again.");
        localStorage.removeItem("pf_admin_token");
        token="";
        showLogin();
    }catch(e){alert(e.message);}
}

/* Secondary router adds pages while keeping the existing admin shell. */
document.querySelectorAll(".nav-item").forEach(btn=>{
    btn.addEventListener("click",()=>{
        const page=btn.dataset.page;
        if(page==="offers")loadOffersPro();
        if(page==="customers")loadCustomersPro();
        if(page==="analytics")loadAnalyticsPro();
        if(page==="settings")loadSettingsPro();
    });
});
