Pizza Fire — FINAL CUSTOMER LOGIN + ADMIN + DELIVERY

Customer: http://127.0.0.1:5500/
Backend: http://127.0.0.1:8000/
Delivery: http://127.0.0.1:5501/delivery.html

Customer now has account registration/login. My Orders is account-based: no tracking ID/order ID/phone lookup form. Checkout requires login and automatically uses the logged-in customer details.

Start backend:
py -m pip install -r requirements.txt
py -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

Start customer frontend:
cd frontend
py -m http.server 5500

Start admin/delivery server:
cd backend
py -m http.server 5501
