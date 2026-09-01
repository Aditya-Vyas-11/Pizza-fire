const API_URL = "http://127.0.0.1:8000";
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
                    "Content-Type":"application/json",
                    ...(localStorage.getItem("pf_customer_token") ? {"Authorization":"Bearer "+localStorage.getItem("pf_customer_token")} : {})
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


            const orderNo =
                result.order_no;

            successPhone = String(order.phone || "").trim();

            pfSaveCustomerPhone(successPhone);
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


            $("#successModal")
                ?.classList.add(
                    "show"
                );

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


/* ================= INIT ================= */

if ($("#year")) {

    $("#year").textContent =
        new Date().getFullYear();

}


renderCats();

renderProducts();

renderCart();


/* =========================================================
   CUSTOMER AUTH + MY ORDERS
========================================================= */

const PF_CUSTOMER_TOKEN_KEY="pf_customer_token";
const PF_CUSTOMER_KEY="pf_customer_account";
const pfCustomerToken=()=>localStorage.getItem(PF_CUSTOMER_TOKEN_KEY)||"";
const pfCustomer=()=>{try{return JSON.parse(localStorage.getItem(PF_CUSTOMER_KEY)||"null")}catch(e){return null}};
const pfSetCustomer=(token,customer)=>{localStorage.setItem(PF_CUSTOMER_TOKEN_KEY,token);localStorage.setItem(PF_CUSTOMER_KEY,JSON.stringify(customer));};
const pfClearCustomer=()=>{localStorage.removeItem(PF_CUSTOMER_TOKEN_KEY);localStorage.removeItem(PF_CUSTOMER_KEY);};

function pfAuthOpen(mode="login"){
    const m=$("#pfAuthModal"); if(!m)return;
    m.classList.add("open");
    m.dataset.mode=mode;
    $("#pfRegisterFields")?.classList.toggle("hidden",mode!=="register");
    $("#pfAuthTitle").textContent=mode==="register"?"Create your account":"Welcome back";
    $("#pfAuthSubtitle").textContent=mode==="register"?"Create an account to keep every Pizza Fire order in My Orders.":"Login to view your orders and place orders faster.";
    $("#pfAuthSubmit").textContent=mode==="register"?"Create Account":"Login";
    $("#pfAuthSwitch").textContent=mode==="register"?"Already have an account? Login":"New here? Create an account";
    $("#pfAuthMessage").textContent="";
}
function pfAuthClose(){$("#pfAuthModal")?.classList.remove("open");}
function pfUpdateAccountButton(){const c=pfCustomer(),b=$("#accountBtn");if(!b)return;b.textContent=c?`Hi, ${String(c.name||"Account").split(" ")[0]} ▾`:"Login";}
async function pfCustomerAuth(){
    const mode=$("#pfAuthModal")?.dataset.mode||"login";
    const msg=$("#pfAuthMessage");
    const body=mode==="register"?{name:$("#pfAuthName").value.trim(),phone:$("#pfAuthPhone").value.trim(),email:$("#pfAuthEmail").value.trim(),password:$("#pfAuthPassword").value}:{email:$("#pfAuthEmail").value.trim(),password:$("#pfAuthPassword").value};
    msg.textContent="";
    try{
        const r=await fetch(API_URL+`/api/customer/${mode}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
        const data=await r.json().catch(()=>({}));
        if(!r.ok)throw new Error(data.detail||"Unable to continue");
        pfSetCustomer(data.token,data.customer); pfAuthClose(); pfUpdateAccountButton(); pfFillCheckout(); pfLoadMyOrders();
        toast(`Welcome, ${data.customer.name}!`);
    }catch(e){msg.textContent=e.message||"Something went wrong";}
}
function pfFillCheckout(){const c=pfCustomer();if(!c)return;const f=$("#checkoutForm");if(!f)return;const set=(n,v)=>{const el=f.querySelector(`[name="${n}"]`);if(el&&v)el.value=v};set("name",c.name);set("phone",c.phone);}

$("#accountBtn")?.addEventListener("click",()=>{
    if(!pfCustomer()){pfAuthOpen("login");return;}
    if(confirm("Logout from Pizza Fire?")){pfClearCustomer();pfUpdateAccountButton();pfLoadMyOrders();toast("Logged out");}
});
$("#pfAuthClose")?.addEventListener("click",pfAuthClose);
$("#pfAuthModal")?.addEventListener("click",e=>{if(e.target.id==="pfAuthModal")pfAuthClose();});
$("#pfAuthSwitch")?.addEventListener("click",()=>pfAuthOpen(( $("#pfAuthModal").dataset.mode||"login")==="login"?"register":"login"));
$("#pfAuthForm")?.addEventListener("submit",e=>{e.preventDefault();pfCustomerAuth();});

/* Require a customer account before checkout. */
$("#checkoutBtn")?.addEventListener("click",e=>{
    if(!pfCustomer()){
        e.stopImmediatePropagation();
        pfAuthOpen("login");
        return;
    }
    pfFillCheckout();
},true);

async function pfLoadMyOrders(){
    const box=$("#myOrdersList"); if(!box)return;
    const c=pfCustomer();
    if(!c){
        box.innerHTML=`<div class="my-orders-empty"><div>🔐</div><h3>Login to see your orders</h3><p>Your active and past orders are saved securely to your account.</p><button class="btn primary" id="pfLoginOrders">Login / Sign Up</button></div>`;
        $("#pfLoginOrders")?.addEventListener("click",()=>pfAuthOpen("login")); return;
    }
    try{
        const r=await fetch(API_URL+"/api/customer/orders",{headers:{"Authorization":"Bearer "+pfCustomerToken()}});
        const data=await r.json().catch(()=>[]);
        if(r.status===401){pfClearCustomer();pfUpdateAccountButton();pfLoadMyOrders();return;}
        if(!r.ok)throw new Error(data.detail||"Unable to load orders");
        if(!data.length){box.innerHTML=`<div class="my-orders-empty"><div>🍕</div><h3>No orders yet</h3><p>Place your first order and it will appear here automatically.</p><a class="btn primary" href="#menu">Order Now</a></div>`;return;}
        box.innerHTML=data.map(pfOrderCard).join("");
    }catch(e){console.error("MY ORDERS ERROR:",e);box.innerHTML=`<div class="my-orders-empty"><div>⚠️</div><h3>Couldn't load orders</h3><p>Please check that the Pizza Fire server is running.</p><button class="btn primary" id="retryMyOrders">Try Again</button></div>`;$("#retryMyOrders")?.addEventListener("click",pfLoadMyOrders);}
}
function pfStatusLabel(s){return({new:"Order Received",accepted:"Confirmed",preparing:"Preparing",ready:"Ready",out_for_delivery:"Out for Delivery",delivered:"Delivered",rejected:"Rejected"})[s]||"Order Received";}
function pfOrderCard(o){
    let items=[];try{items=Array.isArray(o.items)?o.items:JSON.parse(o.items_json||"[]")}catch(e){}
    const names=items.map(x=>`${x.qty||1}× ${x.name||"Item"}`).join(", ");
    const active=!['delivered','rejected'].includes(o.status);
    const action=active?`<button class="btn primary my-order-track" data-order-id="${Number(o.id)}">Track This Order →</button>`:o.status==="delivered"?`<span class="my-order-delivered">✓ Delivered</span>`:`<span class="my-order-rejected">Order Closed</span>`;
    return `<article class="my-order-card ${active?'active-order':''}"><div class="my-order-top"><div><span class="eyebrow">ORDER</span><h3>#${pfEscape(o.order_no)}</h3></div><span class="my-order-status ${pfEscape(o.status)}">${pfStatusLabel(o.status)}</span></div><div class="my-order-items">${pfEscape(names||"Order items")}</div><div class="my-order-bottom"><div><span class="my-order-total-label">TOTAL</span><strong>₹${Number(o.total||0).toLocaleString('en-IN')}</strong></div><div>${action}</div></div></article>`;
}
async function pfTrackOrder(id){
    const r=await fetch(API_URL+"/api/customer/orders",{headers:{"Authorization":"Bearer "+pfCustomerToken()}});const orders=await r.json();const o=orders.find(x=>Number(x.id)===Number(id));if(!o){alert("Order not found");return;}
    const steps=["new","accepted","preparing","ready","out_for_delivery","delivered"],labels={new:"Order Received",accepted:"Confirmed",preparing:"Preparing",ready:"Ready",out_for_delivery:"Out for Delivery",delivered:"Delivered"},cur=steps.indexOf(o.status);$("#pfOrderTrackingModal")?.remove();const m=document.createElement("div");m.id="pfOrderTrackingModal";m.className="pf-order-modal";m.innerHTML=`<div class="pf-order-overlay" data-close-track></div><div class="pf-order-dialog"><button class="pf-order-close" data-close-track>×</button><span class="eyebrow">ORDER TRACKING</span><h2>#${pfEscape(o.order_no)}</h2><p>${labels[o.status]||pfStatusLabel(o.status)}</p><div class="pf-order-steps">${steps.map((s,i)=>`<div class="pf-order-step ${i<=cur?'done':''} ${i===cur?'current':''}"><b>${i<cur?'✓':i+1}</b><span>${labels[s]}</span></div>`).join('')}</div><div class="pf-order-info"><span>${pfEscape((o.items||[]).map(x=>`${x.qty||1}× ${x.name||'Item'}`).join(', '))}</span><strong>₹${Number(o.total||0).toLocaleString('en-IN')}</strong></div></div>`;document.body.appendChild(m);m.querySelectorAll('[data-close-track]').forEach(x=>x.onclick=()=>m.remove());
}
document.addEventListener("click",e=>{const b=e.target.closest(".my-order-track");if(b)pfTrackOrder(b.dataset.orderId);});
$("#refreshMyOrders")?.addEventListener("click",pfLoadMyOrders);

/* Keep checkout form synced to the logged-in account. */
$("#checkoutBtn")?.addEventListener("click",()=>setTimeout(pfFillCheckout,50));

/* Show confirmation button only after admin accepts the latest order. */
let pfConfirmationTimer=null;
async function pfWaitForAcceptance(orderNo){
    if(pfConfirmationTimer)clearInterval(pfConfirmationTimer);let tries=0;
    const check=async()=>{tries++;try{const r=await fetch(API_URL+`/api/customer/orders`,{headers:{"Authorization":"Bearer "+pfCustomerToken()}});const orders=await r.json();const o=orders.find(x=>x.order_no===orderNo);if(o&&o.status&&o.status!=="new"){if(o.status!=="rejected"){const b=$("#trackThisOrder");if(b){b.classList.remove("hidden");b.onclick=()=>{location.hash="#my-orders";pfLoadMyOrders();}}const n=$("#successSummary");if(n&&!n.dataset.confirmed){n.dataset.confirmed="1";n.insertAdjacentHTML("beforeend","<div style='margin-top:10px;font-size:12px'><b>✓ Order confirmed by Pizza Fire</b></div>");}}clearInterval(pfConfirmationTimer);pfLoadMyOrders();}}catch(e){}if(tries>=40)clearInterval(pfConfirmationTimer)};check();pfConfirmationTimer=setInterval(check,3000);
}
const pfSuccessTarget=$("#successText");if(pfSuccessTarget){const obs=new MutationObserver(()=>{const t=pfSuccessTarget.textContent||"",m=t.match(/Order\s+(\S+)\s+created/i);if(m){$("#trackThisOrder")?.classList.add("hidden");pfWaitForAcceptance(m[1]);pfLoadMyOrders();}});obs.observe(pfSuccessTarget,{childList:true,characterData:true,subtree:true});}

pfUpdateAccountButton();pfFillCheckout();pfLoadMyOrders();
setInterval(()=>{if(location.hash==="#my-orders"&&pfCustomer())pfLoadMyOrders()},15000);
