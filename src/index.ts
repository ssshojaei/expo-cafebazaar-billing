import { requireOptionalNativeModule } from "expo-modules-core";

import type { CafeBazaarBillingModule } from "./CafeBazaarBilling.types";

export type {
  CafeBazaarBillingModule,
  ConnectOptions,
  PurchaseOptions,
  PurchaseResult,
  SkuDetails,
} from "./CafeBazaarBilling.types";

const NativeModule =
  requireOptionalNativeModule<CafeBazaarBillingModule>("CafeBazaarBilling");

export default NativeModule;

export { useBillingProduct, useBillingSubscription } from "./hooks/index";
