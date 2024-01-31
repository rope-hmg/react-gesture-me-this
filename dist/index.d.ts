import React from "react";
import { PinchMetrics } from "gesture-me-this";
export type GestureHandlers = {
    onPinch?(metrics: PinchMetrics): void;
};
export declare function useGestures<T extends HTMLElement>(ref: React.RefObject<T>, handlers: GestureHandlers): void;
//# sourceMappingURL=index.d.ts.map