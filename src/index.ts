import React from "react";
import {
  GestureController,
  PinchMetrics,
  TouchHandlers,
  pinch_zoom,
} from "gesture-me-this";

export type GestureHandlers = {
  onPinch?(metrics: PinchMetrics): void;
};

export function useGestures(handlers: GestureHandlers) {
  const ref = React.useRef();
  let controller: GestureController | undefined;

  React.useEffect(() => {
    if (ref.current) {
      const a: TouchHandlers = {};

      if (handlers.onPinch) {
        a.on_move = (metrics) => {
          const result = pinch_zoom(metrics);
          if (result.is_recognised) {
            handlers.onPinch?.(result.metrics);
          }
        };
      }

      controller = new GestureController(ref.current, a);
    }

    return () => {
      controller?.disableGestures();
    };
  }, [ref]);

  return [ref];
}
