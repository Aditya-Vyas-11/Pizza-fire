PIZZA FIRE — CLIENT READY

1. Open a terminal in backend:
   py -m pip install -r requirements.txt
   py -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

2. Open a second terminal in frontend:
   py -m http.server 5500

3. Customer:
   http://127.0.0.1:5500/

4. Admin:
   http://127.0.0.1:8000/admin.html

Do not open index.html or admin.html with file:///.
Keep both terminals running.

Admin credentials are in backend/.env.

Customer flow:
- Navbar -> My Orders
- No tracking-ID form
- Orders are remembered by the mobile number used at checkout
- Active orders show Track This Order
- Delivered orders show Delivered

Admin order flow:
New -> Accept / Reject -> Preparing -> Ready -> Out for Delivery -> Delivered

Settings includes store status and Change Admin Password.
