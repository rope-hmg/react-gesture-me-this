import React from "react";
import { PinchMetrics } from "gesture-me-this";
export type GestureHandlers = {
    onPinch?(metrics: PinchMetrics): void;
};
export declare function useGestures<T>(handlers: GestureHandlers): React.RefObject<T>;
//# sourceMappingURL=index.d.ts.map