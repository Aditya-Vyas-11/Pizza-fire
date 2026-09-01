import os
import json
import sqlite3
import hashlib
import hmac
import secrets
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# =========================================================
# CONFIG
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

DB_PATH = os.getenv(
    "DB_PATH",
    str(BASE_DIR / "pizza_fire.db")
)

ADMIN_EMAIL = os.getenv(
    "ADMIN_EMAIL",
    "owner@pizzafire.com"
)

ADMIN_PASSWORD = os.getenv(
    "ADMIN_PASSWORD",
    "PizzaFire@12345"
)

AUTH_SECRET = os.getenv(
    "AUTH_SECRET",
    "CHANGE_THIS_SECRET"
)

ORDER_PHONE = os.getenv(
    "ORDER_PHONE",
    "7467066077"
)


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="Pizza Fire API",
    version="2.0.0"
)


# IMPORTANT:
# Allows requests from Live Server, localhost,
# 127.0.0.1 and file-based testing.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE
# =========================================================

def get_db():

    connection = sqlite3.connect(
        DB_PATH
    )

    connection.row_factory = sqlite3.Row

    return connection


def now():

    return datetime.now().isoformat(
        timespec="seconds"
    )


# =========================================================
# SECURITY
# =========================================================

def hash_password(password):

    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest()


def verify_password(
    password,
    password_hash
):

    return hmac.compare_digest(
        hash_password(password),
        password_hash
    )


def create_token():

    timestamp = str(
        int(
            datetime.now().timestamp()
        )
    )

    random_part = secrets.token_hex(32)

    raw = (
        timestamp
        + "."
        + random_part
    )

    signature = hmac.new(
        AUTH_SECRET.encode("utf-8"),
        raw.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()

    return (
        raw
        + "."
        + signature
    )


def verify_token(
    authorization
):

    if not authorization:

        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )


    if not authorization.startswith(
        "Bearer "
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid authorization"
        )


    token = authorization.split(
        " ",
        1
    )[1]


    parts = token.split(".")


    if len(parts) != 3:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


    timestamp = parts[0]

    raw = ".".join(
        parts[:2]
    )


    expected_signature = hmac.new(
        AUTH_SECRET.encode("utf-8"),
        raw.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()


    if not hmac.compare_digest(
        expected_signature,
        parts[2]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


    try:

        created = int(timestamp)

    except ValueError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


    current_time = int(
        datetime.now().timestamp()
    )


    if current_time - created > 86400:

        raise HTTPException(
            status_code=401,
            detail="Session expired"
        )


    return True


# =========================================================
# DATABASE INITIALIZATION
# =========================================================

def init_database():

    connection = get_db()

    cursor = connection.cursor()


    # -----------------------------------------------------
    # ADMIN
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)


    # -----------------------------------------------------
    # MENU
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            emoji TEXT DEFAULT '🍕',
            image TEXT DEFAULT '',
            description TEXT DEFAULT '',
            active INTEGER DEFAULT 1,
            custom INTEGER DEFAULT 0,
            bestseller INTEGER DEFAULT 0,
            created_at TEXT NOT NULL
        )
    """)


    # -----------------------------------------------------
    # TOPPINGS
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS toppings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            active INTEGER DEFAULT 1
        )
    """)


    # -----------------------------------------------------
    # DELIVERY AREAS
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS delivery_areas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area TEXT NOT NULL,
            charge REAL NOT NULL DEFAULT 0,
            min_order REAL NOT NULL DEFAULT 0,
            active INTEGER DEFAULT 1
        )
    """)


    # -----------------------------------------------------
    # OFFERS
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS offers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            discount_type TEXT NOT NULL,
            discount_value REAL NOT NULL,
            minimum_order REAL DEFAULT 0,
            max_discount REAL DEFAULT 0,
            active INTEGER DEFAULT 1,
            created_at TEXT NOT NULL
        )
    """)


    # -----------------------------------------------------
    # SETTINGS
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )
    """)


    # -----------------------------------------------------
    # ORDERS
    # -----------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            customer_name TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            fulfilment TEXT DEFAULT 'delivery',
            payment TEXT NOT NULL,
            items_json TEXT NOT NULL,
            subtotal REAL NOT NULL DEFAULT 0,
            delivery_charge REAL NOT NULL DEFAULT 0,
            discount REAL NOT NULL DEFAULT 0,
            total REAL NOT NULL DEFAULT 0,
            note TEXT DEFAULT '',
            status TEXT DEFAULT 'new',
            created_at TEXT NOT NULL
        )
    """)


    # =====================================================
    # ADMIN ACCOUNT
    # =====================================================

    admin = cursor.execute(
        """
        SELECT id
        FROM admins
        LIMIT 1
        """
    ).fetchone()


    if admin is None:

        cursor.execute(
            """
            INSERT INTO admins
            (
                email,
                password_hash,
                created_at
            )
            VALUES (?, ?, ?)
            """,
            (
                ADMIN_EMAIL,
                hash_password(
                    ADMIN_PASSWORD
                ),
                now()
            )
        )

    else:

        cursor.execute(
            """
            UPDATE admins

            SET
                email = ?,
                password_hash = ?

            WHERE id = ?
            """,
            (
                ADMIN_EMAIL,
                hash_password(
                    ADMIN_PASSWORD
                ),
                admin["id"]
            )
        )


    # =====================================================
    # DEFAULT SETTINGS
    # =====================================================

    default_settings = {

        "store_name":
            "Pizza Fire",

        "phone":
            ORDER_PHONE,

        "opening_time":
            "10:00",

        "closing_time":
            "22:00",

        "store_open":
            "true",

        "upi_id":
            "",

        "address":
            "Kela Devi Road, Near HP Petrol Pump, Opposite MRF Showroom, Hathi Ghata, Ganesh Colony, Karauli, Rajasthan 322241",

        "delivery_enabled":
            "true"

    }


    for key, value in default_settings.items():

        cursor.execute(
            """
            INSERT OR IGNORE INTO settings
            (
                key,
                value
            )
            VALUES (?, ?)
            """,
            (
                key,
                value
            )
        )


    connection.commit()

    connection.close()


# =========================================================
# REQUEST MODELS
# =========================================================

class LoginRequest(BaseModel):

    email: str

    password: str


class MenuItemRequest(BaseModel):

    name: str

    category: str

    price: float

    emoji: str = "🍕"

    image: str = ""

    description: str = ""

    active: int = 1

    custom: int = 0

    bestseller: int = 0


class ToppingRequest(BaseModel):

    name: str

    price: float

    active: int = 1


class DeliveryAreaRequest(BaseModel):

    area: str

    charge: float = 0

    min_order: float = 0

    active: int = 1


class OfferRequest(BaseModel):

    code: str

    title: str

    discount_type: str

    discount_value: float

    minimum_order: float = 0

    max_discount: float = 0

    active: int = 1


class SettingRequest(BaseModel):

    value: str


class OrderRequest(BaseModel):

    customer_name: str

    phone: str

    address: str

    fulfilment: str = "delivery"

    payment: str

    items: list

    subtotal: float

    delivery_charge: float = 0

    discount: float = 0

    total: float

    note: str = ""


class OrderStatusRequest(BaseModel):

    status: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@app.post("/api/admin/change-password")
def change_password(
    request: ChangePasswordRequest,
    authorization: str = Header(None)
):
    verify_token(authorization)

    if len(request.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters"
        )

    connection = get_db()
    admin = connection.execute(
        "SELECT * FROM admins LIMIT 1"
    ).fetchone()

    if admin is None or not verify_password(
        request.current_password,
        admin["password_hash"]
    ):
        connection.close()
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    connection.execute(
        "UPDATE admins SET password_hash=? WHERE id=?",
        (hash_password(request.new_password), admin["id"])
    )
    connection.commit()
    connection.close()

    return {
        "ok": True,
        "message": "Password changed successfully"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/")
def root():

    return {
        "ok": True,
        "service": "Pizza Fire API"
    }


@app.get("/health")
def health():

    return {
        "ok": True,
        "service": "Pizza Fire API"
    }


# =========================================================
# ADMIN LOGIN
# =========================================================

@app.post("/api/admin/login")
def admin_login(
    request: LoginRequest
):

    connection = get_db()


    admin = connection.execute(
        """
        SELECT *
        FROM admins
        WHERE email = ?
        """,
        (
            request.email.strip(),
        )
    ).fetchone()


    connection.close()


    if admin is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    if not verify_password(
        request.password,
        admin["password_hash"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    return {

        "ok": True,

        "token":
            create_token(),

        "email":
            admin["email"]

    }


# =========================================================
# PUBLIC MENU
# =========================================================

@app.get("/api/menu")
def get_public_menu():

    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM menu_items

        WHERE active = 1

        ORDER BY
            category ASC,
            name ASC
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


# =========================================================
# ADMIN MENU
# =========================================================

@app.get("/api/admin/menu")
def get_admin_menu(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM menu_items

        ORDER BY
            category ASC,
            name ASC
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.post("/api/admin/menu")
def create_menu_item(
    item: MenuItemRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        INSERT INTO menu_items
        (
            name,
            category,
            price,
            emoji,
            image,
            description,
            active,
            custom,
            bestseller,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            item.name.strip(),
            item.category.strip(),
            item.price,
            item.emoji,
            item.image,
            item.description,
            item.active,
            item.custom,
            item.bestseller,
            now()
        )
    )


    connection.commit()

    item_id = cursor.lastrowid

    connection.close()


    return {
        "ok": True,
        "id": item_id
    }


@app.patch("/api/admin/menu/{item_id}")
def update_menu_item(
    item_id: int,
    item: MenuItemRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        UPDATE menu_items

        SET
            name = ?,
            category = ?,
            price = ?,
            emoji = ?,
            image = ?,
            description = ?,
            active = ?,
            custom = ?,
            bestseller = ?

        WHERE id = ?
        """,
        (
            item.name.strip(),
            item.category.strip(),
            item.price,
            item.emoji,
            item.image,
            item.description,
            item.active,
            item.custom,
            item.bestseller,
            item_id
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )


    return {
        "ok": True
    }


@app.delete("/api/admin/menu/{item_id}")
def delete_menu_item(
    item_id: int,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        DELETE FROM menu_items
        WHERE id = ?
        """,
        (
            item_id,
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )


    return {
        "ok": True
    }


# =========================================================
# TOPPINGS
# =========================================================

@app.get("/api/toppings")
def get_public_toppings():

    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM toppings

        WHERE active = 1

        ORDER BY name
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.get("/api/admin/toppings")
def get_admin_toppings(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM toppings

        ORDER BY name
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.post("/api/admin/toppings")
def create_topping(
    topping: ToppingRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        INSERT INTO toppings
        (
            name,
            price,
            active
        )
        VALUES (?, ?, ?)
        """,
        (
            topping.name.strip(),
            topping.price,
            topping.active
        )
    )


    connection.commit()

    topping_id = cursor.lastrowid

    connection.close()


    return {
        "ok": True,
        "id": topping_id
    }


@app.patch("/api/admin/toppings/{topping_id}")
def update_topping(
    topping_id: int,
    topping: ToppingRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        UPDATE toppings

        SET
            name = ?,
            price = ?,
            active = ?

        WHERE id = ?
        """,
        (
            topping.name.strip(),
            topping.price,
            topping.active,
            topping_id
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Topping not found"
        )


    return {
        "ok": True
    }


@app.delete("/api/admin/toppings/{topping_id}")
def delete_topping(
    topping_id: int,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        DELETE FROM toppings
        WHERE id = ?
        """,
        (
            topping_id,
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Topping not found"
        )


    return {
        "ok": True
    }


# =========================================================
# DELIVERY
# =========================================================

@app.get("/api/delivery")
def get_public_delivery():

    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM delivery_areas

        WHERE active = 1

        ORDER BY area
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.get("/api/admin/delivery")
def get_admin_delivery(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM delivery_areas

        ORDER BY area
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.post("/api/admin/delivery")
def create_delivery_area(
    area: DeliveryAreaRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        INSERT INTO delivery_areas
        (
            area,
            charge,
            min_order,
            active
        )
        VALUES (?, ?, ?, ?)
        """,
        (
            area.area.strip(),
            area.charge,
            area.min_order,
            area.active
        )
    )


    connection.commit()

    area_id = cursor.lastrowid

    connection.close()


    return {
        "ok": True,
        "id": area_id
    }


@app.patch("/api/admin/delivery/{area_id}")
def update_delivery_area(
    area_id: int,
    area: DeliveryAreaRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        UPDATE delivery_areas

        SET
            area = ?,
            charge = ?,
            min_order = ?,
            active = ?

        WHERE id = ?
        """,
        (
            area.area.strip(),
            area.charge,
            area.min_order,
            area.active,
            area_id
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Delivery area not found"
        )


    return {
        "ok": True
    }


@app.delete("/api/admin/delivery/{area_id}")
def delete_delivery_area(
    area_id: int,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    cursor = connection.execute(
        """
        DELETE FROM delivery_areas
        WHERE id = ?
        """,
        (
            area_id,
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Delivery area not found"
        )


    return {
        "ok": True
    }


# =========================================================
# OFFERS
# =========================================================

@app.get("/api/offers")
def get_public_offers():

    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM offers

        WHERE active = 1

        ORDER BY created_at DESC
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.get("/api/admin/offers")
def get_admin_offers(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM offers

        ORDER BY created_at DESC
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.post("/api/admin/offers")
def create_offer(
    offer: OfferRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    try:

        cursor = connection.execute(
            """
            INSERT INTO offers
            (
                code,
                title,
                discount_type,
                discount_value,
                minimum_order,
                max_discount,
                active,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                offer.code.strip().upper(),
                offer.title.strip(),
                offer.discount_type,
                offer.discount_value,
                offer.minimum_order,
                offer.max_discount,
                offer.active,
                now()
            )
        )


        connection.commit()


    except sqlite3.IntegrityError:

        connection.close()

        raise HTTPException(
            status_code=400,
            detail="Coupon code already exists"
        )


    offer_id = cursor.lastrowid

    connection.close()


    return {
        "ok": True,
        "id": offer_id
    }


# =========================================================
# SETTINGS
# =========================================================

@app.get("/api/settings")
def get_public_settings():

    connection = get_db()


    rows = connection.execute(
        """
        SELECT key, value
        FROM settings
        """
    ).fetchall()


    connection.close()


    return {
        row["key"]: row["value"]
        for row in rows
    }


@app.get("/api/admin/settings")
def get_admin_settings(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    return get_public_settings()


@app.patch("/api/admin/settings/{key}")
def update_setting(
    key: str,
    setting: SettingRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    connection.execute(
        """
        INSERT INTO settings
        (
            key,
            value
        )
        VALUES (?, ?)

        ON CONFLICT(key)
        DO UPDATE SET
            value = excluded.value
        """,
        (
            key,
            setting.value
        )
    )


    connection.commit()

    connection.close()


    return {
        "ok": True
    }


# =========================================================
# CUSTOMER ORDERS
# =========================================================

@app.post("/api/orders")
def create_order(
    order: OrderRequest
):

    order_no = (
        "PF"
        +
        datetime.now().strftime(
            "%d%m%H%M%S"
        )
        +
        str(
            secrets.randbelow(100)
        ).zfill(2)
    )


    connection = get_db()


    cursor = connection.execute(
        """
        INSERT INTO orders
        (
            order_no,
            customer_name,
            phone,
            address,
            fulfilment,
            payment,
            items_json,
            subtotal,
            delivery_charge,
            discount,
            total,
            note,
            status,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            order_no,

            order.customer_name.strip(),

            order.phone.strip(),

            order.address.strip(),

            order.fulfilment,

            order.payment,

            json.dumps(
                order.items,
                ensure_ascii=False
            ),

            order.subtotal,

            order.delivery_charge,

            order.discount,

            order.total,

            order.note,

            "new",

            now()
        )
    )


    connection.commit()

    order_id = cursor.lastrowid

    connection.close()


    return {

        "ok": True,

        "order_id":
            order_id,

        "order_no":
            order_no,

        "status":
            "new"

    }


# =========================================================
# CUSTOMER ORDER HISTORY
# =========================================================

@app.get("/api/customer/orders")
def get_customer_orders(phone: str = ""):
    phone = phone.strip()
    if not phone:
        raise HTTPException(status_code=400, detail="Phone number is required")
    connection = get_db()
    rows = connection.execute(
        "SELECT * FROM orders WHERE phone = ? ORDER BY id DESC",
        (phone,)
    ).fetchall()
    connection.close()
    result = []
    for row in rows:
        item = dict(row)
        try:
            item["items"] = json.loads(item.get("items_json", "[]"))
        except Exception:
            item["items"] = []
        item.pop("items_json", None)
        result.append(item)
    return result


# =========================================================
# ADMIN ORDERS
# =========================================================

@app.get("/api/admin/orders")
def get_admin_orders(
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    rows = connection.execute(
        """
        SELECT *
        FROM orders

        ORDER BY id DESC
        """
    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.get("/api/admin/orders/{order_id}")
def get_admin_order(
    order_id: int,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    connection = get_db()


    row = connection.execute(
        """
        SELECT *
        FROM orders

        WHERE id = ?
        """,
        (
            order_id,
        )
    ).fetchone()


    connection.close()


    if row is None:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    result = dict(row)


    try:
        result["items"] = json.loads(result["items_json"])
    except Exception:
        result["items"] = []


    return result


@app.patch("/api/admin/orders/{order_id}")
def update_order_status(
    order_id: int,
    update: OrderStatusRequest,
    authorization: str = Header(None)
):

    verify_token(
        authorization
    )


    allowed_statuses = {

        "new",

        "accepted",

        "preparing",

        "ready",

        "out_for_delivery",

        "delivered",

        "rejected"

    }


    if update.status not in allowed_statuses:

        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )


    connection = get_db()


    cursor = connection.execute(
        """
        UPDATE orders

        SET status = ?

        WHERE id = ?
        """,
        (
            update.status,
            order_id
        )
    )


    connection.commit()

    connection.close()


    if cursor.rowcount == 0:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    return {
        "ok": True
    }


# =========================================================
# START
# =========================================================

init_database()


@app.get("/api/admin/stats")
def admin_stats(authorization: str = Header(None)):
    verify_token(authorization)
    connection = get_db()

    total_orders = connection.execute(
        "SELECT COUNT(*) AS c FROM orders"
    ).fetchone()["c"]

    new_orders = connection.execute(
        "SELECT COUNT(*) AS c FROM orders WHERE status='new'"
    ).fetchone()["c"]

    active_orders = connection.execute(
        """SELECT COUNT(*) AS c FROM orders
           WHERE status IN ('accepted','preparing','ready','out_for_delivery')"""
    ).fetchone()["c"]

    delivered = connection.execute(
        "SELECT COUNT(*) AS c FROM orders WHERE status='delivered'"
    ).fetchone()["c"]

    rejected = connection.execute(
        "SELECT COUNT(*) AS c FROM orders WHERE status='rejected'"
    ).fetchone()["c"]

    revenue = connection.execute(
        """SELECT COALESCE(SUM(total),0) AS total
           FROM orders WHERE status='delivered'"""
    ).fetchone()["total"]

    customers = connection.execute(
        "SELECT COUNT(DISTINCT phone) AS c FROM orders"
    ).fetchone()["c"]

    connection.close()

    return {
        "total_orders": total_orders,
        "new_orders": new_orders,
        "active_orders": active_orders,
        "delivered": delivered,
        "rejected": rejected,
        "revenue": revenue,
        "customers": customers
    }

