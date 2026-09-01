const API = "https://pizza-fire-1.onrender.com";
let token = localStorage.getItem("pf_delivery_token") || "";
let staffName = localStorage.getItem("pf_delivery_name") || "Delivery";
const $ = s => document.querySelector(s);

async function api(path, opt = {}) {
    let r;
    try {
        r = await fetch(API + path, {
            ...opt,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
    } catch (e) {
        throw new Error("Backend connect nahi ho raha. FastAPI server start karo.");
    }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
        if (r.status === 401 || r.status === 403) {
            localStorage.removeItem("pf_delivery_token");
            token = "";
            showLogin();
        }
        throw new Error(d.detail || `Request failed (${r.status})`);
    }
    return d;
}

function showLogin() {
    $("#login").classList.remove("hidden");
    $("#app").classList.add("hidden");
}

function showApp() {
    $("#login").classList.add("hidden");
    $("#app").classList.remove("hidden");
    $("#staffName").textContent = staffName;
    loadOrders();
}

function label(s) {
    return ({ out_for_delivery: "Out for Delivery", delivered: "Delivered" }[s] || s);
}

function esc(v) {
    return String(v ?? "").replace(/[&<>'"]/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
    }[c]));
}

async function login(e) {
    e.preventDefault();
    $("#loginError").textContent = "";
    try {
        const d = await api("/api/delivery/login", {
            method: "POST",
            body: JSON.stringify({
                email: $("#email").value.trim(),
                password: $("#password").value
            })
        });
        token = d.token;
        staffName = d.name || "Delivery";
        localStorage.setItem("pf_delivery_token", token);
        localStorage.setItem("pf_delivery_name", staffName);
        showApp();
    } catch (e) {
        $("#loginError").textContent = e.message;
    }
}

async function loadOrders() {
    const box = $("#orders");
    box.innerHTML = '<div class="empty">Loading assigned deliveries...</div>';
    try {
        const orders = await api("/api/delivery/orders");
        $("#count").textContent = orders.length;
        if (!orders.length) {
            box.innerHTML = '<div class="empty"><div style="font-size:42px">🛵</div><h2>No deliveries right now</h2><p>New assigned orders will appear here.</p></div>';
            return;
        }
        box.innerHTML = orders.map(o => {
            const items = Array.isArray(o.items) ? o.items : [];
            return `<article class="order">
                <div class="order-top">
                    <div><span class="eyebrow">ORDER</span><h2>#${esc(o.order_no)}</h2></div>
                    <span class="pill">${label(o.status)}</span>
                </div>
                <div class="items">${esc(items.map(i => `${i.qty || 1}× ${i.name || "Item"}`).join(", "))}</div>
                <div class="details">
                    <div><span>Customer</span><strong>${esc(o.customer_name)}</strong></div>
                    <div><span>Phone</span><strong><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a></strong></div>
                    <div class="address"><span>Delivery address</span><strong>${esc(o.address)}</strong></div>
                </div>
                <div class="order-bottom">
                    <div class="amount">₹${Number(o.total || 0).toFixed(0)}</div>
                    <button class="primary" style="width:auto;margin:0" onclick="markDelivered(${Number(o.id)})">Mark Delivered ✓</button>
                </div>
            </article>`;
        }).join("");
    } catch (e) {
        box.innerHTML = `<div class="empty"><h2>Unable to load deliveries</h2><p>${esc(e.message)}</p><button class="ghost" onclick="loadOrders()">Try Again</button></div>`;
    }
}

async function markDelivered(id) {
    if (!confirm("Mark this order as delivered?")) return;
    try {
        await api(`/api/delivery/orders/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: "delivered" })
        });
        loadOrders();
    } catch (e) {
        alert(e.message);
    }
}

$("#loginForm").addEventListener("submit", login);
$("#refresh").addEventListener("click", loadOrders);
$("#logout").addEventListener("click", () => {
    localStorage.removeItem("pf_delivery_token");
    localStorage.removeItem("pf_delivery_name");
    token = "";
    showLogin();
});

if (token) showApp();
else showLogin();

setInterval(() => {
    if (token && !$("#app").classList.contains("hidden")) loadOrders();
}, 15000);
