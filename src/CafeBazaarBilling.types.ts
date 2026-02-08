/**
 * Result of a successful in-app product purchase.
 * @see https://developers.cafebazaar.ir/fa/guidelines/in-app-billing/intro
 */
export type PurchaseResult = {
  orderId: string;
  packageName: string;
  productId: string;
  purchaseTime: number;
  purchaseState: number;
  developerPayload: string;
  purchaseToken: string;
};

/**
 * SKU (product) details from Cafe Bazaar.
 */
export type SkuDetails = {
  sku: string;
  type: string;
  price: string;
  title: string;
  description: string;
};

/**
 * Options when connecting to Cafe Bazaar billing.
 */
export type ConnectOptions = {
  /**
   * RSA public key for purchase verification (recommended for production).
   * If omitted, local security check is disabled.
   */
  rsaPublicKey?: string;
};

/**
 * Options when purchasing a product or subscription.
 */
export type PurchaseOptions = {
  /** Optional developer payload. */
  developerPayload?: string;
  /** Optional dynamic price token for dynamic pricing. */
  dynamicPriceToken?: string;
};
