# Gesture Me This

A tiny multitouch gesture library for the browser.

```bash
dist/react-gesture-me-this.es.js   5.80 kB │ gzip: 1.63 kB │ map: 12.44 kB
dist/react-gesture-me-this.umd.js  4.35 kB │ gzip: 1.44 kB │ map: 11.85 kB
```

# Gestures

Currently supports the following gestures:
- [x] Pinch Zoom
- [ ] Rotate
- [ ] Swipe

The gesture recognisers only use the public Metrics API, so you can easily create your own gestures.

# Documentation

If you want to use this without React, check out `gesture-me-this`:
- [npm]()
- [github](https://github.com/rope-hmg/gesture-me-this)

```ts
import { useGestures } from "react-gesture-me-this";

const Canvas = () => {
  const ref = useGestures({
    onPinch(metrics) => {
      console.log(metrics.strength);
      console.log(metrics.direction);
    }
  });

  return <canvas ref={ref} />;
};
```
