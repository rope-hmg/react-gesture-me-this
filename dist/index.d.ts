import React from "react";
import { GestureController, PinchMetrics } from "gesture-me-this";
export type GestureHandlers = {
    onPinch?(metrics: PinchMetrics): void;
};
export declare function useGestures(handlers: GestureHandlers): (React.MutableRefObject<undefined> | GestureController | undefined)[];
//# sourceMappingURL=index.d.ts.map