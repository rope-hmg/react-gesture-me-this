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

export function useGestures(
  handlers: GestureHandlers,
): React.RefObject<HTMLElement> {
  const ref = React.useRef(null);
  let controller: GestureController | undefined;

  React.useEffect(() => {
    if (ref.current) {
      const touchHandlers: TouchHandlers = {};

      if (handlers.onPinch) {
        touchHandlers.on_move = (metrics) => {
          const result = pinch_zoom(metrics);
          if (result.is_recognised) {
            handlers.onPinch?.(result.metrics);
          }
        };
      }

      controller = new GestureController(ref.current, touchHandlers);
    }

    return () => {
      controller?.disableGestures();
    };
  }, [ref]);

  return ref;
}
