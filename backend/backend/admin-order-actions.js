const API="http://127.0.0.1:8000";
let token=localStorage.getItem("pf_admin_token")||"";
let orders=[];

const $=s=>document.querySelector(s);

async function api(path,opt={}){
    let r;
    try{
        r=await fetch(API+path,{
            ...opt,
            headers:{
                "Content-Type":"application/json",
                ...(token?{Authorization:`Bearer ${token}`}:{})
            }
        });
    }catch(e){
        throw new Error("Backend connect nahi ho raha. FastAPI server start karo.");
    }

    const d=await r.json().catch(()=>({}));

    if(!r.ok){
        if(r.status===401){
            localStorage.removeItem("pf_admin_token");
            token="";
            location.reload();
        }
        throw new Error(d.detail||`Request failed (${r.status})`);
    }
    return d;
}


/* ================= ORDERS ================= */

async function loadOrders(){

    const box=$("#pageContent");
    if(box) box.innerHTML=`<div class="content"><div class="panel"><h3>Loading orders...</h3></div></div>`;

    try{

        orders=await api("/api/admin/orders");

        const newOrders=orders.filter(x=>x.status==="new");

        const badge=$("#newOrderBadge");
        if(badge) badge.textContent=newOrders.length;

        if(!orders.length){
            box.innerHTML=`
                <div class="content">
                    <div class="panel">
                        <h2>No orders yet</h2>
                        <p>Customer orders yahan show honge.</p>
                    </div>
                </div>`;
            return;
        }

        box.innerHTML=`
        <div class="content">

            <div class="page-header">
                <div>
                    <small>ORDER MANAGEMENT</small>
                    <h1>Orders</h1>
                </div>

                <button class="small-button" onclick="loadOrders()">
                    ↻ Refresh
                </button>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>ORDER</th>
                            <th>CUSTOMER</th>
                            <th>ITEMS</th>
                            <th>TOTAL</th>
                            <th>PAYMENT</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>

                    ${orders.map(o=>{

                        let items=[];

                        try{
                            items=Array.isArray(o.items)
                                ?o.items
                                :JSON.parse(o.items_json||"[]");
                        }catch(e){}

                        const itemText=items.map(i=>`${i.qty||1}× ${i.name}`).join(", ");

                        return`
                        <tr>

                            <td>
                                <b>#${o.order_no}</b>
                                <div class="item-sub">
                                    ${o.created_at||""}
                                </div>
                            </td>

                            <td>
                                <b>${o.customer_name||"Customer"}</b>
                                <div class="item-sub">
                                    ${o.phone||""}
                                </div>
                            </td>

                            <td>
                                <div class="item-sub">
                                    ${itemText||"Items unavailable"}
                                </div>
                            </td>

                            <td>
                                <b>₹${Number(o.total||0)}</b>
                            </td>

                            <td>
                                ${(o.payment||"").toUpperCase()}
                            </td>

                            <td>
                                <span class="pill">
                                    ${statusLabel(o.status)}
                                </span>
                            </td>

                            <td>

                                <button
                                    class="small-button"
                                    onclick="openOrder(${o.id})">
                                    View
                                </button>

                                ${
                                    o.status==="new"
                                    ?`
                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'accepted')">
                                        Accept
                                    </button>

                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'rejected')">
                                        Reject
                                    </button>
                                    `:""
                                }

                                ${
                                    o.status==="accepted"
                                    ?`
                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'preparing')">
                                        Start
                                    </button>
                                    `:""
                                }

                                ${
                                    o.status==="preparing"
                                    ?`
                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'ready')">
                                        Ready
                                    </button>
                                    `:""
                                }

                                ${
                                    o.status==="ready"
                                    ?`
                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'out_for_delivery')">
                                        Dispatch
                                    </button>
                                    `:""
                                }

                                ${
                                    o.status==="out_for_delivery"
                                    ?`
                                    <button
                                        class="small-button"
                                        onclick="quickStatus(${o.id},'delivered')">
                                        Delivered
                                    </button>
                                    `:""
                                }

                            </td>

                        </tr>`;
                    }).join("")}

                    </tbody>
                </table>
            </div>

        </div>`;

    }catch(e){

        if(box){
            box.innerHTML=`
            <div class="content">
                <div class="panel">
                    <h2>Unable to load orders</h2>
                    <p>${e.message}</p>
                    <button class="small-button" onclick="loadOrders()">
                        Try Again
                    </button>
                </div>
            </div>`;
        }
    }
}


/* ================= STATUS ================= */

function statusLabel(s){

    return({
        new:"Order Received",
        accepted:"Accepted",
        preparing:"Preparing",
        ready:"Ready",
        out_for_delivery:"Out for Delivery",
        delivered:"Delivered",
        rejected:"Rejected"
    }[s]||String(s||"Unknown").replaceAll("_"," "));

}


async function quickStatus(id,status){

    if(status==="rejected"&&!confirm("Reject this order?"))return;

    try{

        await api(`/api/admin/orders/${id}`,{
            method:"PATCH",
            body:JSON.stringify({status})
        });

        await loadOrders();

    }catch(e){
        alert("Status update failed: "+e.message);
    }
}


async function updateStatus(id,status){
    await quickStatus(id,status);
}


/* ================= ORDER DRAWER ================= */

function openOrder(id){

    const o=orders.find(x=>Number(x.id)===Number(id));
    if(!o)return;

    let items=[];

    try{
        items=Array.isArray(o.items)
            ?o.items
            :JSON.parse(o.items_json||"[]");
    }catch(e){}

    const title=$("#orderDrawerTitle");
    if(title)title.textContent=`Order #${o.order_no}`;

    const box=$("#orderDetails");
    if(!box)return;

    box.innerHTML=`

        <div class="panel">

            <h3>Customer</h3>

            <p>
                <b>${o.customer_name||"Customer"}</b>
            </p>

            <p>📞 ${o.phone||"-"}</p>

            <p>📍 ${o.address||"-"}</p>

            <p>
                <b>Order Type:</b>
                ${o.fulfilment||"delivery"}
            </p>

            <p>
                <b>Payment:</b>
                ${(o.payment||"").toUpperCase()}
            </p>

            ${
                o.note
                ?`<p><b>Note:</b> ${o.note}</p>`
                :""
            }

        </div>


        <div class="panel">

            <h3>Items</h3>

            ${
                items.length
                ?items.map(i=>`

                    <div class="order-mini">

                        <div>

                            <b>
                                ${i.qty||1} × ${i.name}
                            </b>

                            ${
                                i.custom
                                ?`<p>${i.custom}</p>`
                                :""
                            }

                        </div>

                        <strong>
                            ₹${
                                Number(i.price||0)*
                                Number(i.qty||1)
                            }
                        </strong>

                    </div>

                `).join("")
                :"<p>No item details available.</p>"
            }

        </div>


        <div class="panel">

            <h3>Order Status</h3>

            <p>
                Current:
                <b>${statusLabel(o.status)}</b>
            </p>

            <div style="display:flex;gap:8px;flex-wrap:wrap">

                ${
                    ["new","accepted","preparing","ready",
                    "out_for_delivery","delivered","rejected"]
                    .map(s=>`
                        <button
                            class="small-button"
                            onclick="quickStatus(${o.id},'${s}')">
                            ${statusLabel(s)}
                        </button>
                    `).join("")
                }

            </div>

        </div>


        <div class="panel">

            <h3>Total</h3>

            <h2>₹${Number(o.total||0)}</h2>

        </div>
    `;

    $("#orderDrawerOverlay")?.classList.add("show");
}


function closeOrder(){

    $("#orderDrawerOverlay")
        ?.classList.remove("show");

}


$("#closeOrderDrawer")
?.addEventListener("click",closeOrder);

$("#orderDrawerOverlay")
?.addEventListener("click",e=>{
    if(e.target.id==="orderDrawerOverlay"){
        closeOrder();
    }
});


/* ================= SEARCH ORDERS ================= */

function filterOrders(){

    const q=($("#orderSearch")?.value||"")
        .trim()
        .toLowerCase();

    document
        .querySelectorAll("tbody tr")
        .forEach(row=>{
            row.style.display=
                row.textContent
                    .toLowerCase()
                    .includes(q)
                ?""
                :"none";
        });
}


$("#orderSearch")
?.addEventListener("input",filterOrders);


/* ================= REFRESH ================= */

$("#refreshButton")
?.addEventListener("click",()=>{
    loadOrders();
});


/* ================= LOGOUT ================= */

$("#logoutButton")
?.addEventListener("click",()=>{

    localStorage.removeItem("pf_admin_token");
    token="";

    location.reload();

});


/* ================= AUTO REFRESH ================= */

setInterval(()=>{

    const active=
        document.querySelector(".nav-item.active");

    if(active?.dataset.page==="orders"){
        loadOrders();
    }

},30000);


/* ================= START ================= */

if(token){
    loadOrders();
}