import { requireOptionalNativeModule } from "expo-modules-core";
const NativeModule = requireOptionalNativeModule("CafeBazaarBilling");
export default NativeModule;
export { useBillingProduct, useBillingSubscription } from "./hooks/index";
//# sourceMappingURL=index.js.map