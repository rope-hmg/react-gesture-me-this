import d from "react";
class c {
  constructor(t, e) {
    this.x = t, this.y = e;
  }
  add(t, e = new c(0, 0)) {
    return e.x = this.x + t.x, e.y = this.y + t.y, e;
  }
  add_assign(t) {
    return this.add(t, this);
  }
  sub(t, e = new c(0, 0)) {
    return e.x = this.x - t.x, e.y = this.y - t.y, e;
  }
  sub_assign(t) {
    return this.sub(t, this);
  }
  mul(t, e = new c(0, 0)) {
    return e.x = this.x * t, e.y = this.y * t, e;
  }
  mul_assign(t) {
    return this.mul(t, this);
  }
  div(t, e = new c(0, 0)) {
    return this.mul(1 / t, e);
  }
  div_assign(t) {
    return this.mul_assign(1 / t);
  }
  neg(t = new c(0, 0)) {
    return this.mul(-1, t);
  }
  neg_assign() {
    return this.mul_assign(-1);
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  length_sq() {
    return this.dot(this);
  }
  length() {
    return Math.sqrt(this.length_sq());
  }
  normalise(t = new c(0, 0)) {
    return this.mul(1 / this.length(), t);
  }
  normalise_assign() {
    return this.mul_assign(1 / this.length());
  }
  copy_from(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  set(t, e) {
    this.x = t, this.y = e;
  }
}
class f {
  constructor() {
    this.finger_count = 0, this.fingers = /* @__PURE__ */ new Map(), this.centroid = new c(0, 0);
  }
  // average_finger_direction(): Vector {
  //   const average_direction = new Vector(0, 0);
  //   if (this.finger_count > 1) {
  //     for (const finger of this.fingers.values()) {
  //       average_direction.add_assign(finger.position_delta);
  //     }
  //     average_direction.div_assign(this.finger_count);
  //   }
  //   return average_direction;
  // }
}
class v {
  constructor(t, e) {
    this.position_delta = new c(0, 0), this.centroid_direction = new c(0, 0), this.position = new c(t, e);
  }
  is_moving_toward_centroid() {
    return this.position_delta.dot(this.centroid_direction) > 0;
  }
  /** Returns the angle around `point` that the finger moved in radians  */
  angle_delta_around_point(t) {
    const e = this.position.sub(this.position_delta).sub_assign(t).normalise_assign(), s = this.position.sub(t).normalise_assign();
    return Math.acos(e.dot(s));
  }
}
class p {
  constructor(t, e) {
    this.element = t, this.metrics = new f();
    const s = (i) => {
      var n;
      i.preventDefault(), this.initialise_touches(i.changedTouches), (n = e.on_start) == null || n.call(e, this.metrics, i);
    }, r = (i) => {
      var n;
      i.preventDefault(), this.update_touches(i.changedTouches), (n = e.on_move) == null || n.call(e, this.metrics, i);
    }, h = (i) => {
      var n;
      i.preventDefault(), this.remove_touches(i.changedTouches), (n = e.on_end) == null || n.call(e, this.metrics, i);
    }, u = (i) => {
      var n;
      i.preventDefault(), this.remove_all_touches(), (n = e.on_cancel) == null || n.call(e, this.metrics, i);
    };
    t.addEventListener("touchstart", s), t.addEventListener("touchmove", r), t.addEventListener("touchend", h), t.addEventListener("touchcancel", u), this.on_start = s, this.on_move = r, this.on_end = h, this.on_cancel = u;
  }
  /** Removes the touch event listeners from the element */
  disableGestures() {
    this.element.removeEventListener("touchstart", this.on_start), this.element.removeEventListener("touchmove", this.on_move), this.element.removeEventListener("touchmove", this.on_end), this.element.removeEventListener("touchmove", this.on_cancel);
  }
  initialise_touches(t) {
    this.metrics.finger_count += t.length;
    for (const e of t) {
      const s = new v(e.clientX, e.clientY);
      this.metrics.fingers.set(e.identifier, s);
    }
    this.calculate_centroid();
  }
  update_touches(t) {
    for (const e of t) {
      const s = this.metrics.fingers.get(e.identifier);
      s && (s.position_delta.set(
        e.clientX - s.position.x,
        e.clientY - s.position.y
      ), s.position.set(e.clientX, e.clientY));
    }
    this.calculate_centroid();
  }
  remove_touches(t) {
    this.metrics.finger_count -= t.length;
    for (const e of t)
      this.metrics.fingers.delete(e.identifier);
    this.calculate_centroid();
  }
  remove_all_touches() {
    this.metrics.finger_count = 0, this.metrics.fingers.clear(), this.metrics.centroid.set(0, 0);
  }
  calculate_centroid() {
    const { finger_count: t, fingers: e, centroid: s } = this.metrics;
    s.set(0, 0);
    for (const r of e.values())
      s.add_assign(r.position);
    t > 1 && s.div_assign(t);
    for (const r of e.values())
      s.sub(r.position, r.centroid_direction);
  }
}
const x = {
  sensitivity: 0.5
}, y = (o, t) => {
  const { exact_finger_count: e, sensitivity: s = 0.5 } = t ?? x, r = !!e && o.finger_count === e || !e && o.finger_count > 1;
  let h;
  if (r) {
    const u = o.fingers.values();
    let { value: i, done: n } = u.next(), _ = i.is_moving_toward_centroid(), l = !0;
    for (; !n && l; )
      l = _ === i.is_moving_toward_centroid(), { value: i, done: n } = u.next();
    if (l) {
      const m = _ ? 0 : 1;
      let a = 0;
      for (const g of o.fingers.values())
        a += g.position_delta.length();
      a /= o.finger_count, a *= s, h = { strength: a, direction: m };
    }
  }
  return h ? { is_recognised: !0, metrics: h } : { is_recognised: !1 };
};
function b(o, t) {
  const [e, s] = d.useState();
  d.useEffect(() => {
    if (o.current) {
      const r = {};
      t.onPinch && (r.on_move = (h) => {
        var i;
        const u = y(h);
        u.is_recognised && ((i = t.onPinch) == null || i.call(t, u.metrics));
      }), s(new p(o.current, r));
    }
    return () => {
      e == null || e.disableGestures();
    };
  }, [o]);
}
export {
  b as useGestures
};
//# sourceMappingURL=react-gesture-me-this.es.js.map
