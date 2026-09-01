# Pizza Fire — Clean Fullstack Package

## Structure
- `frontend/` — customer website
- `backend/` — FastAPI API + owner dashboard
- `backend/pizza_fire.db` — SQLite DB is created automatically on first run

## Run backend
```powershell
cd backend
py -m pip install -r requirements.txt
py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Health check: `http://127.0.0.1:8000/health`

## Run frontend
From the project root:
```powershell
py -m http.server 5500 --directory frontend
```

Customer site: `http://127.0.0.1:5500/`

Owner dashboard: `http://127.0.0.1:5500/admin.html` is **not** correct because admin.html is inside backend. Open it through a simple second server:
```powershell
py -m http.server 5501 --directory backend
```
Owner dashboard: `http://127.0.0.1:5501/admin.html`

## Local admin login
- Email: `owner@pizzafire.local`
- Password: `PizzaFire@12345`

Change these in `backend/.env` before giving the project to a real business.

## Included features
- Complete Pizza Fire menu from the supplied menu cards
- Pizza size/base/topping selection
- Cart
- Checkout
- Orders saved in SQLite
- WhatsApp order handoff
- Customer order tracking
- Admin login
- Admin order status updates
- Admin menu add/edit/delete
- Dashboard stats
- Customers
- Store settings

The menu is seeded automatically only when an item with the same name does not already exist, so restarting the backend does not duplicate the catalogue.
