# Product brief — Sayfiddinovna Sport

Static hockey equipment storefront for browsing products and placing a locally stored order after login.

## Current behavior

- Browse and filter the 21 products, choose variants, and add them to a browser-local cart.
- Sign in or create a local account, then complete checkout with contact and delivery details.
- Save an order in the same browser and send payment proof to the store through WhatsApp.
- Submit a return request locally and contact the store directly for follow-up.

## Limits

Accounts, orders, and returns are stored only in browser `localStorage`; they are not visible to the store on another device. Payment is manual QRIS only. There is no admin dashboard, stock synchronization, automatic payment confirmation, or central database.
