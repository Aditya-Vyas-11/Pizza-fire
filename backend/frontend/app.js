const API_URL = "https://pizza-fire-1.onrender.com";
const WHATSAPP = "917467066077";
const UPI_ID = "UPI_ID_HERE";


/* ================= MENU ================= */

const MENU = [
    {id:1,c:"Pizza",n:"Margherita",p:129,e:"🍕",d:"Cheese pizza, pure and simple.",s:{S:129,M:249,L:399},custom:true},
    {id:2,c:"Pizza",n:"Cheese N Corn",p:149,e:"🍕",d:"Cheese with golden corn.",s:{S:149,M:249,L:399},custom:true},
    {id:3,c:"Pizza",n:"Tango Tomato",p:149,e:"🍕",d:"Cheese and fresh tomato.",s:{S:149,M:249,L:399},custom:true},
    {id:4,c:"Pizza",n:"Veggie Deluxe",p:149,e:"🍕",d:"Onion, tomato and capsicum.",s:{S:149,M:249,L:399},custom:true,b:true},
    {id:5,c:"Pizza",n:"Funghi",p:149,e:"🍕",d:"Peppers, jalapeno and mushrooms.",s:{S:149,M:299,L:449},custom:true},
    {id:6,c:"Pizza",n:"Crazy Lover",p:199,e:"🍕",d:"Corn, olives, capsicum and red onion.",s:{S:199,M:349,L:499},custom:true},
    {id:7,c:"Pizza",n:"Paneer Pappy",p:199,e:"🍕",d:"Tandoori paneer, capsicum and red paprika.",s:{S:199,M:349,L:499},custom:true},
    {id:8,c:"Pizza",n:"Mexican Wave",p:199,e:"🍕",d:"Onion, capsicum, corn and red paprika.",s:{S:199,M:349,L:499},custom:true},

    {id:9,c:"Combos",n:"Meal For 2 Person",p:269,e:"🎁",d:"1 Feast Small Pizza + pasta + 2 cold drinks.",b:true},
    {id:10,c:"Combos",n:"Meal For 3 Person",p:399,e:"🎁",d:"2 Feast Small Pizza + pasta + 3 cold drinks."},
    {id:11,c:"Combos",n:"Fire Meal",p:299,e:"🔥",d:"Small pizza + drink + cheese burger."},
    {id:12,c:"Combos",n:"Hum Tum Combo",p:489,e:"🎁",d:"Medium pizza + Choco Lava + burger + 2 drinks.",b:true},

    {id:13,c:"Beverages",n:"Cold Drinks",p:29,e:"🥤",d:"Chilled soft drink."},
    {id:14,c:"Beverages",n:"Vanilla Shake",p:89,e:"🥤",d:"Creamy vanilla shake."},
    {id:15,c:"Beverages",n:"Chocolate Shake",p:89,e:"🥤",d:"Rich chocolate shake."},
    {id:16,c:"Beverages",n:"Strawberry Shake",p:89,e:"🥤",d:"Strawberry shake."},
    {id:17,c:"Beverages",n:"Oreo Shake",p:99,e:"🥤",d:"Oreo shake."},
    {id:18,c:"Beverages",n:"Cold Coffee",p:89,e:"☕",d:"Chilled creamy coffee."},
    {id:19,c:"Beverages",n:"Hot Coffee",p:49,e:"☕",d:"Hot coffee."},

    {id:20,c:"Side Items",n:"Choco Lava",p:59,e:"🍫",d:"Warm chocolate dessert."},
    {id:21,c:"Side Items",n:"Stuffed Garlic Bread",p:149,e:"🥖",d:"Cheesy stuffed garlic bread."},
    {id:22,c:"Side Items",n:"Cheesy Dip",p:29,e:"🧀",d:"Creamy cheese dip."},

    {id:23,c:"Burger",n:"Mexican Burger",p:49,e:"🍔",d:"Pure veg Mexican-style burger."},
    {id:24,c:"Burger",n:"Cheese Burger",p:59,e:"🍔",d:"Classic cheese burger.",b:true},
    {id:25,c:"Burger",n:"Double Patty Burger",p:79,e:"🍔",d:"Double patty burger."},
    {id:26,c:"Burger",n:"Paneer Tikka Burger",p:99,e:"🍔",d:"Paneer tikka burger."},

    {id:27,c:"Mini Pizza",n:"Veg Singles",p:89,e:"🍕",d:"Mini veg pizza."},
    {id:28,c:"Mini Pizza",n:"Veg Doubles",p:99,e:"🍕",d:"Mini pizza with two toppings."},

    {id:29,c:"Pasta",n:"Red Sauce Pasta",p:99,e:"🍝",d:"Classic red sauce pasta."},
    {id:30,c:"Pasta",n:"White Sauce Creamy Pasta",p:129,e:"🍝",d:"Creamy white sauce pasta."},
    {id:31,c:"Pasta",n:"Mix Sauce Cheesy Pasta",p:129,e:"🍝",d:"Cheesy mixed sauce pasta."},

    {id:32,c:"Maggi",n:"Masala Maggie",p:49,e:"🍜",d:"Masala Maggie."},
    {id:33,c:"Maggi",n:"Butter Masala Maggie",p:59,e:"🍜",d:"Buttery masala Maggie."},

    {id:34,c:"Rolls",n:"Burrito Mix",p:99,e:"🌯",d:"Loaded burrito mix roll."},
    {id:35,c:"Rolls",n:"Tofu Cheese",p:119,e:"🌯",d:"Tofu and cheese roll."},
    {id:36,c:"Rolls",n:"Paneer Tikka Roll",p:129,e:"🌯",d:"Paneer tikka roll."},

    {id:37,c:"Sandwich",n:"Mexican Grilled Sandwich",p:49,e:"🥪",d:"Grilled Mexican sandwich."},
    {id:38,c:"Sandwich",n:"Cheesy Grilled Sandwich",p:59,e:"🥪",d:"Cheesy grilled sandwich."},
    {id:39,c:"Sandwich",n:"Surprise Grilled Sandwich",p:69,e:"🥪",d:"Surprise grilled sandwich."},
    {id:40,c:"Sandwich",n:"Paneer Tikka Grilled Sandwich",p:79,e:"🥪",d:"Paneer tikka grilled sandwich."},

    {id:41,c:"French Fries",n:"French Fries",p:99,e:"🍟",d:"Crispy fries."},
    {id:42,c:"French Fries",n:"Peri-Peri Fries",p:109,e:"🍟",d:"Spicy peri-peri fries."},
    {id:43,c:"French Fries",n:"Cheese Peri-Peri Fries",p:119,e:"🍟",d:"Cheesy peri-peri fries."}
];


const TOPPINGS = [
    ["Capsicum",29],
    ["Tomatoes",29],
    ["Mushrooms",49],
    ["Onion",29],
    ["Sweet Corn",29],
    ["Red Onion",29],
    ["Black Olives",49],
    ["Jalapeno",49],
    ["Peppers",49],
    ["Baby Corn",49],
    ["Paneer",69]
];


const EMO = {
    All:"🔥",
    Pizza:"🍕",
    Combos:"🎁",
    Beverages:"🥤",
    "Side Items":"🍫",
    Burger:"🍔",
    "Mini Pizza":"🍕",
    Pasta:"🍝",
    Maggi:"🍜",
    Rolls:"🌯",
    Sandwich:"🥪",
    "French Fries":"🍟"
};


const cats = [
    "All",
    ...new Set(MENU.map(x => x.c))
];


let active = "All";
let searchTerm = "";

let cart = JSON.parse(
    localStorage.getItem("pf_cart") || "[]"
);


const $ = s => document.querySelector(s);

const money = n =>
    "₹" + Number(n || 0).toLocaleString("en-IN");


/* ================= CART ================= */

function saveCart() {

    localStorage.setItem(
        "pf_cart",
        JSON.stringify(cart)
    );

    renderCart();
}


function toast(message) {

    const t = $("#toast");

    if (!t) return;

    t.textContent = message;

    t.classList.add("show");

    setTimeout(
        () => t.classList.remove("show"),
        2100
    );
}


/* ================= CATEGORIES ================= */

function renderCats() {

    if ($("#categoryRow")) {

        $("#categoryRow").innerHTML =
            cats.slice(0, 9)
            .map(c => `
                <button
                    class="cat ${active === c ? "active" : ""}"
                    data-cat="${c}"
                >
                    <span>
                        ${EMO[c] || "🍽️"}
                    </span>
                    ${c}
                </button>
            `)
            .join("");

    }


    if ($("#categoryTabs")) {

        $("#categoryTabs").innerHTML =
            cats
            .map(c => `
                <button
                    class="tab ${active === c ? "active" : ""}"
                    data-cat="${c}"
                >
                    ${c}
                </button>
            `)
            .join("");

    }


    document
        .querySelectorAll("[data-cat]")
        .forEach(button => {

            button.onclick = () => {

                active =
                    button.dataset.cat;

                renderCats();
                renderProducts();

                $("#menu")
                    ?.scrollIntoView({
                        behavior:"smooth"
                    });

            };

        });

}


/* ================= PRODUCTS ================= */

function renderProducts() {

    const filtered = MENU.filter(item => {

        const categoryMatch =
            active === "All" ||
            item.c === active;

        const text =
            `${item.n} ${item.c} ${item.d}`
            .toLowerCase();

        return (
            categoryMatch &&
            text.includes(
                searchTerm.toLowerCase()
            )
        );

    });


    $("#productGrid").innerHTML =
        filtered.length

        ?

        filtered.map(item => `

            <article class="product">

                <div class="food">

                    ${
                        item.b
                        ?
                        `<span class="badge">
                            BESTSELLER
                        </span>`
                        :
                        ""
                    }

                    <span>
                        ${item.e}
                    </span>

                </div>


                <div class="body">

                    <h3>
                        ${item.n}
                    </h3>

                    <p>
                        ${item.d}
                    </p>


                    <div class="product-foot">

                        <span class="price">
                            ${money(item.p)}
                        </span>

                        <button
                            class="add"
                            data-id="${item.id}"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </article>

        `).join("")

        :

        "<p>No items found.</p>";


    document
        .querySelectorAll(".add")
        .forEach(button => {

            button.onclick = () =>
                openItem(
                    Number(
                        button.dataset.id
                    )
                );

        });

}


/* ================= ADD ITEM ================= */

function add(item) {

    const key =
        item.id +
        "|" +
        item.custom;


    const existing =
        cart.find(
            x => x.key === key
        );


    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...item,
            key
        });

    }


    saveCart();

    toast("Added to cart");

}


/* ================= CUSTOMIZATION ================= */

function openItem(id) {

    const item =
        MENU.find(
            x => x.id === id
        );


    if (!item) return;


    if (!item.custom) {

        add({
            id:item.id,
            name:item.n,
            price:item.p,
            qty:1,
            custom:""
        });

        return;

    }


    let size = "S";
    let base = "Thin Crust";
    let tops = [];


    $("#itemBody").innerHTML = `

        <div class="item-layout">

            <div class="item-photo">
                ${item.e}
            </div>


            <div>

                <span class="eyebrow">
                    ${item.c.toUpperCase()}
                </span>


                <h2>
                    ${item.n}
                </h2>


                <p>
                    ${item.d}
                </p>


                <div class="option-title">
                    Choose size
                </div>


                <div
                    class="options"
                    id="sizes"
                >

                    ${
                        Object.entries(
                            item.s
                        )
                        .map(
                            ([s,p],i) => `
                                <button
                                    class="
                                        option
                                        ${i === 0 ? "selected" : ""}
                                    "
                                    data-size="${s}"
                                >
                                    ${s} · ${money(p)}
                                </button>
                            `
                        )
                        .join("")
                    }

                </div>


                <div class="option-title">
                    Choose base
                </div>


                <div
                    class="options"
                    id="bases"
                >

                    <button
                        class="option selected"
                        data-base="Thin Crust"
                    >
                        Thin Crust
                    </button>


                    <button
                        class="option"
                        data-base="Cheesy Burst"
                    >
                        Cheesy Burst +₹89
                    </button>

                </div>


                <div class="option-title">
                    Extra toppings
                </div>


                <div
                    class="options"
                    id="tops"
                >

                    ${
                        TOPPINGS
                        .map(
                            ([name,price]) => `
                                <button
                                    class="option"
                                    data-top="${name}"
                                >
                                    ${name}
                                    +${money(price)}
                                </button>
                            `
                        )
                        .join("")
                    }

                </div>


                <div
                    class="product-foot"
                    style="margin-top:22px"
                >

                    <b id="itemPrice">
                        ${money(item.s.S)}
                    </b>


                    <button
                        class="btn primary"
                        id="itemAdd"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    `;


    $("#itemModal")
        .classList.add("show");


    function total() {

        const toppingTotal =
            tops.reduce(
                (sum,name) => {

                    const topping =
                        TOPPINGS.find(
                            x => x[0] === name
                        );

                    return sum +
                        (topping?.[1] || 0);

                },
                0
            );


        return (
            item.s[size] +
            (
                base === "Cheesy Burst"
                ? 89
                : 0
            ) +
            toppingTotal
        );

    }


    document
        .querySelectorAll(
            "#sizes .option"
        )
        .forEach(button => {

            button.onclick = () => {

                document
                    .querySelectorAll(
                        "#sizes .option"
                    )
                    .forEach(
                        x =>
                            x.classList.remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                size =
                    button.dataset.size;


                $("#itemPrice")
                    .textContent =
                    money(total());

            };

        });


    document
        .querySelectorAll(
            "#bases .option"
        )
        .forEach(button => {

            button.onclick = () => {

                document
                    .querySelectorAll(
                        "#bases .option"
                    )
                    .forEach(
                        x =>
                            x.classList.remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                base =
                    button.dataset.base;


                $("#itemPrice")
                    .textContent =
                    money(total());

            };

        });


    document
        .querySelectorAll(
            "#tops .option"
        )
        .forEach(button => {

            button.onclick = () => {

                button.classList.toggle(
                    "selected"
                );


                const name =
                    button.dataset.top;


                if (
                    tops.includes(name)
                ) {

                    tops =
                        tops.filter(
                            x => x !== name
                        );

                } else {

                    tops.push(name);

                }


                $("#itemPrice")
                    .textContent =
                    money(total());

            };

        });


    $("#itemAdd").onclick = () => {

        add({

            id:item.id,

            name:item.n,

            price:total(),

            qty:1,

            custom:
                `${size}, ${base}` +
                (
                    tops.length
                    ?
                    " + " +
                    tops.join(", ")
                    :
                    ""
                )

        });


        $("#itemModal")
            .classList.remove("show");

    };

}


/* ================= CART ================= */

function renderCart() {

    const count =
        cart.reduce(
            (sum,item) =>
                sum + item.qty,
            0
        );


    const subtotal =
        cart.reduce(
            (sum,item) =>
                sum +
                item.price *
                item.qty,
            0
        );


    if ($("#cartCount"))
        $("#cartCount").textContent =
            count;


    if ($("#subtotal"))
        $("#subtotal").textContent =
            money(subtotal);


    if ($("#total"))
        $("#total").textContent =
            money(subtotal);


    if (!$("#cartItems"))
        return;


    $("#cartItems").innerHTML =

        cart.length

        ?

        cart.map(
            (item,index) => `

                <div class="cart-row">

                    <div class="mini">

                        ${
                            MENU.find(
                                x =>
                                    x.id === item.id
                            )?.e
                            ||
                            "🍽️"
                        }

                    </div>


                    <div>

                        <h4>
                            ${item.name}
                        </h4>


                        <small>
                            ${item.custom || ""}
                        </small>


                        <div class="qty">

                            <button
                                data-minus="${index}"
                            >
                                −
                            </button>


                            <b>
                                ${item.qty}
                            </b>


                            <button
                                data-plus="${index}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <b>
                        ${money(
                            item.price *
                            item.qty
                        )}
                    </b>

                </div>

            `
        ).join("")

        :

        `
            <div
                style="
                    text-align:center;
                    padding:60px 10px;
                    color:#777
                "
            >
                Your cart is empty.
                <br><br>
                🍕
            </div>
        `;


    document
        .querySelectorAll(
            "[data-minus]"
        )
        .forEach(button => {

            button.onclick = () => {

                const index =
                    Number(
                        button.dataset.minus
                    );


                cart[index].qty--;


                if (
                    cart[index].qty <= 0
                ) {

                    cart.splice(
                        index,
                        1
                    );

                }


                saveCart();

            };

        });


    document
        .querySelectorAll(
            "[data-plus]"
        )
        .forEach(button => {

            button.onclick = () => {

                const index =
                    Number(
                        button.dataset.plus
                    );


                cart[index].qty++;

                saveCart();

            };

        });

}


/* ================= CART UI ================= */

function openCart() {

    $("#cartDrawer")
        ?.classList.add("show");

    $("#cartBackdrop")
        ?.classList.add("show");

    renderCart();

}


function closeCart() {

    $("#cartDrawer")
        ?.classList.remove("show");

    $("#cartBackdrop")
        ?.classList.remove("show");

}


$("#openCart")?.addEventListener(
    "click",
    openCart
);


$("#closeCart")?.addEventListener(
    "click",
    closeCart
);


$("#cartBackdrop")?.addEventListener(
    "click",
    closeCart
);


/* ================= SEARCH ================= */

$("#search")?.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value;

        renderProducts();

    }
);


/* ================= CHECKOUT ================= */

$("#checkoutBtn")?.addEventListener(
    "click",
    () => {

        if (!cart.length) {

            toast(
                "Add something to your cart first"
            );

            return;

        }


        closeCart();

        $("#checkoutModal")
            ?.classList.add("show");

    }
);


/* ================= MODAL CLOSE ================= */

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.onclick = () => {

            const id =
                button.dataset.close;

            $("#" + id)
                ?.classList.remove("show");

        };

    });


/* ================= PAYMENT ================= */

document
    .querySelectorAll(
        'input[name="payment"]'
    )
    .forEach(radio => {

        radio.onchange = () => {

            if (!radio.checked)
                return;


            $("#upiNotice")
                ?.classList.toggle(
                    "hidden",
                    radio.value !== "upi"
                );

        };

    });


/* =========================================================
   SEND ORDER TO BACKEND
========================================================= */

async function sendToApi(order) {

    const response =
        await fetch(
            API_URL + "/api/orders",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(order)
            }
        );


    const data =
        await response
            .json()
            .catch(() => ({}));


    if (!response.ok) {

        throw new Error(
            data.detail ||
            "Order could not be placed"
        );

    }


    return data;

}


/* ================= PLACE ORDER ================= */

$("#checkoutForm")?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        if (!cart.length) {

            toast(
                "Your cart is empty"
            );

            return;

        }


        const form =
            new FormData(
                event.target
            );


        const subtotal =
            cart.reduce(
                (sum,item) =>
                    sum +
                    item.price *
                    item.qty,
                0
            );


        const deliveryCharge = 0;

        const discount = 0;

        const total =
            subtotal +
            deliveryCharge -
            discount;


        const order = {

            customer_name:
                form.get("name") || "",

            phone:
                form.get("phone") || "",

            address:
                [
                    form.get("house"),
                    form.get("area"),
                    form.get("landmark")
                ]
                .filter(Boolean)
                .join(", "),

            fulfilment:
                form.get("fulfilment")
                ||
                "delivery",

            payment:
                form.get("payment")
                ||
                "cod",

            items:
                cart.map(item => ({
                    id:item.id,
                    name:item.name,
                    price:item.price,
                    qty:item.qty,
                    custom:item.custom || ""
                })),

            subtotal:

                subtotal,

            delivery_charge:

                deliveryCharge,

            discount:

                discount,

            total:

                total,

            note:
                form.get("note") || ""

        };


        const submitButton =
            event.target.querySelector(
                'button[type="submit"]'
            );


        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.textContent =
                "Placing Order...";

        }


        try {

            /* FIRST: SAVE TO DATABASE */

            const result =
                await sendToApi(
                    order
                );


            const orderNo = result.order_no;
            latestCustomerOrderNo=orderNo;
            myOrdersPhone=String(order.phone||"").replace(/\D/g,"");
            localStorage.setItem("pf_latest_order_no",orderNo);
            localStorage.setItem("pf_customer_phone",myOrdersPhone);

            successPhone = String(order.phone || "").trim();
            successOrderNo = orderNo;


            /* SECOND: WHATSAPP MESSAGE */

            const lines = [

                "🍕 *NEW PIZZA FIRE ORDER*",

                `Order: ${orderNo}`,

                `Customer: ${order.customer_name}`,

                `Mobile: ${order.phone}`,

                `Type: ${order.fulfilment}`,

                `Payment: ${order.payment.toUpperCase()}`,

                "",

                ...cart.map(
                    item =>
                        `• ${item.qty} × ${item.name}` +
                        (
                            item.custom
                            ?
                            ` (${item.custom})`
                            :
                            ""
                        ) +
                        ` — ${money(
                            item.price *
                            item.qty
                        )}`
                ),

                "",

                `Subtotal: ${money(
                    subtotal
                )}`,

                `Delivery: ${money(
                    deliveryCharge
                )}`,

                `Discount: -${money(
                    discount
                )}`,

                `TOTAL: ${money(
                    total
                )}`,

                "",

                `Address: ${order.address}`,

                order.note
                    ?
                    `Note: ${order.note}`
                    :
                    ""

            ]
            .filter(Boolean)
            .join("\n");


            /* CLEAR CART */

            cart = [];

            saveCart();

            event.target.reset();


            $("#checkoutModal")
                ?.classList.remove(
                    "show"
                );


            /* SUCCESS */

            if ($("#successText")) {

                $("#successText")
                    .textContent =
                    `Order ${orderNo} created successfully.`;

            }


            if ($("#successSummary")) {

                $("#successSummary")
                    .innerHTML = `

                        <b>
                            ${money(total)}
                        </b>

                        <br>

                        ${
                            order.fulfilment ===
                            "delivery"
                            ?
                            "Home delivery"
                            :
                            "Store pickup"
                        }

                        ·

                        ${
                            order.payment ===
                            "cod"
                            ?
                            "Cash on Delivery"
                            :
                            "UPI"
                        }

                        <br>

                        ${order.address}

                    `;

            }


            if ($("#waLink")) {

                $("#waLink").href =
                    `https://wa.me/${WHATSAPP}?text=${
                        encodeURIComponent(
                            lines
                        )
                    }`;

            }


            $("#successModal")?.classList.add("show");
            waitForConfirmation(orderNo,myOrdersPhone);

        }

        catch (error) {

            console.error(
                "ORDER ERROR:",
                error
            );


            alert(
                "Order place nahi hua: " +
                error.message
            );

        }

        finally {

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Place Order";

            }

        }

    }
);



/* ================= MY ORDERS ================= */
let myOrdersPhone=localStorage.getItem("pf_customer_phone")||"";
let latestCustomerOrderNo="";
let confirmationTimer=null;
function esc(v){return String(v??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[x]));}
function statusInfo(s){return({new:["Order Received","Waiting for the store to confirm your order."],accepted:["Confirmed","Your order has been accepted."],preparing:["Preparing","Your food is being prepared."],ready:["Ready","Your order is ready."],out_for_delivery:["Out for Delivery","Your order is on the way."],delivered:["Delivered","Order delivered. Enjoy!"],rejected:["Rejected","This order was rejected by the store."]}[s]||["Processing","Your order is being processed."]);}
function orderDate(v){if(!v)return "";const d=new Date(v);return Number.isNaN(d.getTime())?v:d.toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});}
function renderMyOrders(list){const box=$("#myOrdersList");if(!box)return;if(!list.length){box.innerHTML='<div class="my-orders-empty"><div>🍕</div><h3>No orders found</h3><p>We could not find orders for this mobile number.</p></div>';return;}box.innerHTML=list.map(o=>{const [label,desc]=statusInfo(o.status),closed=["delivered","rejected"].includes(o.status),items=Array.isArray(o.items)?o.items:[];return `<article class="my-order-card"><div class="my-order-top"><div><span class="eyebrow">ORDER</span><h3>#${esc(o.order_no)}</h3><span class="my-order-date">${esc(orderDate(o.created_at))}</span></div><span class="my-order-status ${o.status==='delivered'?'done':o.status==='rejected'?'rejected':''}">${esc(label)}</span></div><div class="my-order-items">${items.map(i=>`<div class="my-order-item"><span>${esc(i.qty||1)} × ${esc(i.name||'Item')}</span><b>${money(Number(i.price||0)*Number(i.qty||1))}</b></div>`).join('')}</div><div class="my-order-bottom"><div><span>${esc(desc)}</span><strong>${money(o.total||0)}</strong></div>${closed?`<span class="delivered-label">${o.status==='delivered'?'✓ Delivered':'Order closed'}</span>`:`<button class="btn primary my-track-btn" data-order-no="${esc(o.order_no)}">Track This Order →</button>`}</div></article>`;}).join("");document.querySelectorAll('.my-track-btn').forEach(b=>b.onclick=()=>trackCustomerOrder(b.dataset.orderNo));}
async function loadMyOrders(phone){
    phone=(phone||myOrdersPhone||localStorage.getItem("pf_customer_phone")||"").replace(/\D/g,"");
    if(!/^\d{10}$/.test(phone)){
        const box=$("#myOrdersList");
        if(box) box.innerHTML=`<div class="my-orders-empty"><div>🍕</div><h3>No orders yet</h3><p>Place your first order and it will automatically appear here.</p><a class="btn primary" href="#menu">Order Now →</a></div>`;
        return;
    }
    myOrdersPhone=phone;
    localStorage.setItem("pf_customer_phone",phone);
    try{
        const r=await fetch(`${API_URL}/api/customer/orders?phone=${encodeURIComponent(phone)}`);
        const d=await r.json().catch(()=>[]);
        if(!r.ok) throw Error(d.detail||"Unable to load orders");
        localStorage.setItem("pf_customer_orders",JSON.stringify(d));
        renderMyOrders(d);
    }catch(e){
        console.error("MY ORDERS ERROR",e);
        const cached=JSON.parse(localStorage.getItem("pf_customer_orders")||"[]").filter(x=>String(x.phone||"").replace(/\D/g,"")===phone);
        renderMyOrders(cached);
    }
}
async function trackCustomerOrder(no){try{const r=await fetch(`${API_URL}/api/orders/${encodeURIComponent(no)}?phone=${encodeURIComponent(myOrdersPhone)}`);const o=await r.json().catch(()=>({}));if(!r.ok)throw Error(o.detail||"Order not found");const [label,desc]=statusInfo(o.status);const box=$("#myOrdersList");box.innerHTML=`<div class="tracking-card"><div class="tracking-head"><div><span class="eyebrow">LIVE ORDER</span><h3>#${esc(o.order_no)}</h3></div><button class="btn ghost" id="backMyOrders">← All Orders</button></div><div class="tracking-status"><span class="tracking-dot"></span><div><strong>${esc(label)}</strong><p>${esc(desc)}</p></div></div><div class="tracking-total"><span>Total</span><strong>${money(o.total||0)}</strong></div></div>`;$("#backMyOrders").onclick=()=>loadMyOrders();}catch(e){toast(e.message||"Unable to track order");}}
function waitForConfirmation(no,phone){const b=$("#trackThisOrder");if(!b)return;b.classList.add("hidden");if(confirmationTimer)clearInterval(confirmationTimer);let tries=0;const check=async()=>{tries++;try{const r=await fetch(`${API_URL}/api/orders/${encodeURIComponent(no)}?phone=${encodeURIComponent(phone)}`);if(!r.ok)return;const o=await r.json();if(["accepted","preparing","ready","out_for_delivery","delivered"].includes(o.status)){b.classList.remove("hidden");b.onclick=async e=>{e.preventDefault();$("#successModal")?.classList.remove("show");await loadMyOrders(phone);$("#my-orders")?.scrollIntoView({behavior:"smooth"});setTimeout(()=>trackCustomerOrder(no),100);};clearInterval(confirmationTimer);}if(o.status==='rejected'||tries>=60){clearInterval(confirmationTimer);}}catch(e){}};check();confirmationTimer=setInterval(check,5000);}
$("#refreshMyOrders")?.addEventListener("click",()=>loadMyOrders());
if(myOrdersPhone) loadMyOrders(myOrdersPhone);

/* ================= INIT ================= */

if ($("#year")) {

    $("#year").textContent =
        new Date().getFullYear();

}


renderCats();

renderProducts();

renderCart();
