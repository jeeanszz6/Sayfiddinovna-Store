# Technology stack

- Static HTML, CSS, and browser JavaScript.
- Product catalog is defined in `products.js`.
- Account records, hashed passwords, login session, cart, checkout details, orders, and return requests are saved in browser `localStorage`.
- QRIS payments are manual and confirmed with the store through WhatsApp.
- No application server, API, central database, or automatic card payment is used. A login is required, but the account exists only in the current browser.


## Midtrans payment integration
- PHP API endpoints in `api/` create Midtrans Snap transactions, verify payment notifications, and query transaction status.
- MySQL stores orders and payment status; import `api/database.sql`.
- Merchant credentials are stored only in the server-side `api/config.local.php` file (create it from the example).
- Sandbox must be tested first. Production requires an approved Midtrans merchant account, enabled payment channels, and a public HTTPS domain for webhooks.
- Customer account/login data remains browser-local in this project; the new database centralizes payment orders only.
