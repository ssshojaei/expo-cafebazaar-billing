import { requireOptionalNativeModule } from "expo-modules-core";

import type {
  ConnectOptions,
  PurchaseOptions,
  PurchaseResult,
  SkuDetails,
} from "./CafeBazaarBilling.types";

export type {
  ConnectOptions,
  PurchaseOptions,
  PurchaseResult,
  SkuDetails,
} from "./CafeBazaarBilling.types";

export interface CafeBazaarBillingModule {
  /**
   * Connect to Cafe Bazaar billing service. Call this before any other billing API.
   * For each connect() call you must call disconnect() when done.
   * @param options - Optional RSA public key for purchase verification
   */
  connect(options?: ConnectOptions): Promise<void>;

  /**
   * Disconnect from Cafe Bazaar billing service.
   */
  disconnect(): Promise<void>;

  /**
   * Purchase a consumable or non-consumable in-app product.
   * Opens the Bazaar payment flow.
   */
  purchaseProduct(
    productId: string,
    options?: PurchaseOptions,
  ): Promise<PurchaseResult>;

  /**
   * Subscribe to a subscription product.
   * Opens the Bazaar payment flow.
   */
  subscribeProduct(
    productId: string,
    options?: PurchaseOptions,
  ): Promise<PurchaseResult>;

  /**
   * Consume a consumable purchase. Call this after granting the user the product.
   */
  consumePurchase(purchaseToken: string): Promise<void>;

  /**
   * Get all purchased products for the current user (in-app one-time purchases).
   */
  getPurchasedProducts(): Promise<PurchaseResult[]>;

  /**
   * Get all active subscriptions for the current user.
   */
  getSubscribedProducts(): Promise<PurchaseResult[]>;

  /**
   * Query a specific purchase by product ID.
   */
  queryPurchaseProduct(productId: string): Promise<PurchaseResult | null>;

  /**
   * Query a specific subscription by product ID.
   */
  querySubscribeProduct(productId: string): Promise<PurchaseResult | null>;

  /**
   * Get SKU details for in-app products.
   */
  getInAppSkuDetails(productIds: string[]): Promise<SkuDetails[]>;

  /**
   * Get SKU details for subscription products.
   */
  getSubscriptionSkuDetails(productIds: string[]): Promise<SkuDetails[]>;
}

const NativeModule =
  requireOptionalNativeModule<CafeBazaarBillingModule>("CafeBazaarBilling");

export default NativeModule;
