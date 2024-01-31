import React from "react";
import { PinchMetrics } from "gesture-me-this";
export type GestureHandlers = {
    onPinch?(metrics: PinchMetrics): void;
};
export declare function useGestures(handlers: GestureHandlers): React.Ref<HTMLElement>;
//# sourceMappingURL=index.d.ts.map