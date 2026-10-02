# Acme Widget Co - Frontend

[![React](https://img.shields.io/badge/React-19-blue.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)]()
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()
[![Version](https://img.shields.io/badge/Version-1.0.8-orange.svg)]()

A clean, modern React 19 user interface for **Acme Widget Co**, consuming official business rules and pricing calculations directly from the **PHP 8.2 Sales System API**.

---

## 📦 Products & Pricing

| Code | Product | Price |
| :--- | :--- | :--- |
| **R01** | Red Widget | $32.95 |
| **G01** | Green Widget | $24.95 |
| **B01** | Blue Widget | $7.95 |

---

## 🚚 Delivery Rules

Shipping charges are calculated based on the order's subtotal after promotional discounts:
- **Orders under $50.00**: $4.95
- **Orders under $90.00** ($50.00 – $89.99): $2.95
- **Orders of $90.00 or more**: Free delivery ($0.00)

---

## 🏷️ Special Offers

- **"Buy one red widget, get the second half price"**: Every second Red Widget (`R01`) in an order receives a 50% discount ($16.48 off).

---

## 🧪 Official Test Cases

The application includes 1-click test presets to instantly verify all required combinations:

| Test Case | Products | Expected Total |
| :--- | :--- | :--- |
| **Example 1** | `B01`, `G01` | **$37.85** |
| **Example 2** | `R01`, `R01` | **$54.37** |
| **Example 3** | `R01`, `G01` | **$60.85** |
| **Example 4** | `B01`, `B01`, `R01`, `R01`, `R01` | **$98.27** |

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:6565`.

### 3. Connect with Backend API
Ensure the PHP backend server is running in the `acme-widget-co-backend` folder:
```bash
php -S localhost:7575 index.php
```
The status pill in the header will display **`PHP 8.2 API (Connected)`** with a pulsing green indicator.

---

## 🎨 Brand Design Tokens

Built using Vanilla CSS custom properties with zero external UI library overhead:

- `--brand-teal` (`#5cc8c8`): Primary brand accent & interactive focus
- `--brand-teal-dark` (`#3a9a99`): Button hover and active states
- `--brand-navy` (`#012037`): Deep background & contrast base
- `--brand-coral` (`#FF5A4E`): Promotional ribbons & danger actions
- `--brand-mint` (`#7FE7C4`): Success indicators & discounts

---

## 📂 Project Structure

```text
acme-widget-co-frontend/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # ThriveCart design tokens, responsive layout & animations
│   │   └── images/
│   │       └── thrivecart.png  # Header logo brand asset
│   ├── components/             # Modular React UI components
│   │   ├── Basket.tsx          # Shopping basket summary, line items & actions
│   │   ├── BasketItemRow.tsx   # Individual basket item row with quantity controls
│   │   ├── Header.tsx          # Header with branding and API connection status
│   │   ├── ProductCard.tsx     # Widget product card with add-to-cart action
│   │   ├── ProductGrid.tsx     # Product catalog display with empty-state handling
│   │   ├── RulesCard.tsx       # Informational delivery tiers & special offers card
│   │   ├── TestPresets.tsx     # Specification test case presets (Examples 1-4)
│   │   └── index.ts            # Component barrel export
│   ├── services/
│   │   └── api.ts              # PHP API integration client & local fallback engine
│   ├── types/
│   │   └── index.ts            # Domain TypeScript definitions (Product, BasketBreakdown, etc.)
│   ├── App.tsx                 # Main application state and layout
│   └── main.tsx                # React application entry point
├── index.html                  # HTML entry point with Google Fonts and branding
├── package.json                # Project dependencies, scripts, and versioning
├── tsconfig.app.json           # Application TypeScript configuration
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.node.json          # Node/Vite TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project overview & documentation
```
