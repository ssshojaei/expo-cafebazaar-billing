# expo-cafebazaar-billing

Cafe Bazaar **In-App Billing** for Expo (Android). Purchase in-app products and subscriptions using the official [Poolakey](https://github.com/cafebazaar/Poolakey) SDK.

- [Cafe Bazaar In-App Billing – Intro](https://developers.cafebazaar.ir/fa/guidelines/in-app-billing/intro)
- [Subscriptions](https://developers.cafebazaar.ir/fa/guidelines/in-app-billing/subscription)

## Requirements

- **Android only** (Cafe Bazaar is an Android app store)
- [Cafe Bazaar (Bazaar) app](https://cafebazaar.ir/app/com.farsitel.bazaar) installed on the device for testing
- Expo SDK (with `expo-modules-core`)

## Installation

```bash
pnpm add expo-cafebazaar-billing
# or
npm install expo-cafebazaar-billing
```

No extra native config is required; the module adds the Poolakey dependency and the billing activity automatically.

## Usage

### 1. Connect

Call `connect()` before any other billing API. Pass your **RSA public key** (from Cafe Bazaar developer panel) for purchase verification in production.

```ts
import CafeBazaarBilling from 'expo-cafebazaar-billing';

await CafeBazaarBilling.connect({
  rsaPublicKey: 'YOUR_RSA_PUBLIC_KEY', // optional but recommended
});
```

### 2. Purchase a product

```ts
const purchase = await CafeBazaarBilling.purchaseProduct('your_product_sku', {
  developerPayload: 'optional-payload',
  dynamicPriceToken: undefined, // optional, for dynamic pricing
});
console.log(purchase.purchaseToken, purchase.orderId);
```

### 3. Subscribe to a product

```ts
const subscription = await CafeBazaarBilling.subscribeProduct('your_subscription_sku', {
  developerPayload: 'optional-payload',
});
```

### 4. Consume a consumable purchase

After granting the user the consumable item:

```ts
await CafeBazaarBilling.consumePurchase(purchaseToken);
```

### 5. Query purchases and subscriptions

```ts
const purchased = await CafeBazaarBilling.getPurchasedProducts();
const subscribed = await CafeBazaarBilling.getSubscribedProducts();

const one = await CafeBazaarBilling.queryPurchaseProduct('product_sku');
const sub = await CafeBazaarBilling.querySubscribeProduct('subscription_sku');
```

### 6. Get SKU details

```ts
const inAppDetails = await CafeBazaarBilling.getInAppSkuDetails(['sku1', 'sku2']);
const subDetails = await CafeBazaarBilling.getSubscriptionSkuDetails(['sub_sku1']);
```

### 7. Disconnect

When you are done (e.g. user leaves the billing screen), disconnect:

```ts
await CafeBazaarBilling.disconnect();
```

For each `connect()` call you should call `disconnect()` once.

## API summary

| Method | Description |
|--------|-------------|
| `connect(options?)` | Connect to Bazaar billing; call first. |
| `disconnect()` | Disconnect from Bazaar billing. |
| `purchaseProduct(productId, options?)` | Start in-app product purchase flow. |
| `subscribeProduct(productId, options?)` | Start subscription purchase flow. |
| `consumePurchase(purchaseToken)` | Consume a consumable purchase. |
| `getPurchasedProducts()` | List purchased in-app products. |
| `getSubscribedProducts()` | List active subscriptions. |
| `queryPurchaseProduct(productId)` | Get one purchase by product ID. |
| `querySubscribeProduct(productId)` | Get one subscription by product ID. |
| `getInAppSkuDetails(productIds)` | Get in-app product SKU details. |
| `getSubscriptionSkuDetails(productIds)` | Get subscription SKU details. |

## Types

- **PurchaseResult**: `orderId`, `packageName`, `productId`, `purchaseTime`, `purchaseState`, `developerPayload`, `purchaseToken`
- **SkuDetails**: `sku`, `type`, `price`, `title`, `description`
- **ConnectOptions**: `{ rsaPublicKey?: string }`
- **PurchaseOptions**: `{ developerPayload?: string; dynamicPriceToken?: string }`

## Errors

The module rejects with Expo-style errors (code + message). Common codes:

- `ERR_NOT_CONNECTED` – Call `connect()` first.
- `ERR_NO_ACTIVITY` – No activity (e.g. app in background).
- `ERR_PURCHASE` / `ERR_SUBSCRIBE` – User canceled or Bazaar returned an error.
- `ERR_CONNECT` – Connection to Bazaar failed (e.g. Bazaar not installed).
- `ERR_DISCONNECT` – Billing was disconnected by Bazaar.

## License

MIT
